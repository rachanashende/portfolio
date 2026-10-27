import { ArrowUp, Mail } from 'lucide-react'
import linkedinLogo from 'devicon/icons/linkedin/linkedin-original.svg'
import githubLogo from 'devicon/icons/github/github-original.svg'
import { mailtoUrl, profile } from '../data/profile'

const iconLink =
  'grid h-11 w-11 place-items-center rounded-full bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_20px_-10px_rgba(76,58,120,.5)]'

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })

  return (
    <footer className="relative px-5 pb-28 pt-10 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between md:pr-24 2xl:pr-0">
        <div>
          <p className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-ink">
            {profile.name}
            <span className="h-1.5 w-1.5 rounded-full bg-laser shadow-[0_0_8px_rgba(255,59,69,.7)]" aria-hidden="true" />
          </p>
          <p className="mt-1 text-ink-muted">Designed with curiosity and built with code.</p>
          <p className="mt-4 text-sm text-ink-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub (opens in a new tab)">
            <img src={githubLogo} alt="" width={20} height={20} className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn (opens in a new tab)">
            <img src={linkedinLogo} alt="" width={20} height={20} className="h-5 w-5" />
          </a>
          <a href={mailtoUrl()} className={iconLink} aria-label={`Email ${profile.email}`}>
            <Mail className="h-5 w-5 text-ink" aria-hidden="true" />
          </a>
          <span className="mx-2 h-6 w-px bg-ink/10" aria-hidden="true" />
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-all hover:-translate-y-1"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
