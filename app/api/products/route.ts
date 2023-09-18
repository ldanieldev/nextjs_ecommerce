import { protectRoute } from '@/lib/NextAuth'
import connectDB from '@/lib/mongoDB/connectDB'
import Category from '@/lib/mongoDB/models/category'
import Product from '@/lib/mongoDB/models/product'
import { paginateResponse } from '@/utils/apiUtils'
import { getErrorMessage } from '@/utils/errorUtils'
import { HydratedDocument, PipelineStage, PopulateOptions } from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await connectDB()

    let result
    const { searchParams }: URL = new URL(request.url)
    const crossSell: string | null = searchParams.get('cs')
    const featured = !!searchParams.get('featured')
    const category: string | null = searchParams.get('category')
    const recentProducts = !!searchParams.get('recent')
    const page = searchParams.get('page')
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

    if (crossSell) {
      const stages: PipelineStage[] = []
      const sampleSize = parseInt(crossSell)
      if (category) stages.push({ $match: { category: category } })
      stages.push({ $sample: { size: sampleSize } })
      result = await Product.aggregate(stages)

      if (result.length < sampleSize) {
        const additionalProducts = await Product.find().limit(
          sampleSize - result.length
        )
        result = [...result, ...additionalProducts]
      }
    } else if (featured) {
      result = await Product.find({
        featured: true,
      })
    } else if (recentProducts) {
      result = await Product.find()
        .populate(categoryPopulateOptions)
        .sort({ createdAt: 'desc' })
    } else {
      result = await Product.find().populate(categoryPopulateOptions)
    }

    if (page) {
      result = Array.isArray(result) ? result : [result]
      result = paginateResponse(result, parseInt(page))
    }

    return NextResponse.json(result)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await protectRoute()

    await connectDB()

    const data = await request.json()

    const newProductDoc: HydratedDocument<Product> = await Product.create(data)

    return NextResponse.json(newProductDoc)
  } catch (error: Error | unknown) {
    return NextResponse.json({ error: getErrorMessage(error), status: 400 })
  }
}
