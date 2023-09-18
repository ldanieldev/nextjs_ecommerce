import { CartItem } from '@/contexts/Cart'
import connectDB from '@/lib/mongoDB/connectDB'
import Order from '@/lib/mongoDB/models/order'
import Product from '@/lib/mongoDB/models/product'
import stripe from '@/lib/stripe/stripe'
import { getErrorMessage } from '@/utils/errorUtils'
import { HydratedDocument } from 'mongoose'
import { NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB()

    const { cart, orderInfo } = await request.json()

    const products: IProduct[] = await Product.find({
      _id: cart.map((product: CartItem) => product._id),
    })

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for (const item of cart) {
      const productDetail = products.find(
        (product) => product._id.toString() === item._id
      )

      if (item.quantity > 0 && productDetail) {
        lineItems.push({
          quantity: item.quantity,
          price_data: {
            currency: 'USD',
            product_data: {
              name: productDetail.name,
              metadata: { id: productDetail._id },
            },
            unit_amount: productDetail.price * 100,
          },
        })
      }
    }

    orderInfo.lineItems = lineItems

    const orderDoc: HydratedDocument<Order> = await Order.create(orderInfo)

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      customer_email: orderInfo.email,
      success_url: request.headers.get('origin') + '/cart?success=true',
      cancel_url: request.headers.get('origin') + '/cart?cancel=true',
      metadata: { orderId: orderDoc._id.toString() },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: Error | unknown) {
    return NextResponse.json({ Error: getErrorMessage(error), status: 400 })
  }
}
