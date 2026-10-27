import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { useFinePointer } from '../hooks/useMediaQuery'
import { easeOut } from './Reveal'

/** Blurred rise-in for the headline; a plain quick fade when reduced motion is requested. */
function useEntrance(blur: number) {
  const reduce = useReducedMotion()
  return reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, duration: 0.4, stagger: 0 }
    : {
        initial: { opacity: 0, y: '0.35em', filter: `blur(${blur}px)` },
        animate: { opacity: 1, y: '0em', filter: 'blur(0px)' },
        duration: 0.9,
        stagger: 1,
      }
}

function Letters({ text, start, show }: { text: string; start: number; show: boolean }) {
  const entrance = useEntrance(10)
  return (
    <span className="inline-block" aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={entrance.initial}
          animate={show ? entrance.animate : undefined}
          transition={{ duration: entrance.duration, ease: easeOut, delay: (start + i * 0.035) * entrance.stagger }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

function Backdrop() {
  const fine = useFinePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, [0, 800], [0, 160])
  const driftSlow = useTransform(scrollY, [0, 800], [0, 70])

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, mx, my])

  const near = { x: useTransform(sx, (v) => v * 26), y: useTransform(sy, (v) => v * 20) }
  const far = { x: useTransform(sx, (v) => v * -14), y: useTransform(sy, (v) => v * -10) }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Soft colour fields — radial gradients rather than CSS blur, so they stay cheap to paint. */}
      <div className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,#e3d9ff_0%,transparent_62%)] opacity-90 [animation:drift_22s_ease-in-out_infinite]" />
      <div className="absolute -right-[18%] top-[5%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,#ffd9e6_0%,transparent_60%)] opacity-90 [animation:drift_26s_ease-in-out_infinite_reverse]" />
      <div className="absolute -bottom-[30%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,#ffe2cc_0%,transparent_60%)] opacity-80 [animation:drift_30s_ease-in-out_infinite]" />
      <div className="absolute bottom-[0%] right-[5%] hidden h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,#d6ecff_0%,transparent_60%)] opacity-90 md:block [animation:drift_24s_ease-in-out_infinite_reverse]" />

      {/* Floating geometry */}
      <motion.div style={{ y: drift }} className="absolute left-[9%] top-[22%] hidden md:block">
        <motion.div style={near}>
          <div className="h-24 w-24 rounded-full border-[10px] border-lavender-deep/45 [animation:float-y_7s_ease-in-out_infinite]" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: driftSlow }} className="absolute right-[11%] top-[18%]">
        <motion.div style={far}>
          <div className="h-14 w-14 rotate-12 rounded-2xl bg-gradient-to-br from-peach to-pink-deep/60 shadow-[0_20px_40px_-18px_rgba(240,140,120,.6)] [animation:float-y_8s_ease-in-out_infinite] md:h-20 md:w-20 md:rounded-[1.6rem]" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: drift }} className="absolute bottom-[20%] left-[14%]">
        <motion.div style={far}>
          <div className="h-5 w-16 -rotate-12 rounded-full bg-mint-deep/60 [animation:float-y_6s_ease-in-out_infinite] md:h-6 md:w-24" />
        </motion.div>
      </motion.div>
      <motion.div style={{ y: driftSlow }} className="absolute bottom-[24%] right-[16%] hidden sm:block">
        <motion.div style={near}>
          <svg width="46" height="46" viewBox="0 0 24 24" className="text-sky-deep [animation:float-y_9s_ease-in-out_infinite]">
            <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill="currentColor" opacity=".7" />
          </svg>
        </motion.div>
      </motion.div>
      <motion.div style={{ y: driftSlow }} className="absolute left-[30%] top-[12%] hidden lg:block">
        <motion.div style={far}>
          <div className="grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-lavender-deep" />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div style={{ y: drift }} className="absolute right-[30%] top-[70%] hidden lg:block">
        <motion.div style={near}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky to-lavender-deep/50 [animation:float-y_7.5s_ease-in-out_infinite]" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const nameEntrance = useEntrance(14)
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-28 pt-28">
      <Backdrop />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.p
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-ink-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-deep opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fbf86]" />
          </span>
          Open to software development internships
        </motion.p>

        <h1 className="text-[clamp(3.2rem,11.5vw,9.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-ink">
          <span className="sr-only">Hello, I’m Rachana.</span>
          <Letters text="Hello," start={0.1} show={ready} />
          <br />
          <Letters text="I’m " start={0.32} show={ready} />
          {/* Animated as one word so the gradient can span all of its letters */}
          <motion.span
            aria-hidden="true"
            className="text-gradient inline-block pb-[0.08em]"
            initial={nameEntrance.initial}
            animate={ready ? nameEntrance.animate : undefined}
            transition={{ duration: nameEntrance.duration + 0.2, ease: easeOut, delay: 0.5 * nameEntrance.stagger }}
          >
            Rachana.
          </motion.span>
        </h1>

        <motion.p
          className="mt-8 flex flex-col items-center justify-center gap-x-3 gap-y-1 text-base sm:flex-row sm:flex-wrap font-medium text-ink-soft md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.85 }}
        >
          {profile.roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-ink-muted/50 sm:block" aria-hidden="true" />}
              {role}
            </span>
          ))}
        </motion.p>

        <motion.p
          className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.0 }}
        >
          {profile.statement}
        </motion.p>

        <motion.div
          className="mt-10 flex w-full max-w-[17rem] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.15 }}
        >
          <a
            href="#projects"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(31,28,38,.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(111,88,217,.6)]"
          >
            Explore my work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="glass group inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium tracking-[0.2em] text-ink-muted uppercase"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.6 }}
        aria-label="Scroll to About section"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border-[1.5px] border-ink-muted/40 pt-1.5" aria-hidden="true">
          <span className="h-2 w-1 rounded-full bg-ink-muted/70 [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
        <span className="flex items-center gap-1">
          Scroll <ArrowDown className="h-3 w-3" aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  )
}
