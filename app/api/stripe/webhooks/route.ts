import connectDB from '@/lib/mongoDB/connectDB'
import Order from '@/lib/mongoDB/models/order'
import Product from '@/lib/mongoDB/models/product'
import stripe from '@/lib/stripe/stripe'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string

if (!webhookSecret) {
  console.error('Missing/Invalid webhooks secret')
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    throw new Error('Invalid signature received.')
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    ) as Stripe.DiscriminatedEvent
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object
      const orderId = data.metadata?.orderId
      const paid = data.payment_status === 'paid'
      if (orderId && paid) {
        await connectDB()
        const order = await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })

        for (const lineItem of order?.lineItems) {
          const product = await Product.findById(
            lineItem.price_data.product_data.metadata.id
          )

          if (product) {
            product.countInStock -= lineItem.quantity
            product.save()
          }
        }
      }
      break
    default:
      console.error(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json('ok')
}
