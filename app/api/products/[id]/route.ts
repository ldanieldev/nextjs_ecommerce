import { protectRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import Product from '@/lib/mongoDB/models/product'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
): Promise<NextResponse> {
  try {
    await connectDB()

    const product = await Product.findById(params.id)

    return NextResponse.json(product)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
): Promise<Response> {
  try {
    await protectRoute()

    await connectDB()

    const data = await request.json()

    if (!data.category) delete data.category

    const updatedProductDoc = await Product.findOneAndReplace(
      { _id: params.id },
      { ...data },
      { returnDocument: 'after' }
    )

    return NextResponse.json(updatedProductDoc)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string }
  }
): Promise<Response> {
  try {
    await protectRoute()

    await connectDB()

    const deletedProductDoc = await Product.deleteOne({ _id: params.id })

    return NextResponse.json(deletedProductDoc)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
