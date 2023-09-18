import ProfileSideNav from '@/components/SideBarNav/ProfileSideNav'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/NextAuth'
import { RiListSettingsLine } from 'react-icons/ri'

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="drawer drawer-mobile h-full">
      <input id="profile-drawer" type="checkbox" className="drawer-toggle" />

      <main className="drawer-content m-4 adminContainer">
        <label
          htmlFor="profile-drawer"
          className="btn btn-circle btn-ghost bg-accent btn-active drawer-button lg:hidden fixed left-2 bottom-2 z-10"
        >
          <RiListSettingsLine size={24} />
        </label>

        {children}
      </main>

      <div className="drawer-side !max-h-full">
        <label htmlFor="profile-drawer" className="drawer-overlay"></label>
        <ProfileSideNav />
      </div>
    </div>
  )
}
