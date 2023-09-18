import AdminSideNav from '@/components/SideBarNav/AdminSideNav'
import { authOptions } from '@/lib/NextAuth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { RiListSettingsLine } from 'react-icons/ri'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in?callbackUrl=/admin')
  } else if (!session.user.isAdmin) {
    redirect('/profile?unauthorized=true')
  }

  return (
    <div className="drawer drawer-mobile h-full">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      <main className="drawer-content m-4 adminContainer">
        <label
          htmlFor="admin-drawer"
          className="btn btn-circle btn-ghost bg-accent btn-active drawer-button lg:hidden fixed left-2 bottom-2 z-10"
        >
          <RiListSettingsLine size={24} />
        </label>

        {children}
      </main>

      <div className="drawer-side !max-h-full">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <AdminSideNav />
      </div>
    </div>
  )
}
