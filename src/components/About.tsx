import { motion } from 'motion/react'
import { Brain, Code2, Layers, MapPin, GraduationCap, Search } from 'lucide-react'
import { Reveal, SectionIntro, easeOut } from './Reveal'
import { profile } from '../data/profile'

const exploring = [
  { label: 'Full-stack development', icon: Layers, tint: 'bg-lavender', ink: 'text-[#6a52cf]' },
  { label: 'Artificial intelligence', icon: Brain, tint: 'bg-pink', ink: 'text-[#c24f7a]' },
  { label: 'Software development', icon: Code2, tint: 'bg-sky', ink: 'text-[#2f74b5]' },
]

const facts = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: GraduationCap, label: 'Studying', value: 'Computer Science, BMSIT&M' },
  { icon: Search, label: 'Looking for', value: 'A software development internship' },
]

export function About() {
  return (
    <section id="about" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="About" title="A little about me." highlight={['me']} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-[1.35rem] md:leading-[1.6]">
            <Reveal>
              <p>
                I’m Rachana, a Computer Science student at{' '}
                <span className="text-ink">B.M.S. Institute of Technology &amp; Management</span>. I like figuring out how technology can
                solve real-world problems — and then building applications that people can actually use.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Lately I’ve been drawn to <span className="text-ink">full-stack development</span>,{' '}
                <span className="text-ink">artificial intelligence</span> and making digital experiences that feel intuitive. I learn best by
                building, enjoy experimenting with new tools, and love working things out together with other people.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="grid gap-3 pt-4 sm:grid-cols-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-white bg-white/55 px-4 py-3.5">
                    <dt className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-ink-muted uppercase">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-snug text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="glass relative overflow-hidden rounded-[2rem] p-7 md:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,#ffd9e6_0%,transparent_65%)]" aria-hidden="true" />
              <svg className="absolute right-7 top-7 h-6 w-6 text-pink-deep" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill="currentColor" />
              </svg>

              <p className="eyebrow">Currently exploring</p>
              <ul className="mt-6 space-y-3">
                {exploring.map(({ label, icon: Icon, tint, ink }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easeOut, delay: 0.25 + i * 0.1 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/70 p-3 pr-5"
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tint} ${ink}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-[17px] text-ink">{label}</span>
                  </motion.li>
                ))}
              </ul>

              <svg className="mt-8 h-6 w-40 text-lavender-deep" viewBox="0 0 160 24" fill="none" aria-hidden="true">
                <motion.path
                  d="M2 12c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 30 0 20-10 30 0"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
                />
              </svg>
              <p className="mt-3 text-sm text-ink-muted">Interests I’m learning about and building toward.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
