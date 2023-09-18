'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaRunning } from 'react-icons/fa'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import { TiThMenu } from 'react-icons/ti'
import CartDropdown from './CartDropdown'
import ProfileDropdown from './ProfileDropdown'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const pathname: string = usePathname()

  const pathMatchRoute = (route: string, match = true) =>
    match ? pathname === route : pathname.includes(route)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const navigation = [
    { title: 'Home', href: '/' },
    {
      title: 'Shop',
      href: '/shop',
      children: [
        { title: 'Calisthenics', href: '/shop/calisthenics' },
        { title: 'Cardio', href: '/shop/cardio' },
        { title: 'Weightlifting', href: '/shop/weightlifting' },
      ],
    },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
    <div className="navbar relative z-50 text-slate-900 sm:p-4 dark:text-gray-300 flex-wrap lg:flex-nowrap items-center justify-between bg-base-100 border-b-base-200 dark:border-b-base-300 border-b-2 shadow-sm">
      {/* branding */}
      <div className="order-first lg:min-w-fit">
        <Link href="/" className="font-bold text-2xl flex items-center">
          <FaRunning className="fill-cyan-600 inline-block mr-2" size={28} />
          <span className="hidden md:inline-block">Athletic Outlet</span>
        </Link>
      </div>

      {/* search  */}
      <div className="relative font-bold lg:w-2/3 order-3">
        <SearchBar />
      </div>

      {/* mobile menu close btn */}
      <label className="btn btn-sm btn-square btn-ghost mx-4 order-9 lg:hidden swap swap-rotate">
        <input type="checkbox" onClick={toggleMenu} />
        <TiThMenu className="swap-off fill-current" size={24} />
        <MdClose className="swap-on fill-current" size={24} />
      </label>

      {/* nav links */}
      <nav
        className={`${
          isOpen ? 'inline-block' : 'hidden'
        } lg:inline-block order-10 lg:order-2 w-screen lg:min-w-fit mt-4 lg:mt-0`}
      >
        <ul className="menu menu-normal px-1 font-bold w-full lg:w-auto lg:menu-horizontal">
          {navigation.map((item, index) => (
            <li key={index} className="mr-4">
              <Link
                href={item.href}
                className={pathMatchRoute(item.href) ? 'active' : ''}
              >
                {item.title}
                {item.children && <MdKeyboardArrowDown size={24} />}
              </Link>

              {item.children && (
                <ul className="bg-white dark:bg-slate-900 dark:shadow-slate-800 relative left-auto px-1 font-bold w-full lg:shadow-md lg:w-auto lg:absolute">
                  {item.children.map((child, index) => (
                    <li key={index}>
                      <Link href={child.href}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggle className="btn btn-ghost order-7 hidden lg:flex  ml-4" />

      <div
        className={`${
          isOpen ? 'divider' : 'hidden'
        }  w-full order-11 lg:hidden`}
      ></div>

      <div className="hidden lg:inline-block order-8">
        <CartDropdown />
      </div>

      <div
        className={`${
          isOpen ? 'inline-block' : 'hidden'
        } lg:inline-block w-full lg:w-auto order-last`}
      >
        <ProfileDropdown />
      </div>
    </div>
  )
}
