'use client'

import { updateToast } from '@/utils/toastUtils'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { MdUploadFile } from 'react-icons/md'
import { ItemInterface, ReactSortable } from 'react-sortablejs'
import ClipLoader from 'react-spinners/ClipLoader'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { toast } from 'react-toastify'

type props = {
  existingProduct?: IProduct
}

type newProduct = Omit<IProduct, '_id'>

const newProductState: newProduct = {
  name: '',
  description: '',
  price: 0,
  images: [],
  countInStock: 0,
  brand: '',
  properties: {},
  featured: false,
}

export default function ProductForm({ existingProduct }: props) {
  const [product, setProduct] = useState<IProduct | newProduct>(
    existingProduct || newProductState
  )

  const [categoryList, setCategoryList] = useState<
    ICategory[] | undefined | null
  >()

  const [uploadInProgress, setUploadInProgress] = useState<boolean>(false)

  const router: AppRouterInstance = useRouter()

  useEffect(() => {
    fetch('/api/categories')
      .then((response: Response) => response.json())
      .then((data: ICategory[]) => setCategoryList(data))
  }, [])

  function handleOnChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target

    setProduct((prevState: IProduct | newProduct) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function onChangePrice(evt: ChangeEvent<HTMLInputElement>) {
    const newValue: number = parseFloat(evt.target.value)

    setProduct((prevState: IProduct | newProduct) => ({
      ...prevState,
      price: !isNaN(newValue) && newValue > 0 ? newValue : 0,
    }))
  }

  function onChangeFeatured() {
    setProduct((prevState) => ({
      ...prevState,
      featured: !prevState.featured,
    }))
  }

  async function handleUploadImages(evt: ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = evt.target?.files

    if (files && files.length > 0) {
      const data: FormData = new FormData()

      const toastId = toast.loading('Uploading Images...')
      setUploadInProgress(true)

      for (const File of files) {
        data.append('file', File)

        const result: {
          success: boolean
          images: string[]
        } = await fetch('/api/file/upload', {
          method: 'POST',
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              updateToast(toastId, data.error, 'error')
            } else {
              updateToast(toastId, 'Images Uploaded Successfully.', 'success')
            }
            return data
          })

        if (result.success) {
          const newImages = result.images

          setProduct((prevState: IProduct | newProduct) => ({
            ...prevState,
            images: [...prevState.images, ...newImages],
          }))
        }

        setUploadInProgress(false)
      }
    }
  }

  function reOrderImages(images: ItemInterface[]) {
    setProduct((prevState: IProduct | newProduct) => ({
      ...prevState,
      images: images.map((img) => img.trim()),
    }))
  }

  function handleOnSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    if ('_id' in product) {
      const toastId = toast.loading('Updating Product...')

      fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            updateToast(toastId, data.error, 'error')
          } else {
            updateToast(toastId, 'Product Updated Successfully.', 'success')
            router.push('/admin/products')
          }
        })
    } else {
      const toastId = toast.loading('Adding New Product...')

      fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            updateToast(toastId, data.error, 'error')
          } else {
            updateToast(toastId, 'New Product Added Successfully.', 'success')
            router.push('/admin/products')
          }
        })
    }
  }

  const propertiesToFill: ICategoryProperty[] = []

  if (categoryList && categoryList.length > 0 && product.category) {
    let categoryInfo = categoryList.find(({ _id }) => _id === product.category)

    if (categoryInfo) {
      propertiesToFill.push(...categoryInfo.properties)

      while (categoryInfo?.parent?._id) {
        const parentCategory = categoryList.find(
          ({ _id }) => _id === categoryInfo?.parent?._id
        )
        if (parentCategory) propertiesToFill.push(...parentCategory.properties)
        categoryInfo = parentCategory
      }
    }
  }

  function setProductProperty(name: string, value: string) {
    setProduct((prevState) => {
      const data = prevState
      data.properties[name] = value
      return data
    })
  }

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2"
      >
        <div>
          <label className="label cursor-pointer" htmlFor="featured">
            Feature Product:
            <input
              type="checkbox"
              className="toggle toggle-success"
              name="featured"
              checked={product.featured}
              onChange={onChangeFeatured}
            />
          </label>

          <label htmlFor="brand">Product Category:</label>
          {!categoryList ? (
            <PropagateLoader color="hsl(var(--p))" />
          ) : (
            <select
              name="category"
              onChange={handleOnChange}
              value={product.category}
            >
              <option value="">Uncategorized</option>
              {categoryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}

          {propertiesToFill.length > 0 &&
            propertiesToFill.map((property: ICategoryProperty, index) => (
              <div key={index}>
                <label>{property.name}:</label>
                <select
                  value={product.properties?.[property.name]}
                  onChange={(event) =>
                    setProductProperty(property.name, event.target.value)
                  }
                >
                  {property.values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}

          <label htmlFor="brand">Product Brand:</label>
          <input
            name="brand"
            type="text"
            placeholder="Product Brand"
            required
            value={product.brand}
            onChange={handleOnChange}
          />
          <label htmlFor="name">Product Name:</label>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            required
            value={product.name}
            onChange={handleOnChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            placeholder="description"
            value={product.description}
            required
            onChange={handleOnChange}
          />
          <label htmlFor="price">Price (in USD):</label>
          <input
            name="price"
            type="number"
            placeholder="price"
            value={product.price}
            required
            onChange={onChangePrice}
          />

          <label htmlFor="countInStock">Amount in Stock:</label>
          <input
            name="countInStock"
            type="number"
            placeholder="Amount in Stock"
            value={product.countInStock}
            required
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>Images:</label>

          <div className="flex w-full flex-wrap gap-2">
            <ReactSortable
              className="flex w-full flex-wrap gap-2"
              list={product.images as unknown as ItemInterface[]}
              setList={reOrderImages}
            >
              {!!product.images.length &&
                product.images.map((image, index) => (
                  <Image
                    className="rounded-lg h-48 w-auto"
                    key={index}
                    src={image}
                    width={150}
                    height={150}
                    alt="new product image"
                  />
                ))}
            </ReactSortable>
            {uploadInProgress && <ClipLoader color="hsl(var(--p))" />}
          </div>

          <label className="btn btn-outline btn-primary w-full md:btn-wide !inline-flex md:flex-col md:h-24 !justify-evenly text-lg normal-case  m-2">
            <MdUploadFile size={28} />
            <span>Upload Image(s)</span>
            <input
              type="file"
              className="hidden"
              onChange={handleUploadImages}
              accept="image/*"
            />
          </label>
        </div>

        <button type="submit" className="flex mt-4">
          Save
        </button>
      </form>
    </>
  )
}
