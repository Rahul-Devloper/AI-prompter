import mongoose from 'mongoose'

let isConnected = false //track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true) //to avoid deprecation warning

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    // console.log('MongoDB connecting...', process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompterdb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
