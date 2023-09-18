'use client'
import { FC, useContext } from 'react'
import { TiShoppingCart } from 'react-icons/ti'
import { CartContext } from '@/contexts/Cart'
import Link from 'next/link'
import { toDisplayPrice } from '@/utils/stringUtils'

const CartDropdown: FC = () => {
  const { productCount, subTotal } = useContext(CartContext)

  return (
    <div className="lg:dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost">
        <div className="indicator">
          <TiShoppingCart
            className="fill-slate-900 dark:fill-gray-300"
            size={24}
          />
          <span className="badge text-white badge-sm indicator-item bg-secondary border-none">
            {productCount}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-52 bg-gray-50 dark:bg-slate-800 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{productCount} Items</span>
          <span className="text-info font-medium">
            Subtotal: {toDisplayPrice(subTotal)}
          </span>
          <div className="card-actions">
            <Link href="/cart" className="btn btn-primary btn-block">
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDropdown
