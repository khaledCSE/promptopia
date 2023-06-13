import Prompt from "@models/Prompt";
import { connectDB } from "@utils/db.util";

export const GET = async (req: Request, options: any) => {
  const { params } = options

  try {
    await connectDB()
    const prompt = await Prompt.findById(String(params.id))

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response(JSON.stringify(prompt))
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

export const PATCH = async (req: Request, { params }: any) => {
  const { prompt, tag } = await req.json()

  try {
    await connectDB()

    const promptFound = await Prompt.findById(params.id)

    if (!promptFound) {
      return new Response('Prompt not found', { status: 404 })
    }

    promptFound.prompt = prompt
    promptFound.tag = tag

    await promptFound.save()

    return new Response(JSON.stringify(promptFound), { status: 200 })
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to update prompt', { status: 500 })
  }
}

export const DELETE = async (req: Request, { params }: any) => {
  try {
    await connectDB()
    await Prompt.findByIdAndDelete(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to delete prompt', { status: 500 })
  }
}