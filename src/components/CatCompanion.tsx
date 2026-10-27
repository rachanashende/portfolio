import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, PawPrint } from 'lucide-react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMediaQuery'

const STORAGE_KEY = 'rs-cat-hidden'
const EYES = [
  { x: 47, y: 50 },
  { x: 73, y: 50 },
]

const fur = '#ddd6ec'
const furDark = '#c4b9dc'
const line = '#a397c0'
const belly = '#f5f2fb'

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function CatSvg({ tracking, reduced }: { tracking: boolean; reduced: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const pupilRefs = useRef<(SVGGElement | null)[]>([])
  const [blink, setBlink] = useState(false)

  // Blink every few seconds, sometimes twice.
  useEffect(() => {
    if (reduced) return
    let timer = 0
    const schedule = () => {
      timer = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 140)
        if (Math.random() < 0.25) {
          window.setTimeout(() => setBlink(true), 280)
          window.setTimeout(() => setBlink(false), 420)
        }
        schedule()
      }, 2400 + Math.random() * 3800)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [reduced])

  // Eyes (and a little head tilt) follow the cursor, eased so they never jump.
  useEffect(() => {
    if (!tracking) return
    const svg = svgRef.current!
    let rect = svg.getBoundingClientRect()
    const target = { px: 0, py: 0, rot: 0, hx: 0, hy: 0 }
    const cur = { ...target }
    let frame = 0

    const apply = () => {
      pupilRefs.current.forEach((p) => p?.setAttribute('transform', `translate(${cur.px.toFixed(2)} ${cur.py.toFixed(2)})`))
      headRef.current?.setAttribute('transform', `translate(${cur.hx.toFixed(2)} ${cur.hy.toFixed(2)}) rotate(${cur.rot.toFixed(2)} 60 72)`)
    }

    const tick = () => {
      let moving = false
      for (const k of Object.keys(target) as (keyof typeof target)[]) {
        const delta = target[k] - cur[k]
        cur[k] += delta * (reduced ? 1 : 0.14)
        if (Math.abs(delta) > 0.01) moving = true
      }
      apply()
      frame = moving ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e: PointerEvent) => {
      const scale = rect.width / 120
      const cx = rect.left + 60 * scale
      const cy = rect.top + 50 * scale
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const reach = Math.min(3.2, dist / 45)
      target.px = (dx / dist) * reach
      target.py = (dy / dist) * reach * 0.85
      target.rot = clamp(dx / 45, -9, 9)
      target.hx = clamp(dx / 160, -2.5, 2.5)
      target.hy = clamp(dy / 220, -2.5, 1.5)
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onResize = () => (rect = svg.getBoundingClientRect())

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [tracking, reduced])

  return (
    <svg ref={svgRef} viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden="true">
      <ellipse cx="60" cy="117" rx="36" ry="3.5" fill="#2a2633" opacity=".08" />

      {/* tail */}
      <g style={{ transformOrigin: '84px 110px', animation: 'tail-sway 3.6s ease-in-out infinite' }}>
        <path d="M82 111C102 113 113 100 109 85C107 77 100 77 100 83" fill="none" stroke={line} strokeWidth="11" strokeLinecap="round" />
        <path d="M82 111C102 113 113 100 109 85C107 77 100 77 100 83" fill="none" stroke={furDark} strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* body */}
      <g style={{ transformOrigin: '60px 116px', animation: 'cat-breathe 3.2s ease-in-out infinite' }}>
        <path d="M30 116C25 95 33 72 60 71C87 72 95 95 90 116Z" fill={fur} stroke={line} strokeWidth="1.5" />
        <path d="M46 116C44 100 50 86 60 86C70 86 76 100 74 116Z" fill={belly} />
        <path d="M34 92q6 2 9-2M86 92q-6 2-9-2" stroke={furDark} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="48" cy="114" rx="9" ry="5" fill={belly} stroke={line} strokeWidth="1.5" />
        <ellipse cx="72" cy="114" rx="9" ry="5" fill={belly} stroke={line} strokeWidth="1.5" />
      </g>

      {/* head */}
      <g ref={headRef}>
        <path d="M30 44 34 13 55 31Z" fill={fur} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M90 44 86 13 65 31Z" fill={fur} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M35.5 35 37.5 21 47.5 31Z" fill="#ffc9d6" />
        <path d="M84.5 35 82.5 21 72.5 31Z" fill="#ffc9d6" />
        <ellipse cx="60" cy="50" rx="32" ry="26" fill={fur} stroke={line} strokeWidth="1.5" />
        <path d="M54 27v6M60 25.5v7.5M66 27v6" stroke={furDark} strokeWidth="2.6" strokeLinecap="round" />

        {EYES.map((eye, i) => (
          <g
            key={i}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: blink ? 'scaleY(0.08)' : 'scaleY(1)',
              transition: 'transform 90ms ease-in-out',
            }}
          >
            <ellipse cx={eye.x} cy={eye.y} rx="7.6" ry="8.4" fill="#fff" stroke={line} strokeWidth="1" />
            <g ref={(el) => void (pupilRefs.current[i] = el)}>
              <g style={!tracking && !reduced ? { animation: 'eye-wander 7s ease-in-out infinite' } : undefined}>
                <circle cx={eye.x} cy={eye.y} r="4.7" fill="#2a2633" />
                <circle cx={eye.x - 1.6} cy={eye.y - 1.9} r="1.5" fill="#fff" />
              </g>
            </g>
          </g>
        ))}

        <ellipse cx="37" cy="61" rx="5.5" ry="3" fill="#ffc0d0" opacity=".75" />
        <ellipse cx="83" cy="61" rx="5.5" ry="3" fill="#ffc0d0" opacity=".75" />
        <path d="M57 58.2h6l-3 3.4Z" fill="#f094b0" stroke="#f094b0" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M60 61.8v1.6m0 0q-2.6 2.8-5.4.4m5.4-.4q2.6 2.8 5.4.4" stroke="#6b6577" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M31 57 17 54M31 61l-14 1M89 57l14-3M89 61l14 1" stroke={line} strokeWidth="1.1" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/** A small cat in the corner whose eyes follow your cursor. Purely decorative, and can be tucked away. */
export function CatCompanion() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })
  const [meow, setMeow] = useState(false)

  const toggle = (next: boolean) => {
    setHidden(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }

  const onPet = () => {
    if (meow) return
    setMeow(true)
    window.setTimeout(() => setMeow(false), 1600)
  }

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-40 md:bottom-5 md:right-5">
      <AnimatePresence mode="wait" initial={false}>
        {hidden ? (
          <motion.button
            key="show"
            type="button"
            onClick={() => toggle(false)}
            className="glass pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-ink-soft transition-colors hover:text-ink"
            aria-label="Show the cat companion"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            whileHover={{ rotate: -12 }}
          >
            <PawPrint className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        ) : (
          <motion.div
            key="cat"
            className="group relative"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <AnimatePresence>
              {meow && (
                <motion.span
                  className="absolute -top-7 right-12 whitespace-nowrap rounded-full rounded-br-sm bg-white px-3 py-1 text-sm text-ink shadow-[0_8px_20px_-10px_rgba(76,58,120,.5)]"
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  aria-hidden="true"
                >
                  mrrp!
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              className={`h-[68px] w-[68px] md:h-24 md:w-24 ${fine ? 'pointer-events-auto' : ''}`}
              onClick={fine ? onPet : undefined}
              animate={meow ? { y: [0, -8, 0] } : { y: 0 }}
              transition={{ duration: 0.4 }}
              data-cursor="hover"
            >
              <CatSvg tracking={fine} reduced={reduced} />
            </motion.div>

            <button
              type="button"
              onClick={() => toggle(true)}
              className="pointer-events-auto absolute -left-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink-muted shadow-sm transition-all hover:text-ink focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Hide the cat companion"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
