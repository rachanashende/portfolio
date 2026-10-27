import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True for a mouse or trackpad — the only devices that get the laser cursor and eye tracking. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
