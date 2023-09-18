import { protectRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import User from '@/lib/mongoDB/models/user'
import { getErrorMessage } from '@/utils/errorUtils'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    await protectRoute()
    await connectDB()
    const documents = await User.find({ isAdmin: true })

    return NextResponse.json(documents)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB()

    const { name, email, password } = await request.json()

    const createdDocument = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    })

    return NextResponse.json(createdDocument)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
