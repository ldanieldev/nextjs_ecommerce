'use client'
import { FC, useState } from 'react'
import Link from 'next/link'
import { MdDelete, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { updateToast } from '@/utils/toastUtils'
import ConfirmationModal from '@/components/ConfirmationModal'
import { toDisplayPrice } from '@/utils/stringUtils'

type props = {
  productList: IProduct[]
  refreshList: () => void
}
const ProductTable: FC<props> = ({ productList, refreshList }: props) => {
  const [productToBeDeleted, setProductToBeDeleted] = useState<
    IProduct | undefined | null
  >()

  const onDeleteProduct = () => {
    if (!productToBeDeleted) {
      toast.error('Invalid product specified for deletion.')
      return
    }

    const toastId = toast.loading('Deleting Product...')

    fetch(`/api/products/${productToBeDeleted._id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          updateToast(toastId, data.error, 'error')
        } else {
          setProductToBeDeleted(null)
          updateToast(toastId, 'Product Deleted Successfully.', 'success')
          refreshList()
        }
      })
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product: IProduct) => (
              <tr key={product._id}>
                <td className="!whitespace-pre-line">{product.name}</td>
                <td>{product.brand}</td>
                <td className="!whitespace-pre-line">{product.description}</td>
                <td>{toDisplayPrice(product.price)}</td>
                <td>{product.countInStock}</td>
                <td className="text-center align-middle">
                  <Link
                    className="btn btn-outline btn-sm m-1"
                    href={`/admin/products/edit/${product._id}`}
                  >
                    <MdEdit className="inline" size={24} />
                  </Link>
                  <label
                    className="btn btn-outline btn-sm m-1"
                    htmlFor="deleteConfirmationModal"
                    onClick={() => setProductToBeDeleted(product)}
                  >
                    <MdDelete className="inline" size={24} />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productToBeDeleted && (
        <ConfirmationModal
          action="delete"
          item={productToBeDeleted.name}
          confirmHandler={onDeleteProduct}
          modalId="deleteConfirmationModal"
        />
      )}
    </>
  )
}

export default ProductTable
