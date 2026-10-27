import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { CalendarDays, MapPin } from 'lucide-react'
import { experience } from '../data/experience'
import { SectionIntro, easeOut } from './Reveal'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section id="experience" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Experience"
          title="Where I’ve pitched in."
          sub="Outside the classroom, I’ve been organising people and helping students learn."
          highlight={['pitched']}
        />

        <ol ref={listRef} className="relative mt-16 space-y-10 md:mt-20 md:space-y-14">
          {/* The track and its scroll-linked fill */}
          <span className="absolute bottom-2 left-[11px] top-2 w-[2px] rounded-full bg-ink/8 md:left-[15px]" aria-hidden="true" />
          <motion.span
            className="absolute bottom-2 left-[11px] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-lavender-deep via-pink-deep to-peach-deep md:left-[15px]"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />

          {experience.map((item, i) => (
            <li key={item.role} className="relative pl-10 md:pl-16">
              <motion.span
                className="absolute left-0 top-7 grid h-6 w-6 place-items-center rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,.6)] md:h-8 md:w-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-full md:h-3 md:w-3" style={{ background: item.ink }} />
              </motion.span>

              <motion.article
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -120px 0px' }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-9"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium" style={{ background: item.tint, color: item.ink }}>
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.place}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-[1.9rem]">{item.role}</h3>
                  <p className="mt-1 text-lg text-ink-soft">{item.org}</p>
                  <ul className="mt-5 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[16px] leading-relaxed text-ink-soft">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: item.ink }} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="flex flex-col justify-center rounded-3xl px-7 py-6 md:w-[270px] md:text-center"
                  style={{ background: `linear-gradient(140deg, ${item.tint}, #ffffffb0)` }}
                >
                  <p className="text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]" style={{ color: item.ink }}>
                    {item.highlight.value}
                  </p>
                  <p className="mt-2 text-[15px] text-ink-soft">{item.highlight.label}</p>
                </div>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
