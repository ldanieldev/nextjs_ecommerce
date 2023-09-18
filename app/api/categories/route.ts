import { protectRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import Category from '@/lib/mongoDB/models/category'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB()
    const documents = await Category.find()
      .populate({
        path: 'parent',
      })
      .sort({ parent: 'asc', name: 'asc' })

    return NextResponse.json(documents)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await protectRoute()

    await connectDB()

    const { name, parent, properties }: ICategory = await request.json()

    const createdDocument = await Category.create({
      name,
      parent: parent || undefined,
      properties,
    })

    return NextResponse.json(createdDocument)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
