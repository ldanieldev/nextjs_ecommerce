'use client'
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { getErrorMessage } from '@/utils/errorUtils'
import { updateToast } from '@/utils/toastUtils'
import RiseLoader from 'react-spinners/RiseLoader'

export default function Page() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  if (!session) {
    redirect('/sign-in')
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name ?? '',
        address: session.user.address ?? '',
        city: session.user.city ?? '',
        state: session.user.state ?? '',
        zipCode: session.user.zipCode ?? '',
      })
    }
  }, [session])

  useEffect(() => {
    if (searchParams.get('unauthorized')?.toLowerCase() === 'true') {
      toast.error('You are not authorized to access administration settings.')
      window.history.pushState({}, document.title, '/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const toastId = toast.loading('Updating User Information...')

    try {
      const response = await fetch(`/api/users/${session?.user.email}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.error) {
        updateToast(toastId, data.error, 'error')
      } else {
        updateToast(
          toastId,
          'User Information Updated Successfully.',
          'success'
        )

        setFormData(data)
      }
    } catch (error: Error | unknown) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Account Details</h1>
      {isLoading ? (
        <RiseLoader className="mx-auto mt-10" color="hsl(var(--pc))" />
      ) : (
        <form
          onSubmit={onSubmit}
          className="form-control gap-2 w-full xl:w-1/2"
        >
          <div>
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="John Snow"
              value={formData.name}
              onChange={onChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="address" className="label">
              Address:
            </label>
            <input
              required
              name="address"
              placeholder="123 Sample Road, Apt 22"
              type="text"
              value={formData.address}
              onChange={onChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="label">
                City:
              </label>
              <input
                required
                name="city"
                placeholder="St. Louis"
                type="text"
                className="input input-bordered w-full"
                value={formData.city}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="state" className="label">
                State:
              </label>
              <input
                required
                name="state"
                placeholder="MO"
                type="text"
                maxLength={2}
                minLength={2}
                className="input input-bordered w-full"
                value={formData.state}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="label">
                Zip Code:
              </label>
              <input
                required
                name="zipCode"
                placeholder="00000"
                minLength={5}
                type="text"
                className="input input-bordered w-full"
                value={formData.zipCode}
                onChange={onChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            Save
          </button>
        </form>
      )}
    </div>
  )
}
