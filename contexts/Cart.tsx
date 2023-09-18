'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'

export type CartItem = {
  _id: string
  price: number
  quantity: number
}

type ICartContext = {
  cartProducts: CartItem[]
  productCount: number
  subTotal: number
  addToCart: (_id: string, price: number, quantity: number) => void
  reduceItemQty: (_id: string, quantity: number) => void
  removeFromCart: (_id: string) => void
  clearCart: () => void
}

export const CartContext = createContext<ICartContext>({} as ICartContext)

export function CartContextProvider({ children }: { children: ReactNode }) {
  const localStorage: Storage | null =
    typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState<CartItem[]>([])
  const [productCount, setTotalProducts] = useState<number>(0)
  const [subTotal, setSubTotal] = useState<number>(0)

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage?.setItem('cart', JSON.stringify(cartProducts))

      setTotalProducts(
        cartProducts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        )
      )

      setSubTotal(
        parseFloat(
          cartProducts
            .reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.quantity * currentValue.price,
              0
            )
            .toFixed(2)
        )
      )
    }
  }, [cartProducts, localStorage])

  useEffect(() => {
    if (localStorage?.getItem('cart')) {
      const cartItems: CartItem[] = JSON.parse(
        localStorage.getItem('cart') ?? '[]'
      )
      if (cartItems.length > 0) {
        setCartProducts(cartItems)
      }
    }
  }, [localStorage])

  function addToCart(_id: string, price: number, quantity: number) {
    setCartProducts((prevState) => {
      const cart = prevState

      const itemIndex = cart.findIndex((item) => item._id === _id)

      if (itemIndex < 0) {
        cart.push({ _id, price, quantity })
      } else {
        cart[itemIndex].quantity += quantity
      }

      return [...cart]
    })
  }

  function reduceItemQty(_id: string, quantity: number) {
    setCartProducts((prevState) => {
      const cart = prevState
      const itemIndex = cart.findIndex((item) => item._id === _id)
      const item = cart[itemIndex]

      if (item.quantity !== 1) {
        item.quantity -= quantity
      }

      return [...cart]
    })
  }

  function removeFromCart(_id: string) {
    setCartProducts((prevState) => {
      return prevState.filter((product) => product._id !== _id)
    })
  }

  function clearCart() {
    localStorage?.removeItem('cart')
    setCartProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        productCount,
        subTotal,
        addToCart,
        removeFromCart,
        clearCart,
        reduceItemQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
