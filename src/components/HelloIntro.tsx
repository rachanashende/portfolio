import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

/** One continuous cursive stroke spelling "hello". */
export const HELLO_PATH =
  'M18 196 C48 176 96 120 106 74 C113 42 92 28 82 56 C72 88 66 160 62 200 ' +
  'C70 162 88 134 110 134 C132 134 132 168 134 192 C136 204 150 204 162 194 ' +
  'C182 180 200 160 196 146 C192 132 172 132 166 150 C160 170 168 198 190 200 ' +
  'C212 202 226 188 236 168 C252 136 274 84 272 58 C270 36 250 36 248 64 ' +
  'C246 100 244 168 254 192 C262 208 280 202 292 176 C306 144 326 92 324 64 ' +
  'C322 40 302 40 300 68 C298 104 296 170 306 192 C314 208 334 204 346 184 ' +
  'C354 168 366 148 384 140 C360 138 346 170 356 192 C366 210 396 204 404 180 ' +
  'C412 156 398 136 384 140 C400 144 420 146 446 132'

const DRAW = 1.9

export function HelloScript({
  className,
  duration = DRAW,
  delay = 0.25,
  onDrawn,
}: {
  className?: string
  duration?: number
  delay?: number
  onDrawn?: () => void
}) {
  return (
    <svg viewBox="0 0 464 230" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="hello-ink" x1="0" y1="0" x2="464" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9b82f0" />
          <stop offset="0.38" stopColor="#e889b8" />
          <stop offset="0.7" stopColor="#f49f7c" />
          <stop offset="1" stopColor="#efab55" />
        </linearGradient>
      </defs>
      <motion.path
        d={HELLO_PATH}
        stroke="url(#hello-ink)"
        strokeWidth={11}
        strokeLinecap="round"
        strokeLinejoin="round"
        onAnimationComplete={onDrawn}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration, delay, ease: [0.55, 0.05, 0.3, 1] },
          opacity: { duration: 0.2, delay },
        }}
      />
    </svg>
  )
}

/**
 * Opening sequence: "hello" writes itself on a clean cream screen, then the
 * curtain lifts into the hero. Click, tap, or press any key to skip.
 */
export function HelloIntro({ onDone }: { onDone: () => void }) {
  const done = useRef(false)
  const finish = () => {
    if (done.current) return
    done.current = true
    onDone()
  }

  useEffect(() => {
    // Safety net in case the drawing never reports back (e.g. the tab was in the background).
    const timer = window.setTimeout(finish, 6000)
    const skip = () => finish()
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchstart', skip, { passive: true })
    return () => {
      window.clearTimeout(timer)
      root.style.overflow = prevOverflow
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchstart', skip)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
      onPointerDown={finish}
      role="presentation"
    >
      <motion.div
        className="w-[min(78vw,820px)]"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.12, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
        transition={{ duration: 2.6, ease: 'easeOut' }}
      >
        <HelloScript className="h-auto w-full" onDrawn={() => window.setTimeout(finish, 450)} />
      </motion.div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        Skip intro
      </button>
    </motion.div>
  )
}
