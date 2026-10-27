import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { easeOut } from './Reveal'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/** Tracks which section sits under the upper third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(links.some((l) => l.id === id) ? id : null)
          }
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

export function Navbar({ visible }: { visible: boolean }) {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      initial={{ y: -30, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
      transition={{ duration: 0.8, ease: easeOut, delay: visible ? 0.9 : 0 }}
    >
      <nav
        aria-label="Primary"
        className={`relative flex w-full max-w-3xl items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 transition-all duration-500 ${
          scrolled || open ? 'glass' : 'border border-transparent bg-white/30 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-ink" aria-label="Rachana Shende, back to top">
          rachana
          <span className="h-1.5 w-1.5 rounded-full bg-laser shadow-[0_0_8px_rgba(255,59,69,.7)]" aria-hidden="true" />
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === link.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(76,58,120,.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-px md:block"
        >
          Say hi
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-white/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-white bg-white p-2 shadow-[0_24px_50px_-20px_rgba(76,58,120,.35)] md:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base transition-colors ${
                        active === link.id ? 'bg-white text-ink' : 'text-ink-soft hover:bg-white/60'
                      }`}
                    >
                      {link.label}
                      {active === link.id && <span className="h-1.5 w-1.5 rounded-full bg-laser" aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
