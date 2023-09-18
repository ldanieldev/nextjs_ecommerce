'use client'
import { MdAssessment, MdLibraryBooks, MdLogout, MdStore } from 'react-icons/md'
import { BsBoxSeamFill, BsListNested } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { signOut } from 'next-auth/react'
import MenuItem from '@/components/SideBarNav/MenuItem'

export default function AdminSideNav() {
  return (
    <aside className="menu w-fit bg-neutral h-full">
      <ul>
        <li>
          <MenuItem icon={MdAssessment} linkText="Dashboard" href="/admin" />
        </li>
        <li>
          <MenuItem
            icon={MdLibraryBooks}
            linkText="Invoices"
            href="/admin/invoices"
          />
        </li>
        <li>
          <MenuItem
            icon={BsBoxSeamFill}
            linkText="Products"
            href="/admin/products"
          />
        </li>
        <li>
          <MenuItem
            icon={BsListNested}
            linkText="Categories"
            href="/admin/categories"
          />
        </li>
        <li>
          <MenuItem icon={FaUsers} linkText="Admins" href="/admin/admins" />
        </li>

        <li className="divider"></li>

        <li>
          <MenuItem icon={MdStore} linkText="My Profile" href="/profile" />
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
