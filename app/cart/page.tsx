'use client'
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CartContext } from '@/contexts/Cart'
import { MdAdd, MdRemove, MdRemoveShoppingCart } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { ProductPlaceHolderImg } from '@/constants'
import { TiShoppingCart } from 'react-icons/ti'
import { DotLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/utils/errorUtils'
import { toDisplayPrice } from '@/utils/stringUtils'
import { useSession } from 'next-auth/react'
import { FaInfoCircle } from 'react-icons/fa'

export default function Page() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const {
    cartProducts,
    addToCart,
    removeFromCart,
    reduceItemQty,
    clearCart,
    productCount,
    subTotal,
  } = useContext(CartContext)

  useEffect(() => {
    if (window.location.href.includes('success')) {
      clearCart()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name ?? '',
        address: session.user.address ?? '',
        city: session.user.city ?? '',
        state: session.user.state ?? '',
        zipCode: session.user.zipCode ?? '',
        email: session.user.email ?? '',
      })
    }
  }, [session])

  useEffect(() => {
    if (cartProducts.length > 0) {
      fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify(cartProducts.map((product) => product._id)),
      })
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .finally(() => setIsLoading(false))
    } else setIsLoading(false)
  }, [cartProducts])

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

    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        body: JSON.stringify({ cart: cartProducts, orderInfo: formData }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: Error | unknown) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  if (window.location.href.includes('success')) {
    return (
      <>
        <div className="container mx-auto">
          <div className="card grow bg-accent mt-10">
            <div className="card-body">
              <h2 className="card-title text-2xl">Thank You For Your Order!</h2>
              <p>
                We&apos;re excited to let you know that your purchase has been
                successfully processed and is on its way to you.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="p-8 mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <div className=" lg:grow">
          <h2 className="text-2xl font-medium flex items-center mb-2">
            <TiShoppingCart size={28} /> Shopping Cart
          </h2>
          {isLoading ? (
            <DotLoader className="m-auto" color="hsl(var(--pc)" />
          ) : !isLoading && products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full dark:table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th align="center">Product</th>
                    <th align="center">Price</th>
                    <th align="center">Qty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: IProduct) => (
                    <tr key={product._id}>
                      <td>
                        <Link href={`/product/${product._id}`}>
                          <Image
                            className="max-w-[150px] max-h-[150px] rounded-lg"
                            src={product.images[0] ?? ProductPlaceHolderImg.src}
                            alt={product.name}
                            width={150}
                            height={150}
                          />
                        </Link>
                      </td>
                      <td className="whitespace-pre-line">
                        <Link
                          className="link-hover"
                          href={`/product/${product._id}`}
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="whitespace-normal">
                        {toDisplayPrice(product.price)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            data-operation="add"
                            className="btn btn-xs btn-ghost"
                            onClick={() =>
                              addToCart(product._id, product.price, 1)
                            }
                          >
                            <MdAdd size={20} />
                          </button>
                          <span>
                            {
                              cartProducts.filter(
                                (cartProduct) => cartProduct._id === product._id
                              )[0]?.quantity
                            }
                          </span>
                          <button
                            type="button"
                            className="btn btn-xs btn-ghost"
                            onClick={() => reduceItemQty(product._id, 1)}
                          >
                            <MdRemove size={20} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <label
                          className="btn btn-error btn-sm m-1"
                          onClick={() => removeFromCart(product._id)}
                          title="remove this item from the cart"
                        >
                          <MdRemoveShoppingCart className="inline" size={20} />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} align="right">
                      Subtotal ({productCount} item
                      {productCount !== 1 && 's'}):
                      <b>
                        &nbsp;
                        {toDisplayPrice(subTotal)}
                      </b>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p>Your Cart Is Empty</p>
          )}
        </div>

        {!isLoading && (
          <div className="card w-full lg:w-1/4 bg-accent">
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Order Information
                <label
                  htmlFor="modalCC"
                  className="hover:cursor-pointer focus:cursor-pointer animate-bounce"
                >
                  <FaInfoCircle size={24} />
                </label>
              </h2>
              <form onSubmit={onSubmit} className="form-control gap-2">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Snow"
                  value={formData.name}
                  onChange={onChange}
                  className="input input-bordered w-full"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={onChange}
                  className="input input-bordered w-full"
                />
                <input
                  required
                  name="address"
                  placeholder="123 Sample Road, Apt 22"
                  type="text"
                  value={formData.address}
                  onChange={onChange}
                  className="input input-bordered w-full"
                />
                <input
                  required
                  name="city"
                  placeholder="St. Louis"
                  type="text"
                  className="input input-bordered w-full"
                  value={formData.city}
                  onChange={onChange}
                />
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
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={productCount === 0}
                >
                  Proceed To Checkout
                </button>
              </form>
            </div>
          </div>
        )}

        <input type="checkbox" id="modalCC" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="modalCC"
              className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <h3 className="font-bold text-lg">
              <FaInfoCircle className="inline mr-2" />
              Test Credit Card
            </h3>
            <p className="py-4">
              <strong>Card #:&nbsp;</strong> 4242 4242 4242 4242
              <br />
              All other information can be random
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
