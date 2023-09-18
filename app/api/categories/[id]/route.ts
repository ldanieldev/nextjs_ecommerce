import { protectRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import Category from '@/lib/mongoDB/models/category'
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

    const document = await Category.findById(params.id)

    return NextResponse.json(document)
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

    if (!data.parent) delete data.parent

    const updatedDocument = await Category.findOneAndReplace(
      { _id: params.id },
      { ...data },
      { returnDocument: 'after' }
    )

    return NextResponse.json(updatedDocument)
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
    await connectDB()

    const deletedDoc = await Category.deleteOne({ _id: params.id })

    return NextResponse.json(deletedDoc)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
