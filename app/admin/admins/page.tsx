'use client'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateToast } from '@/utils/toastUtils'
import RiseLoader from 'react-spinners/RiseLoader'
import { FaUsersSlash } from 'react-icons/fa'
import ConfirmationModal from '@/components/ConfirmationModal'
import Image from 'next/image'
import { getInitials } from '@/utils/stringUtils'

type user = {
  _id: string
  name: string
  email: string
  image: string
  isAdmin: boolean
}

export default function Page() {
  const [adminList, setAdminList] = useState<user[] | null>()
  const [adminToBeDeleted, setAdminToBeDeleted] = useState<user | null>()
  const [email, setEmail] = useState<string>('')
  const exclusionList = ['admin@demo.com']

  function getAdminList() {
    setAdminList(null)

    fetch('/api/users')
      .then((response: Response) => response.json())
      .then((data: user[] | []) => setAdminList(data))
  }

  useEffect(() => {
    getAdminList()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const toastId = toast.loading('Adding New Admin...')
    fetch(`/api/users/${email}`, {
      method: 'PUT',
      body: JSON.stringify({
        isAdmin: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          updateToast(toastId, 'This user does not exist.', 'error')
        } else if (data.error) {
          updateToast(toastId, data.error, 'error')
        } else {
          setEmail('')
          updateToast(toastId, 'New Admin Added Successfully.', 'success')
          getAdminList()
        }
      })
  }

  function onDeleteAdmin() {
    if (!adminToBeDeleted) {
      toast.error('Invalid admin specified for deletion.')
      return
    }

    const toastId = toast.loading('Deleting Admin...')

    fetch(`/api/users/${adminToBeDeleted.email}`, {
      method: 'PUT',
      body: JSON.stringify({
        isAdmin: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          updateToast(toastId, data.error, 'error')
        } else {
          getAdminList()
          updateToast(
            toastId,
            `Admin Privileges Successfully removed from ${adminToBeDeleted.name}.`,
            'success'
          )
          setAdminToBeDeleted(null)
        }
      })
  }

  return (
    <>
      <h1>Admins</h1>

      <form onSubmit={onSubmit} className="form-control mt-2">
        <fieldset className="border rounded-md flex flex-col p-4">
          <legend className="bg-primary py-1 px-2 text-primary-content rounded-md font-bold">
            Add New Admin
          </legend>
          <div className="flex flex-col md:flex-row mb-2 gap-4">
            <input
              className="input input-bordered w-full"
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">Add Admin</button>
          </div>
        </fieldset>
      </form>

      {!adminList ? (
        <RiseLoader className="mt-24" color="hsl(var(--p))" />
      ) : (
        <div className="overflow-x-auto">
          <table className="mt-6">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th className="w-40"></th>
              </tr>
            </thead>
            <tbody>
              {adminList?.map((admin: user) => (
                <tr key={admin._id}>
                  <td>
                    {admin.image ? (
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                          <Image
                            src={admin.image}
                            alt={admin.name}
                            height={64}
                            width={64}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                          <span className="text-3xl">
                            {getInitials(admin.name)}
                          </span>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>{admin.name}</td>
                  <td className="!whitespace-pre-line">{admin.email}</td>
                  <td className="text-center align-middle">
                    {!exclusionList.includes(admin.email) && (
                      <label
                        className="btn btn-sm m-1 btn-error"
                        htmlFor="deleteConfirmationModal"
                        onClick={() => setAdminToBeDeleted(admin)}
                      >
                        <FaUsersSlash className="inline" size={24} />
                      </label>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adminToBeDeleted && (
        <ConfirmationModal
          action="delete"
          item={adminToBeDeleted.name}
          confirmHandler={onDeleteAdmin}
          modalId="deleteConfirmationModal"
        />
      )}
    </>
  )
}
