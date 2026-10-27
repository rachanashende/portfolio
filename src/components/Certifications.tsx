import { motion } from 'motion/react'
import { Award } from 'lucide-react'
import { certifications } from '../data/certifications'
import { SectionIntro, easeOut } from './Reveal'

export function Certifications() {
  return (
    <section id="certifications" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Certifications" title="Always learning." sub="Courses and certifications I’ve completed along the way." highlight={['learning']} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-5">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.title}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/65 p-6"
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.07 }}
              whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-80 transition-transform duration-700 group-hover:scale-125"
                style={{ background: `radial-gradient(circle, ${cert.tint} 0%, transparent 70%)` }}
                aria-hidden="true"
              />
              <span
                className="relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110"
                style={{ background: cert.tint, color: cert.ink }}
                aria-hidden="true"
              >
                <Award className="h-6 w-6" />
              </span>
              <p className="relative mt-auto pt-8 text-xs font-medium tracking-[0.14em] uppercase" style={{ color: cert.ink }}>
                {cert.issuer}
              </p>
              <h3 className="relative mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">{cert.title}</h3>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
