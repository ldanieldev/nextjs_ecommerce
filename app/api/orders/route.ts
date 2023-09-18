import connectDB from '@/lib/mongoDB/connectDB'
import Order from '@/lib/mongoDB/models/order'
import { paginateResponse } from '@/utils/apiUtils'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const page = request.nextUrl?.searchParams?.get('page')

    await connectDB()

    let result
    result = await Order.find().sort({ createdAt: 'desc' })

    if (page) {
      result = Array.isArray(result) ? result : [result]
      result = paginateResponse(result, parseInt(page))
    }

    return NextResponse.json(result)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error) })
  }
}
