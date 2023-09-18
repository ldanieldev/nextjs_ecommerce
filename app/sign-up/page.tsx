'use client'
import background from '@/public/img/sign-up.jpg'
import { MdArrowForwardIos } from 'react-icons/md'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaRunning } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Page() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
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

    if (formData.password !== formData.passwordConfirm) {
      toast.warning(
        'The passwords entered in the form do not match. Please try again.'
      )
      return
    }

    const { name, email, password } = formData

    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }).then(async () =>
      signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: `${window.location.origin}/profile`,
      }).catch((error) => toast.error(error))
    )
  }

  return (
    <section>
      <div className="flex justify-center min-h-screen">
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

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <div className="flex justify-center mx-auto mb-6">
              <FaRunning size={64} className="fill-cyan-600" />
            </div>

            <h1 className="text-2xl font-semibold tracking-wider capitalize">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <button
              onClick={() => signIn('google')}
              className="btn btn-primary w-full mt-8"
            >
              <FcGoogle className="inline mr-2" size={24} />
              Sign up with google
            </button>

            <div className="divider my-8">OR</div>

            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  placeholder="John Snow"
                  className="input input-bordered w-full"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </div>

              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="input input-bordered w-full"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  minLength={8}
                  value={formData.password}
                  onChange={onChange}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Confirm password</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  minLength={8}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  value={formData.passwordConfirm}
                  onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full justify-between"
              >
                <span>Sign Up </span>
                <MdArrowForwardIos size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
