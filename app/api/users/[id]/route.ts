import { protectRoute, protectUserRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import User from '@/lib/mongoDB/models/user'
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

    const document = await User.find({ email: params.id })

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
    await connectDB()

    const { isAdmin, name, address, city, state, zipCode } =
      await request.json()

    if (isAdmin !== undefined) {
      await protectRoute()
    } else {
      await protectUserRoute(params.id)
    }

    const updatedDocument = await User.findOneAndUpdate(
      { email: params.id },
      {
        isAdmin,
        name,
        address,
        city,
        state,
        zipCode,
      },
      { returnDocument: 'after' }
    )

    return NextResponse.json(updatedDocument)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
