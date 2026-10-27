import { motion, useScroll, useSpring, useTransform } from 'motion/react'

/** Thin pastel bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-lavender-deep via-pink-deep to-peach-deep"
      style={{ scaleX }}
    />
  )
}

/** Page background that drifts between pastel tints as you scroll through the sections. */
export function BackgroundWash() {
  const { scrollYProgress } = useScroll()
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.45, 0.6, 0.74, 0.88, 1],
    ['#fbf8f3', '#f7f3ff', '#fdf3f6', '#f3f8ff', '#f6f3ff', '#f2faf6', '#fff6ef', '#fbf6fb'],
  )
  return <motion.div aria-hidden="true" className="fixed inset-0 -z-10" style={{ backgroundColor }} />
}
