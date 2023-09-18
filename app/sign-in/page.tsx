'use client'
import { FcGoogle } from 'react-icons/fc'
import { signIn, useSession } from 'next-auth/react'
import background from '@/public/img/sign-in.jpg'
import { FaInfoCircle, FaRunning } from 'react-icons/fa'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Page(): JSX.Element {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  if (session) {
    redirect('/profile')
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: `${window.location.origin}/profile`,
    }).then((response) => {
      if (response?.error) {
        console.log(response)
        toast.error(response.error)
      }
    })
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${background.src})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Athletic Outlet</h2>

              <p className="max-w-xl mt-3 text-white font-medium">
                Gear up and join the winning team! Sign up now to elevate your
                game with our exclusive sign-up benefits! Join the active
                community of champions and start your fitness journey with us
                today!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <FaRunning size={64} className="fill-cyan-600" />
              </div>
              <p className="mt-3 font-medium">Sign in to access your account</p>
            </div>

            <button
              onClick={() => signIn('google')}
              className="btn btn-primary w-full mt-8"
            >
              <FcGoogle className="inline mr-2" size={24} />
              Sign in with google
            </button>

            <div className="divider my-8">OR</div>

            <form className="form-control gap-4" onSubmit={onSubmit}>
              <div className="form-group">
                <div className="flex justify-between items-center">
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <label
                    htmlFor="modalTestUsers"
                    className="hover:cursor-pointer focus:cursor-pointer animate-bounce"
                  >
                    <FaInfoCircle size={24} />
                  </label>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  value={formData.email}
                  placeholder="example@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChange}
                  value={formData.password}
                  placeholder="Your Password"
                  className="input input-bordered w-full"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>
            </form>

            <p className="mt-6 text-md text-center">
              Don&#x27;t have an account yet?&nbsp;
              <Link
                href="/sign-up"
                className="text-secondary font-medium link-hover"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <input type="checkbox" id="modalTestUsers" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="modalTestUsers"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">
            <FaInfoCircle className="inline mr-2" />
            Test Users List
          </h3>
          <p className="py-4">
            Admin
            <br />
            <strong>User:&nbsp;</strong> admin@demo.com <br />
            <strong>Password:&nbsp;</strong>adminadmin <br />
            <br />
            User
            <br />
            <strong>User:&nbsp;</strong> user@demo.com <br />
            <strong>Password:&nbsp;</strong>useruser <br />
          </p>
        </div>
      </div>
    </div>
  )
}
