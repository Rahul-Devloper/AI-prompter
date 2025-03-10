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

    const opts = {
      dbName: 'prompterdb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 10000, // 10 seconds
    }

    await mongoose.connect(process.env.MONGODB_URI, opts)
    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    isConnected = false
    throw error // Re-throw the error to handle it in the API routes
  }
}
