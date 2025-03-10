import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    
    return new Response(JSON.stringify(prompts), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
