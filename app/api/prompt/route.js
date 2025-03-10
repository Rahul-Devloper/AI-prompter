import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req) => {
  try {
    await Promise.race([
      connectToDB(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 8000)
      )
    ])

    const prompts = await Promise.race([
      Prompt.find({}).populate('creator'),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 8000)
      )
    ])
    
    return new Response(JSON.stringify(prompts), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('Error in GET /api/prompt:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch prompts',
      details: error.message 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
