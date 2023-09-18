import { NextResponse } from 'next/server'
import { protectRoute } from '@/lib/NextAuth'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import mime from 'mime-types'

if (!process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_ACCESS_KEY) {
  throw new Error('Missing/Invalid S3 Keys')
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await protectRoute()
    const formData: FormData = await request.formData()
    const files = formData.getAll('file') as File[]
    const links: string[] = []

    if (!files) {
      throw new Error('Please specify the file(s) to be uploaded')
    }

    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
    })

    for (const file of files) {
      const extension = file.name.split('.').pop()
      const newFilename = uuidv4() + '.' + extension
      const fileBody = Buffer.from(await file.arrayBuffer())

      await client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: newFilename,
          Body: fileBody,
          ACL: 'public-read',
          ContentType: mime.lookup(file.name) as string,
        })
      )

      links.push(
        `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${newFilename}`
      )
    }
    return NextResponse.json({
      success: true,
      images: links,
    })
  } catch (error: Error | unknown) {
    const errMsg =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred. Please try again later.'

    if (process.env.NODE_ENV === 'development')
      console.error('api/upload/file POST:', error)
    return NextResponse.json({ error: errMsg })
  }
}
