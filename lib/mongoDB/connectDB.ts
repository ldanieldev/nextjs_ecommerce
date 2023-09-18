import mongoose from 'mongoose'

async function connectDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.asPromise()
    } else {
      const MONGO_URI: string | undefined = process.env.MONGO_URI

      if (!MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable.')
      }
      await mongoose.connect(MONGO_URI)
    }

    //console.log('MongoDb connection established.');
  } catch (error: Error | unknown) {
    console.error(
      'Database Connection: ',
      error instanceof Error ? error.message : 'Unknown error occurred.'
    )
  }
}

export default connectDB
