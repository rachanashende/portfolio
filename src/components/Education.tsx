import { motion } from 'motion/react'
import { BookOpen } from 'lucide-react'
import { education } from '../data/education'
import { Reveal, SectionIntro, easeOut } from './Reveal'

/** How far through the programme today is, assuming an August start and a July finish. */
function programmeProgress(now = new Date()) {
  const start = new Date(education.startYear, 7, 1).getTime()
  const end = new Date(education.endYear, 6, 31).getTime()
  return Math.min(1, Math.max(0, (now.getTime() - start) / (end - start)))
}

function CgpaRing() {
  const r = 46
  return (
    <div className="relative grid h-36 w-36 shrink-0 place-items-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="cgpa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9a8f5" />
            <stop offset="1" stopColor="#f5a9c2" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#efeaf8" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#cgpa-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: education.cgpa / 10 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: easeOut, delay: 0.2 }}
        />
      </svg>
      <div className="text-center">
        <p className="text-[2rem] font-semibold leading-none tracking-tight text-ink">{education.cgpa.toFixed(2)}</p>
        <p className="mt-1 text-xs text-ink-muted">CGPA / 10</p>
      </div>
    </div>
  )
}

function CapIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true">
      <ellipse cx="100" cy="146" rx="70" ry="8" fill="#e9e3f7" />
      {/* books */}
      <rect x="44" y="112" width="112" height="22" rx="6" fill="#ffd3e2" />
      <rect x="52" y="92" width="100" height="22" rx="6" fill="#dcefff" />
      <rect x="40" y="72" width="108" height="22" rx="6" fill="#dcf5ea" />
      <rect x="140" y="116" width="10" height="14" rx="2" fill="#fff" opacity=".7" />
      <rect x="138" y="96" width="8" height="14" rx="2" fill="#fff" opacity=".7" />
      {/* cap */}
      <motion.g
        animate={{ y: [0, -5, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '100px 50px' }}
      >
        <path d="M70 46v18c0 8 14 14 30 14s30-6 30-14V46" fill="#b9a8f5" />
        <path d="M100 18 160 40 100 62 40 40Z" fill="#8b74ea" />
        <path d="M100 40 146 46v26" stroke="#f8b98f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="146" cy="76" r="5" fill="#f8b98f" />
      </motion.g>
    </svg>
  )
}

export function Education() {
  const progress = programmeProgress()
  const years = Array.from({ length: education.endYear - education.startYear + 1 }, (_, i) => education.startYear + i)

  return (
    <section id="education" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Education" title="My academic journey." highlight={['journey']} />

        <Reveal className="mt-14 md:mt-16">
          <article className="glass overflow-hidden rounded-[2.25rem]">
            <div className="grid gap-8 p-7 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-10 md:p-11">
              <div className="mx-auto h-32 w-40 md:h-40 md:w-full">
                <CapIllustration />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-sm font-medium text-[#1f7a53]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fbf86]" aria-hidden="true" />
                  In progress
                </span>
                <h3 className="mt-4 text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">{education.degree}</h3>
                <p className="mt-2 text-lg text-ink-soft">{education.school}</p>
                <p className="mt-1 text-ink-muted">
                  {education.location} · {education.startYear}–{education.endYear}
                </p>
              </div>

              <div className="flex items-center gap-4 md:flex-col md:gap-2">
                <CgpaRing />
                <p className="max-w-[9rem] text-sm text-ink-muted md:text-center">{education.cgpaNote}</p>
              </div>
            </div>

            {/* Programme timeline */}
            <div className="border-t border-white/80 bg-white/40 px-7 py-8 md:px-11">
              <div className="relative">
                <div className="h-1.5 rounded-full bg-ink/8" />
                <motion.div
                  className="absolute left-0 top-0 h-1.5 origin-left rounded-full bg-gradient-to-r from-lavender-deep via-pink-deep to-peach-deep"
                  style={{ width: `${progress * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: easeOut, delay: 0.3 }}
                />
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${progress * 100}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 16 }}
                  aria-hidden="true"
                >
                  <span className="-ml-2 block h-4 w-4 rounded-full border-[3px] border-white bg-laser shadow-[0_0_12px_rgba(255,59,69,.55)]" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[11px] text-white">Now</span>
                </motion.span>
              </div>
              <div className="mt-3 flex justify-between text-sm text-ink-muted tabular-nums">
                {years.map((y) => (
                  <span key={y}>{y}</span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-8" delay={0.05}>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
            <BookOpen className="h-5 w-5 text-lavender-deep" aria-hidden="true" />
            Relevant coursework
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {education.coursework.map((course, i) => (
              <motion.li
                key={course}
                className="rounded-2xl border border-white bg-white/60 px-5 py-4 text-[15px] text-ink-soft transition-colors hover:bg-white"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                {course}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
