import { motion } from 'motion/react'

/** Decorative water dashboard: a droplet with a moving waterline, usage bars and a leaf for conservation. */
export function WaterVisual() {
  const bars = [62, 88, 54, 104, 76, 48]
  return (
    <svg viewBox="0 0 440 340" className="h-full w-full" role="img" aria-label="Illustration of a water usage dashboard">
      <defs>
        <filter id="wv-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#2f7fbf" floodOpacity=".14" />
        </filter>
        <clipPath id="wv-drop">
          <path d="M110 64C110 64 50 140 50 184a60 60 0 0 0 120 0C170 140 110 64 110 64Z" />
        </clipPath>
        <linearGradient id="wv-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9ccbf5" />
          <stop offset="1" stopColor="#6fb3ec" />
        </linearGradient>
      </defs>

      <g filter="url(#wv-shadow)">
        <rect x="24" y="22" width="392" height="296" rx="22" fill="#fff" />
      </g>

      {/* droplet */}
      <path d="M110 64C110 64 50 140 50 184a60 60 0 0 0 120 0C170 140 110 64 110 64Z" fill="#eef7ff" />
      <g clipPath="url(#wv-drop)">
        <motion.g initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <motion.path
            d="M-60 170q30-14 60 0t60 0 60 0 60 0 60 0 60 0V320H-60Z"
            fill="url(#wv-water)"
            animate={{ x: [0, 60] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M-60 180q30-12 60 0t60 0 60 0 60 0 60 0 60 0V320H-60Z"
            fill="#6fb3ec"
            opacity=".55"
            animate={{ x: [60, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.g>
      </g>
      <path d="M86 150c-6 10-10 22-8 34" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".8" />

      {/* usage bars */}
      <g transform="translate(206 60)">
        <rect width="186" height="150" rx="16" fill="#f5fafe" />
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={18 + i * 27}
            y={132 - h}
            width="16"
            height={h}
            rx="6"
            fill={i === 3 ? '#6fb3ec' : i % 2 ? '#a8d8f5' : '#bfe9d6'}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </g>

      {/* conservation tip card */}
      <g transform="translate(206 226)">
        <rect width="186" height="70" rx="16" fill="#eefaf4" />
        <g transform="translate(34 35)">
          <motion.g animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '0px 14px' }}>
            <path d="M0 14C-16 2-10-18 14-16 16 6 8 18 0 14Z" fill="#8fd8b8" />
            <path d="M0 14C4 4 8-4 12-12" stroke="#5fbf96" strokeWidth="2" strokeLinecap="round" fill="none" />
          </motion.g>
        </g>
        <rect x="64" y="22" width="96" height="9" rx="4.5" fill="#bfe9d6" />
        <rect x="64" y="40" width="66" height="9" rx="4.5" fill="#d8f2e6" />
      </g>

      {/* field / crop row */}
      <g transform="translate(44 262)">
        <rect width="140" height="34" rx="12" fill="#f5fafe" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M${18 + i * 26} 26v-10m0 0c-6-1-8-6-8-8 4 0 8 2 8 8Zm0 0c6-1 8-6 8-8-4 0-8 2-8 8Z`}
            stroke="#5fbf96"
            strokeWidth="2"
            fill="#bfe9d6"
            strokeLinejoin="round"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
          />
        ))}
      </g>
    </svg>
  )
}
