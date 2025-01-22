import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json()
  console.log('prompt=>', prompt)

  try {
    await connectToDB()

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: `#${tag}`,
    })
    console.log('newPrompt=>', newPrompt)
    const savePrompt = await newPrompt.save()

    console.log('savePrompt=>', savePrompt)

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.log('error', error)
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
