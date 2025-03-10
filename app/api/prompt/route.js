import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({})
      .populate({
        path: 'creator',
        select: 'username email image _id',
      })
      .sort({ createdAt: -1 }) // Optional: sort by newest first
      .lean() // For better performance

    if (!prompts) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
        },
      })
    }

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch prompts',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    )
  }
}
