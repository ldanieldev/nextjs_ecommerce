'use client'
import { FormEvent, useContext, useState } from 'react'
import { MdAdd, MdRemove, MdRemoveShoppingCart } from 'react-icons/md'
import { CartContext } from '@/contexts/Cart'

type props = {
  product: {
    price: number
    _id: string
    countInStock: number
  }
}
export default function AddToCartButton({
  product: { price, _id, countInStock },
}: props) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)

  const onChange = (evt: FormEvent) => {
    const target = evt.currentTarget as HTMLInputElement

    updateQuantity(parseInt(target.value))
  }

  const updateQuantity = (newQuantity: number) =>
    setQuantity(
      newQuantity < 1 || isNaN(newQuantity)
        ? 1
        : newQuantity > countInStock
        ? countInStock
        : newQuantity
    )
  return (
    <>
      {countInStock === 0 ? (
        <div className="alert alert-error justify-center font-bold text-gray-200">
          <div>
            <MdRemoveShoppingCart size={20} />
            <span>Sold Out</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="flex items-center">
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              data-operation="add"
              className="btn btn-xs btn-ghost"
            >
              <MdAdd size={20} />
            </button>

            <input
              className="hideInputArrows w-12 text-center bg-gray-100 dark:bg-gray-800  font-bold mx-2"
              type="number"
              name="qty"
              id="qtyInput"
              value={quantity}
              onChange={onChange}
            />

            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              className="btn btn-xs btn-ghost"
            >
              <MdRemove size={20} />
            </button>
          </p>

          <button
            className="btn btn-primary"
            onClick={() => addToCart(_id, price, quantity)}
          >
            Add to Cart
          </button>
        </div>
      )}
    </>
  )
}
