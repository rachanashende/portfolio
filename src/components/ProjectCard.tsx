import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { techIcons } from '../data/skills'
import { TrackerVisual } from './visuals/TrackerVisual'
import { WaterVisual } from './visuals/WaterVisual'
import { EmployeeVisual } from './visuals/EmployeeVisual'

export function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  if (visual === 'tracker') return <TrackerVisual />
  if (visual === 'water') return <WaterVisual />
  return <EmployeeVisual />
}

export function TechBadge({ name }: { name: string }) {
  const icon = techIcons[name]
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/75 py-1 pl-1.5 pr-3 text-[13px] font-medium text-ink-soft">
      {icon ? (
        <img src={icon} alt="" className="h-4.5 w-4.5 object-contain" width={18} height={18} />
      ) : (
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-ink-muted/50" aria-hidden="true" />
      )}
      {name}
    </li>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  onOpen?: () => void
  /** The invisible copies used to reserve height skip the illustration. */
  sizer?: boolean
}

export function ProjectCard({ project, index, onOpen, sizer = false }: ProjectCardProps) {
  return (
    <article
      className="relative grid h-full overflow-hidden rounded-[2.25rem] border border-white/80 shadow-[0_30px_80px_-40px_rgba(76,58,120,.35)] lg:grid-cols-[1fr_1.1fr]"
      style={{ background: `linear-gradient(135deg, ${project.accent.from} 0%, ${project.accent.to} 100%)` }}
      aria-labelledby={sizer ? undefined : `project-title-${project.id}`}
    >
      <div className="relative order-2 flex flex-col p-7 pt-2 sm:p-10 sm:pt-4 lg:order-1 lg:p-12">
        <p className="flex items-baseline gap-3 font-medium">
          <span className="text-sm tabular-nums" style={{ color: project.accent.ink }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-ink/15" aria-hidden="true" />
          <span className="eyebrow">{project.tagline}</span>
        </p>
        <h3 id={sizer ? undefined : `project-title-${project.id}`} className="mt-5 text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <TechBadge key={t} name={t} />
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-4 pt-1 lg:mt-auto lg:pt-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpen?.()
            }}
            tabIndex={sizer ? -1 : undefined}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_rgba(31,28,38,.6)]"
          >
            Explore project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <span className="hidden text-sm text-ink-muted sm:inline">or click the card</span>
        </div>
      </div>

      <div className="relative order-1 flex items-center justify-center p-5 sm:p-8 lg:order-2 lg:p-10">
        <div className="aspect-[44/34] w-full max-w-[520px] transition-transform duration-700 ease-out group-hover/card:scale-[1.02]">
          {!sizer && <ProjectVisual visual={project.visual} />}
        </div>
      </div>
    </article>
  )
}
