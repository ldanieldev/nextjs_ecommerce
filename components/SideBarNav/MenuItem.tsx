'use client'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type props = {
  icon: IconType
  iconSize?: number
  linkText: string
  href: string
}
export default function MenuItem(props: props) {
  const pathname: string = usePathname()
  const pathMatchRoute = (route: string, match = true) =>
    match ? pathname === route : pathname.includes(route)

  return (
    <Link
      href={props.href}
      className={`font-bold ${pathMatchRoute(props.href) ? 'active' : ''}`}
    >
      <props.icon size={props.iconSize || 18} className="inline-block mr-2" />
      {props.linkText}
    </Link>
  )
}
