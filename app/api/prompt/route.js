import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
  try {
    // First try to connect to DB
    console.log('Attempting to connect to DB...')
    await connectToDB()
    console.log('DB connection successful')

    // Then fetch prompts
    console.log('Fetching prompts...')
    const prompts = await Prompt.find({}).populate('creator').lean()
    console.log(`Found ${prompts.length} prompts`)

    return new Response(JSON.stringify(prompts), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('Detailed error:', error)
    
    return new Response(JSON.stringify({
      message: 'Failed to fetch prompts',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
