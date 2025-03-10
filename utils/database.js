import mongoose from 'mongoose'

let isConnected = false //track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true) //to avoid deprecation warning

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    console.log('Attempting to connect to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompterdb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 10000, // 10 seconds
    })

    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error // Re-throw the error to handle it in the API routes
  }
}
