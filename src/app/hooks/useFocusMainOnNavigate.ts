import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { MAIN_CONTENT_ID } from '@/constants'

export function useFocusMainOnNavigate(): void {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true })
  }, [pathname])
}
