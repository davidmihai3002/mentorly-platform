import { useEffect, type RefObject } from 'react'

export function useOutsidePointerDown(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onOutside: () => void,
): void {
  useEffect(() => {
    if (!isActive) return
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && ref.current?.contains(event.target)) return
      onOutside()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, isActive, onOutside])
}
