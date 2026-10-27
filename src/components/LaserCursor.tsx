import { useEffect, useRef } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
const TRAIL_LIFE = 220 // ms a trail point stays visible

type Point = { x: number; y: number; t: number }

function Laser({ reduced }: { reduced: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const root = document.documentElement
    root.classList.add('has-laser')

    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    const trail: Point[] = []
    let frame = 0
    let seen = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // The loop only runs while the pointer moves or the trail is still fading out.
    const tick = () => {
      const now = performance.now()
      const ease = reduced ? 1 : 0.4
      pos.x += (target.x - pos.x) * ease
      pos.y += (target.y - pos.y) * ease
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift()
      if (!reduced && trail.length > 1) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        for (let i = 1; i < trail.length; i++) {
          const life = 1 - (now - trail[i].t) / TRAIL_LIFE
          ctx.strokeStyle = `rgba(255, 59, 69, ${life * 0.32})`
          ctx.lineWidth = 1 + life * 3.5
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(trail[i].x, trail[i].y)
          ctx.stroke()
        }
      }

      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1
      frame = settled && trail.length === 0 ? 0 : requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      target.x = e.clientX
      target.y = e.clientY
      if (!seen) {
        seen = true
        pos.x = target.x
        pos.y = target.y
      }
      dot.dataset.visible = 'true'
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      const el = e.target instanceof Element ? e.target : null
      dot.dataset.hover = el?.closest(INTERACTIVE) ? 'true' : 'false'
      wake()
    }
    const onDown = () => (dot.dataset.pressed = 'true')
    const onUp = () => (dot.dataset.pressed = 'false')
    const onLeave = () => (dot.dataset.visible = 'false')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('has-laser')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998] h-full w-full" aria-hidden="true" />
      <div
        ref={dotRef}
        data-visible="false"
        className="laser group pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100"
        aria-hidden="true"
      >
        {/* hover ring */}
        <span className="absolute -left-[17px] -top-[17px] h-[34px] w-[34px] scale-0 rounded-full border-[1.5px] border-laser/70 bg-laser/[0.07] opacity-0 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-data-[hover=true]:scale-100 group-data-[hover=true]:opacity-100" />
        {/* glow */}
        <span className="absolute -left-[11px] -top-[11px] h-[22px] w-[22px] rounded-full bg-[radial-gradient(circle,rgba(255,59,69,.45)_0%,rgba(255,59,69,0)_70%)] transition-transform duration-300 group-data-[hover=true]:scale-150" />
        {/* core */}
        <span className="absolute -left-[4.5px] -top-[4.5px] h-[9px] w-[9px] rounded-full bg-laser shadow-[0_0_6px_1px_rgba(255,59,69,.65)] transition-transform duration-200 group-data-[hover=true]:scale-[0.7] group-data-[pressed=true]:scale-50" />
      </div>
    </>
  )
}

/** Red laser-pointer cursor. Mouse and trackpad only; touch devices keep their native behaviour. */
export function LaserCursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  if (!fine) return null
  return <Laser reduced={reduced} />
}
