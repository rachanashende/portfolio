import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, type PanInfo } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { Reveal, SectionIntro, easeOut } from './Reveal'

const slide = {
  enter: (dir: number) => ({ x: dir >= 0 ? 140 : -140, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -140 : 140, opacity: 0, scale: 0.97 }),
}

export function ProjectGallery() {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0])
  const [openId, setOpenId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const dragged = useRef(false)
  const total = projects.length
  const project = projects[index]
  const openProject = projects.find((p) => p.id === openId)

  const paginate = useCallback((dir: number) => setPage(([i]) => [(i + dir + total) % total, dir]), [total])
  const goTo = (i: number) => setPage(([cur]) => [i, i === cur ? 0 : i > cur ? 1 : -1])
  const close = useCallback(() => setOpenId(null), [])

  // Arrow keys move the gallery while it's on screen (and not while typing or reading a project).
  useEffect(() => {
    if (!inView || openId) return
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, openId, paginate])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2
    if (swipe < -70) paginate(1)
    else if (swipe > 70) paginate(-1)
    window.setTimeout(() => (dragged.current = false), 0)
  }

  const next = projects[(index + 1) % total]
  const prev = projects[(index - 1 + total) % total]

  return (
    <section id="projects" ref={sectionRef} className="relative px-5 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Projects" title="Things I’ve built." sub="A few projects I’ve worked on." highlight={['built']} />

        <Reveal className="mt-14 md:mt-16">
          <div role="region" aria-roledescription="carousel" aria-label="Project gallery" className="relative">
            {/* The deck: faint cards peeking out behind the current one */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              <div
                className="absolute inset-0 translate-x-4 translate-y-5 rotate-[1.4deg] rounded-[2.25rem] opacity-70 transition-[background] duration-700"
                style={{ background: `linear-gradient(135deg, ${next.accent.to}, ${next.accent.from})` }}
              />
              <div
                className="absolute inset-0 -translate-x-3 translate-y-3 -rotate-[1deg] rounded-[2.25rem] opacity-60 transition-[background] duration-700"
                style={{ background: `linear-gradient(135deg, ${prev.accent.from}, ${prev.accent.to})` }}
              />
            </div>

            <div className="relative grid">
              {/* Invisible copies reserve the tallest card's height so the page never jumps */}
              {projects.map((p, i) => (
                <div key={p.id} className="invisible [grid-area:1/1]" aria-hidden="true" inert>
                  <ProjectCard project={p} index={i} sizer />
                </div>
              ))}

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={project.id}
                  className="group/card relative cursor-grab touch-pan-y [grid-area:1/1] active:cursor-grabbing"
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: easeOut }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragStart={() => (dragged.current = true)}
                  onDragEnd={onDragEnd}
                  onClick={() => !dragged.current && setOpenId(project.id)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}: ${project.title}`}
                >
                  <ProjectCard project={project} index={index} onOpen={() => setOpenId(project.id)} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between gap-6 md:mt-12">
            <div className="flex items-center gap-5">
              <p className="text-sm font-medium tabular-nums text-ink" aria-live="polite" aria-atomic="true">
                <span className="sr-only">Project </span>
                <span className="inline-block w-[2ch] overflow-hidden align-bottom">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ y: direction >= 0 ? '100%' : '-100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: direction >= 0 ? '-100%' : '100%', opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-ink-muted"> / {String(total).padStart(2, '0')}</span>
              </p>

              <div className="flex items-center gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show project ${i + 1}: ${p.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="group relative flex h-8 items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? 'w-10 bg-ink' : 'w-4 bg-ink/15 group-hover:w-6 group-hover:bg-ink/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="hidden text-sm text-ink-muted lg:block">
                Up next · <span className="text-ink-soft">{next.title}</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label={`Previous project: ${prev.title}`}
                  className="glass group grid h-13 w-13 place-items-center rounded-full text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-95"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label={`Next project: ${next.title}`}
                  className="group grid h-13 w-13 place-items-center rounded-full bg-ink text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(31,28,38,.6)] active:scale-95"
                >
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            <span className="hidden md:inline">Tip: use ← → on your keyboard. </span>
            <span className="md:hidden">Swipe the card to browse. </span>
          </p>
        </Reveal>
      </div>

      <AnimatePresence>{openProject && <ProjectDetails key={openProject.id} project={openProject} onClose={close} />}</AnimatePresence>
    </section>
  )
}
