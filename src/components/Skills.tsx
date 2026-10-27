import { motion } from 'motion/react'
import { skillGroups, type Skill } from '../data/skills'
import { SectionIntro, easeOut } from './Reveal'

function SkillTile({ skill, tilt }: { skill: Skill; tilt: number }) {
  return (
    <motion.li
      className="group relative flex flex-col items-center gap-2.5 rounded-2xl bg-white/80 px-3 pb-3.5 pt-4 shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_10px_24px_-18px_rgba(76,58,120,.4)]"
      variants={{ hidden: { opacity: 0, y: 16, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 } }}
      transition={{ duration: 0.5, ease: easeOut }}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
    >
      <motion.img
        src={skill.icon}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        className="h-10 w-10 object-contain md:h-11 md:w-11"
        whileHover={{ rotate: tilt, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      />
      <span className="text-center text-[13px] font-medium leading-tight text-ink-soft">{skill.name}</span>
      <span className="sr-only">: {skill.note}</span>
      {/* Hover label */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {skill.note}
      </span>
    </motion.li>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Skills" title="My toolbox." sub="Technologies I use to bring ideas to life." highlight={['toolbox']} />

        <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className={`relative rounded-[1.75rem] border border-white/90 p-5 md:p-6 ${group.span}`}
              style={{ background: `linear-gradient(160deg, ${group.tint} 0%, rgba(255,255,255,.55) 100%)` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: (gi % 3) * 0.06 }}
            >
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{group.title}</h3>
                <p className="text-right text-sm text-ink-muted">{group.blurb}</p>
              </div>
              <motion.ul
                className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ staggerChildren: 0.06, delayChildren: 0.15 }}
                aria-label={`${group.title} skills`}
              >
                {group.skills.map((skill, i) => (
                  <SkillTile key={skill.name} skill={skill} tilt={i % 2 ? 6 : -6} />
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
