import connectDB from '@/lib/mongoDB/connectDB'
import Product from '@/lib/mongoDB/models/product'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB()

    const productIds = await request.json()

    return NextResponse.json(await Product.find({ _id: productIds }))
  } catch (error: Error | unknown) {
    return NextResponse.json({ Error: getErrorMessage(error), status: 400 })
  }
}
