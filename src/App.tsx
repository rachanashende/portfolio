import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { HelloIntro } from './components/HelloIntro'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { ProjectGallery } from './components/ProjectGallery'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { LaserCursor } from './components/LaserCursor'
import { CatCompanion } from './components/CatCompanion'
import { BackgroundWash, ScrollProgress } from './components/ScrollProgress'

const INTRO_KEY = 'rs-intro-seen'

/** The intro plays once per browser session, never for reduced-motion users or deep links. */
function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.location.hash && window.location.hash !== '#top') return false
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro)

  // The browser looks for #anchors before React has rendered them, so honour deep links once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  const endIntro = () => {
    setIntro(false)
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* private mode — the intro will simply play again next visit */
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <BackgroundWash />
      <ScrollProgress />
      <Navbar visible={!intro} />

      <main id="main">
        <Hero ready={!intro} />
        <About />
        <Experience />
        <ProjectGallery />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      <CatCompanion />
      <LaserCursor />

      <AnimatePresence>{intro && <HelloIntro onDone={endIntro} />}</AnimatePresence>
    </MotionConfig>
  )
}
