import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const easeOut = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}

interface SplitHeadingProps {
  text: string
  className?: string
  as?: 'h2' | 'h3'
  /** Words to paint with the pastel gradient. */
  highlight?: string[]
}

/** A section heading whose words rise in one after another. */
export function SplitHeading({ text, className = 'section-title', as = 'h2', highlight = [] }: SplitHeadingProps) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(word.replace(/[.,]/g, '')) ? 'text-gradient' : ''}`}
            variants={{
              hidden: { y: '105%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: easeOut } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

export function SectionIntro({ eyebrow, title, sub, highlight }: { eyebrow: string; title: string; sub?: string; highlight?: string[] }) {
  return (
    <div className="max-w-3xl">
      <Reveal y={12}>
        <p className="eyebrow mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-laser/80" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading text={title} highlight={highlight} />
      {sub && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-lg text-ink-muted md:text-xl">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
