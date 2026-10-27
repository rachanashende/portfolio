import { motion } from 'motion/react'

const habits = [
  { label: 'Study', color: '#b9a8f5', done: [1, 1, 1, 0, 1, 1, 0] },
  { label: 'Exercise', color: '#f5a9c2', done: [1, 0, 1, 1, 0, 1, 1] },
  { label: 'Read', color: '#f8b98f', done: [0, 1, 1, 1, 1, 0, 1] },
]

/** Decorative mini-dashboard: habit rows, a weekly streak grid and a progress ring. */
export function TrackerVisual() {
  return (
    <svg viewBox="0 0 440 340" className="h-full w-full" role="img" aria-label="Illustration of a habit-tracking dashboard">
      <defs>
        <filter id="tv-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#6f58d9" floodOpacity=".14" />
        </filter>
      </defs>

      {/* window */}
      <g filter="url(#tv-shadow)">
        <rect x="24" y="22" width="392" height="296" rx="22" fill="#fff" />
      </g>
      <circle cx="48" cy="44" r="5" fill="#ffc9d6" />
      <circle cx="64" cy="44" r="5" fill="#ffe0c2" />
      <circle cx="80" cy="44" r="5" fill="#cdeedd" />
      <rect x="150" y="38" width="140" height="12" rx="6" fill="#f3f0f8" />

      {/* habit rows */}
      {habits.map((h, row) => (
        <g key={h.label} transform={`translate(44 ${78 + row * 64})`}>
          <rect width="236" height="50" rx="14" fill="#faf8fd" />
          <rect x="12" y="13" width="24" height="24" rx="8" fill={h.color} opacity=".35" />
          <motion.path
            d="M18 25l4.5 4.5L30 21"
            fill="none"
            stroke={h.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35 + row * 0.15 }}
          />
          <text x="46" y="30" fontSize="13" fill="#4a4555" fontFamily="inherit">
            {h.label}
          </text>
          {h.done.map((d, i) => (
            <motion.rect
              key={i}
              x={118 + i * 16}
              y={18}
              width="11"
              height="14"
              rx="4"
              fill={d ? h.color : '#ece9f1'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
              transition={{ duration: 0.35, delay: 0.3 + row * 0.12 + i * 0.04 }}
            />
          ))}
        </g>
      ))}

      {/* progress ring */}
      <g transform="translate(348 128)">
        <circle r="44" fill="none" stroke="#f1edfa" strokeWidth="12" />
        <motion.circle
          r="44"
          fill="none"
          stroke="url(#tv-ring)"
          strokeWidth="12"
          strokeLinecap="round"
          transform="rotate(-90)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.72 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <linearGradient id="tv-ring" x1="-44" y1="-44" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b9a8f5" />
          <stop offset="1" stopColor="#f5a9c2" />
        </linearGradient>
        <circle r="6" fill="#b9a8f5" />
      </g>

      {/* mini calendar */}
      <g transform="translate(300 206)">
        <rect width="96" height="92" rx="14" fill="#faf8fd" />
        {Array.from({ length: 20 }).map((_, i) => {
          const filled = [0, 1, 2, 4, 5, 7, 8, 9, 11, 12, 15, 16, 18].includes(i)
          return (
            <motion.circle
              key={i}
              cx={16 + (i % 5) * 16}
              cy={18 + Math.floor(i / 5) * 18}
              r="5"
              fill={filled ? '#c9bbf7' : '#ebe7f2'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.02, type: 'spring', stiffness: 400, damping: 18 }}
            />
          )
        })}
      </g>

      {/* streak bar */}
      <g transform="translate(44 278)">
        <rect width="236" height="10" rx="5" fill="#f1edfa" />
        <motion.rect
          height="10"
          rx="5"
          fill="#cdeedd"
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </g>
    </svg>
  )
}
