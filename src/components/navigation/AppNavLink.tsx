import { NavLink, type NavLinkProps } from 'react-router'

export function AppNavLink(props: NavLinkProps) {
  return <NavLink viewTransition {...props} />
}
