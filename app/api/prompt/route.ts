import { connectDB } from "@utils/db.util";
import Prompt from "@models/Prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json()

  try {
    await connectDB()
    const newPrompt = new Prompt({ creator: userId, prompt, tag })

    const saved = await newPrompt.save()

    return new Response(JSON.stringify(saved), { status: 201 })
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to Create a New Prompt', { status: 500 })
  }
}

export const GET = async (req: Request) => {
  try {
    await connectDB()
    const prompts = await Prompt.find().populate('creator')

    return new Response(JSON.stringify(prompts), { status: 201 })
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to Fetch a New Prompt', { status: 500 })
  }
}