import '@/app/globals.scss'
import Footer from '@/components/Footer'
import GlobalToastContainer from '@/components/GlobalToastContainer'
import Navbar from '@/components/NavBar/Navbar'
import { CartContextProvider } from '@/contexts/Cart'
import { ThemeProvider } from '@/contexts/Theme'
import { AuthSessionProvider } from '@/providers/authSession'
import { Metadata } from 'next'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Poppins } from 'next/font/google'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

export const dynamic = 'force-dynamic'

const poppins: NextFontWithVariable = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'NextJS E-Commerce Store',
  description: 'An E-Commerce application built with NextJS and MongoDB',
  authors: [{ name: 'Le-Andris Daniel', url: 'https://ldanieldev.com' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthSessionProvider>
      <html lang="en" className={`${poppins.variable} scroll-smooth`}>
        <body className="flex flex-col h-screen justify-between">
          <ThemeProvider>
            <CartContextProvider>
              <header>
                <Navbar />
              </header>
              <main className="grow">{children}</main>
              <Footer />
              <GlobalToastContainer />
            </CartContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthSessionProvider>
  )
}
