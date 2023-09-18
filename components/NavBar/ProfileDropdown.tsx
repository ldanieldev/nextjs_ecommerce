'use client'
import Link from 'next/link'
import { TiShoppingCart } from 'react-icons/ti'
import ButtonLink from '../ButtonLink'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { getInitials } from '@/utils/stringUtils'

export default function ProfileDropdown() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <></>
  }

  return (
    <div className="font-bold w-full flex lg:inline-block flex-wrap lg:flex-nowrap dropdown dropdown-end lg:w-auto">
      {session ? (
        <button className="btn btn-ghost btn-circle avatar mx-2">
          <div className="w-10 rounded-full ring-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="profile photo"
                height={40}
                width={40}
              />
            ) : (
              <span className="text-2xl leading-9">
                {getInitials(session.user.name as string)}
              </span>
            )}
          </div>
        </button>
      ) : (
        <ButtonLink
          className="w-24 hidden lg:inline-block mx-2"
          href="/sign-in"
          text="Sign In"
        />
      )}

      <div className="flex flex-row flex-grow items-center justify-between lg:hidden">
        {session ? (
          <div className="flex flex-col">
            <h3 className="dark:text-white text-black">{session.user.name}</h3>
            <p className="text-sm">{session.user.email}</p>
          </div>
        ) : (
          <ButtonLink className="mx-2" href="/sign-in" text="Sign In" />
        )}

        <ThemeToggle className="btn btn-ghost" />

        <Link href="/cart" className="btn btn-ghost">
          <TiShoppingCart size={24} />
        </Link>
      </div>

      {session && (
        <ul className="w-screen menu shadow mt-3 p-2 lg:menu-compact lg:dropdown-content lg:rounded-box lg:w-52 lg:bg-gray-50 lg:dark:bg-slate-800">
          <li>
            <a href="/profile">My Profile</a>
          </li>
          <li>
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        </ul>
      )}
    </div>
  )
}
