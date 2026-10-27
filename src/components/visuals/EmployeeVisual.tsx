import { motion } from 'motion/react'

const rows = [
  { avatar: '#d9cffb', dept: '#e6dfff', active: true },
  { avatar: '#ffd3e2', dept: '#dcefff', active: true },
  { avatar: '#ffe0c7', dept: '#e6dfff', active: false },
  { avatar: '#cdeedd', dept: '#ffe8d8', active: true },
]

/** Decorative desktop app: sidebar modules, a staff table with status pills, and a sign-in lock. */
export function EmployeeVisual() {
  return (
    <svg viewBox="0 0 440 340" className="h-full w-full" role="img" aria-label="Illustration of an employee management desktop application">
      <defs>
        <filter id="ev-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#6f58d9" floodOpacity=".14" />
        </filter>
      </defs>

      {/* monitor */}
      <g filter="url(#ev-shadow)">
        <rect x="24" y="20" width="392" height="252" rx="20" fill="#fff" />
      </g>
      <rect x="196" y="272" width="48" height="28" fill="#ece9f1" />
      <rect x="160" y="298" width="120" height="12" rx="6" fill="#e3dff0" />

      {/* sidebar with the three modules */}
      <rect x="24" y="20" width="96" height="252" rx="20" fill="#f6f3fd" />
      <rect x="100" y="20" width="20" height="252" fill="#f6f3fd" />
      {['#b9a8f5', '#cfc5f2', '#cfc5f2'].map((c, i) => (
        <g key={i} transform={`translate(40 ${64 + i * 40})`}>
          <rect width="64" height="26" rx="9" fill={i === 0 ? '#fff' : 'transparent'} />
          <circle cx="13" cy="13" r="5" fill={c} />
          <rect x="24" y="9" width="30" height="8" rx="4" fill={c} opacity=".7" />
        </g>
      ))}
      {/* Static wrapper holds the position; the inner group animates (Motion's transform would replace the attribute) */}
      <g transform="translate(72 220)">
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="-14" y="-6" width="28" height="22" rx="6" fill="#d9cffb" />
          <path d="M-8-6v-5a8 8 0 0 1 16 0v5" stroke="#b9a8f5" strokeWidth="3.5" fill="none" />
          <circle cy="5" r="3" fill="#fff" />
        </motion.g>
      </g>

      {/* header */}
      <rect x="140" y="40" width="120" height="12" rx="6" fill="#e6dfff" />
      <rect x="320" y="36" width="76" height="20" rx="10" fill="#f6f3fd" />

      {/* table */}
      <g transform="translate(140 72)">
        <rect width="256" height="20" rx="6" fill="#faf8fd" />
        {[14, 96, 178].map((x) => (
          <rect key={x} x={x} y="7" width="36" height="6" rx="3" fill="#ddd7ea" />
        ))}
        {rows.map((r, i) => (
          <g key={i} transform={`translate(0 ${30 + i * 42})`}>
            <motion.g
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect width="256" height="34" rx="10" fill={i === 1 ? '#faf8fd' : '#fff'} stroke="#f0edf5" />
              <circle cx="22" cy="17" r="9" fill={r.avatar} />
              <rect x="38" y="13" width="44" height="8" rx="4" fill="#e3dff0" />
              <rect x="96" y="10" width="58" height="14" rx="7" fill={r.dept} />
              <rect x="178" y="10" width="58" height="14" rx="7" fill={r.active ? '#dcf5ea' : '#efedf2'} />
              <circle cx="190" cy="17" r="3.5" fill={r.active ? '#4cc38a' : '#b7b2c2'} />
              <rect x="198" y="14" width="28" height="6" rx="3" fill={r.active ? '#9edcbf' : '#d2cedb'} />
            </motion.g>
          </g>
        ))}
      </g>
    </svg>
  )
}
