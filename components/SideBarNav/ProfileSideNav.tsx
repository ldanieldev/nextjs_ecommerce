'use client'
import { FaFileInvoiceDollar, FaRegAddressCard } from 'react-icons/fa'
import { MdLogout, MdStore } from 'react-icons/md'
import { signOut, useSession } from 'next-auth/react'
import MenuItem from '@/components/SideBarNav/MenuItem'
import ClipLoader from 'react-spinners/ClipLoader'

export default function ProfileSideNav() {
  const { data: session } = useSession()

  if (!session) {
    return <ClipLoader color="hsl(var(--pc))" />
  }

  return (
    <aside className="menu w-fit bg-neutral h-full">
      <ul>
        {session.user.isAdmin && (
          <>
            <li>
              <MenuItem
                icon={MdStore}
                linkText="Admin Settings"
                href="/admin"
              />
            </li>
            <li className="divider"></li>
          </>
        )}
        <li>
          <MenuItem
            icon={FaRegAddressCard}
            linkText="Account Details"
            href="/profile"
          />
        </li>
        <li>
          <MenuItem
            icon={FaFileInvoiceDollar}
            linkText="My Orders"
            href="/profile/orders"
          />
        </li>
        <li>
          <button className="font-bold" onClick={() => signOut()}>
            <MdLogout size={18} className="inline-block mr-2" />
            Sign out
          </button>
        </li>
      </ul>
    </aside>
  )
}
