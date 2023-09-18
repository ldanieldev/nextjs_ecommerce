import Link from 'next/link'

type props = {
  href: string
  text: string
  className?: string
}

export default function ButtonLink(props: props) {
  return (
    <button className={`btn btn-primary ${props.className}`}>
      <Link href={props.href}>{props.text}</Link>
    </button>
  )
}
