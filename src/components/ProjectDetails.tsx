import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { Check, Compass, MessageCircle, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { ProjectVisual, TechBadge } from './ProjectCard'
import { easeOut } from './Reveal'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface ProjectDetailsProps {
  project: Project
  onClose: () => void
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [onClose])

  const goToContact = () => {
    onClose()
    window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 250)
  }

  return createPortal(
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
      <motion.div
        className="absolute inset-0 bg-[#f4f0fa]/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-[2rem] bg-offwhite shadow-[0_40px_120px_-30px_rgba(76,58,120,.45)] sm:rounded-[2rem]"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <div
          className="relative px-6 pb-2 pt-6 sm:px-10 sm:pt-8"
          style={{ background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})` }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/80 text-ink transition-all hover:rotate-90 hover:bg-white"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="eyebrow pr-12">{project.tagline}</p>
          <h3 id="project-dialog-title" className="mt-3 pr-10 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-[2.6rem] sm:leading-[1.08]">
            {project.title}
          </h3>
          <div className="mx-auto mt-4 aspect-[44/34] w-full max-w-[400px]">
            <ProjectVisual visual={project.visual} />
          </div>
        </div>

        <div className="space-y-9 px-6 py-8 sm:px-10 sm:py-10">
          <section aria-labelledby="pd-overview">
            <h4 id="pd-overview" className="eyebrow">
              Overview
            </h4>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{project.overview}</p>
          </section>

          <section aria-labelledby="pd-tech">
            <h4 id="pd-tech" className="eyebrow">
              Technologies
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </ul>
          </section>

          <section aria-labelledby="pd-contrib">
            <h4 id="pd-contrib" className="eyebrow">
              Key contributions
            </h4>
            <ul className="mt-4 space-y-3">
              {project.contributions.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex gap-3 text-[16px] leading-relaxed text-ink-soft"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: easeOut }}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: project.accent.from, color: project.accent.ink }}>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="pd-impl">
            <h4 id="pd-impl" className="eyebrow">
              How it’s put together
            </h4>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.implementation.map((item) => (
                <div key={item.label} className="rounded-2xl border border-mist bg-white px-4 py-3.5">
                  <dt className="text-sm font-medium" style={{ color: project.accent.ink }}>
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-snug text-ink-soft">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          {project.note && (
            <aside className="flex gap-3 rounded-2xl bg-peach/60 px-5 py-4 text-[15px] leading-relaxed text-ink-soft">
              <Compass className="mt-0.5 h-5 w-5 shrink-0 text-[#b8622a]" aria-hidden="true" />
              <p>
                <span className="font-medium text-ink">On the roadmap. </span>
                {project.note}
              </p>
            </aside>
          )}

          <div className="flex flex-col items-start justify-between gap-4 border-t border-mist pt-7 sm:flex-row sm:items-center">
            <p className="text-[15px] text-ink-muted">Curious about how something works? I’m happy to walk you through it.</p>
            <button
              type="button"
              onClick={goToContact}
              className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask me about it
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
