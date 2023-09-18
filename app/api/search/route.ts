import connectDB from '@/lib/mongoDB/connectDB'
import Category from '@/lib/mongoDB/models/category'
import Product from '@/lib/mongoDB/models/product'
import { getErrorMessage } from '@/utils/errorUtils'
import { PopulateOptions } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB()

    const categoryPopulateOptions: PopulateOptions = {
      path: 'category',
      model: Category,
      select: 'name',
      populate: {
        path: 'parent',
        model: Category,
        select: 'name',
      },
    }

    const query = request.nextUrl?.searchParams?.get('q')

    if (!query) {
      throw new Error('Invalid query received')
    }

    const result = await Product.find({ $text: { $search: query } }).populate(
      categoryPopulateOptions
    )

    return NextResponse.json(result)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
