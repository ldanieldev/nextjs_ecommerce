'use client'
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-secondary rounded-full bg-neutral">
            <FaInfoCircle />
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4">
            The page you are looking for doesn&apos;t exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              className="btn btn-outline gap-x-3"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft />
              <span>Go back</span>
            </button>

            <Link href="/" className="btn btn-secondary">
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
