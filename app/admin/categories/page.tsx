'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateToast } from '@/utils/toastUtils'
import RiseLoader from 'react-spinners/RiseLoader'
import { MdDelete, MdEdit, MdRemoveCircle } from 'react-icons/md'
import ConfirmationModal from '@/components/ConfirmationModal'

type property = {
  name: string
  values: string
}

export default function Page() {
  const [categoryList, setCategoryList] = useState<
    ICategory[] | undefined | null
  >()

  const [name, setName] = useState<string>('')

  const [properties, setProperties] = useState<property[]>([])

  const [parentCategory, setParentCategory] = useState<string>('')

  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState<
    ICategory | undefined | null
  >()

  const [categoryToBeUpdated, setCategoryToBeUpdated] = useState<
    ICategory | undefined | null
  >()

  function getCategoryList() {
    setCategoryList(null)

    fetch('/api/categories')
      .then((response: Response) => response.json())
      .then((data: ICategory[] | []) => setCategoryList(data))
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  function resetForm() {
    setName('')
    setParentCategory('')
    setProperties([])
    setCategoryToBeUpdated(null)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data: string = JSON.stringify({
      name,
      parent: parentCategory,
      properties: properties.map(({ name, values }) => ({
        name,
        values: values.split(','),
      })),
    })

    if (categoryToBeUpdated) {
      const toastId = toast.loading('Updating Category...')

      fetch(`/api/categories/${categoryToBeUpdated._id}`, {
        method: 'PUT',
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            updateToast(toastId, data.error, 'error')
          } else {
            resetForm()
            updateToast(toastId, 'Category Updated Successfully.', 'success')
            getCategoryList()
          }
        })
    } else {
      const toastId = toast.loading('Adding New Category...')
      fetch('/api/categories', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            updateToast(toastId, data.error, 'error')
          } else {
            resetForm()
            updateToast(toastId, 'New Category Added Successfully.', 'success')
            getCategoryList()
          }
        })
    }
  }

  const onEditCategory = (category: ICategory) => {
    setCategoryToBeUpdated(category)
    setName(category.name)
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    )
    setParentCategory(category.parent?._id || '')
  }

  function onDeleteCategory() {
    if (!categoryToBeDeleted?._id) {
      toast.error('Invalid category specified for deletion.')
      return
    }

    const toastId = toast.loading('Deleting Category...')

    fetch(`/api/categories/${categoryToBeDeleted._id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          updateToast(toastId, data.error, 'error')
        } else {
          getCategoryList()
          setCategoryToBeDeleted(null)
          updateToast(toastId, 'Category Deleted Successfully.', 'success')
        }
      })
  }

  function onAddPropertyClick() {
    setProperties((prevState) => {
      return [
        ...prevState,
        {
          name: '',
          values: '',
        },
      ]
    })
  }

  function onPropertyNameChange(
    property: property,
    newName: string,
    index: number
  ) {
    setProperties((prevState) => {
      const properties = [...prevState]
      properties[index].name = newName

      return properties
    })
  }

  function onPropertyValuesChange(
    property: property,
    newValues: string,
    index: number
  ) {
    setProperties((prevState) => {
      const properties = [...prevState]
      properties[index].values = newValues

      return properties
    })
  }

  function removePropertyClick(removalIndex: number) {
    setProperties((prevState) =>
      [...prevState].filter((property, index) => index !== removalIndex)
    )
  }

  return (
    <>
      <h1>Categories</h1>

      <form
        onSubmit={onSubmit}
        onReset={resetForm}
        className="form-control mt-2"
      >
        <fieldset className="border rounded-md flex flex-col p-4">
          <legend className="bg-primary py-1 px-2 text-primary-content rounded-md font-bold">
            {categoryToBeUpdated
              ? `Edit Category: ${categoryToBeUpdated.name}`
              : 'Create New Category'}
          </legend>
          <div className="flex flex-col md:flex-row mb-2 gap-4">
            <input
              required
              type="text"
              name="category"
              placeholder="New Category Name"
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />

            <select
              className="md:max-w-xs"
              value={parentCategory}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setParentCategory(event.target.value)
              }
            >
              <option value="">No Parent Category</option>
              {categoryList?.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="border rounded-md flex flex-col p-4 mt-2">
            <legend className="bg-secondary py-1 px-2 text-secondary-content rounded-md font-bold">
              Properties
            </legend>

            <button
              type="button"
              className="!btn-secondary !btn-sm"
              onClick={onAddPropertyClick}
            >
              Add New Property
            </button>

            {properties.length > 0 &&
              properties.map((property: property, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <input
                    required
                    className="md:w-1/2"
                    type="text"
                    value={property.name}
                    placeholder="property name (example: color)"
                    onChange={(event) =>
                      onPropertyNameChange(property, event.target.value, index)
                    }
                  />
                  <input
                    required
                    className="md:w-1/2"
                    type="text"
                    value={property.values}
                    onChange={(event) =>
                      onPropertyValuesChange(
                        property,
                        event.target.value,
                        index
                      )
                    }
                    placeholder="values, comma separated"
                  />

                  <div
                    className="tooltip tooltip-left tooltip-error mt-2 "
                    data-tip="Remove Property"
                  >
                    <MdRemoveCircle
                      className="hover:cursor-pointer"
                      size={28}
                      color="red"
                      onClick={() => removePropertyClick(index)}
                    />
                  </div>
                </div>
              ))}
          </fieldset>

          <div className="mt-6 md:flex gap-2">
            <button type="submit">Save</button>

            {categoryToBeUpdated && (
              <button type="reset" className="mt-6 md:mt-0 !btn-outline">
                Cancel
              </button>
            )}
          </div>
        </fieldset>
      </form>

      {!categoryList ? (
        <RiseLoader className="mt-24" color="hsl(var(--p))" />
      ) : (
        !categoryToBeUpdated && (
          <div className="overflow-x-auto">
            <table className="mt-6">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Parent Category</th>
                  <th className="w-40"></th>
                </tr>
              </thead>
              <tbody>
                {categoryList?.map((category: ICategory) => (
                  <tr key={category._id}>
                    <td className="whitespace-nowrap">{category.name}</td>
                    <td className="whitespace-nowrap">
                      {category.parent?.name}
                    </td>
                    <td className="text-center align-middle">
                      <label
                        className="btn btn-outline btn-sm m-1"
                        onClick={() => onEditCategory(category)}
                      >
                        <MdEdit className="inline" size={24} />
                      </label>
                      <label
                        className="btn btn-outline btn-sm m-1"
                        htmlFor="deleteConfirmationModal"
                        onClick={() => setCategoryToBeDeleted(category)}
                      >
                        <MdDelete className="inline" size={24} />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {categoryToBeDeleted && (
        <ConfirmationModal
          action="delete"
          item={categoryToBeDeleted.name}
          confirmHandler={onDeleteCategory}
          modalId="deleteConfirmationModal"
        />
      )}
    </>
  )
}
