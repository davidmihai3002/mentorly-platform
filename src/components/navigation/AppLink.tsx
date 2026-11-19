import { Link, type LinkProps } from 'react-router'

export function AppLink(props: LinkProps) {
  return <Link viewTransition {...props} />
}
