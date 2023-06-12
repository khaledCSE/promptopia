import Prompt from "@models/Prompt";

export const GET = async (req: Request, options: any) => {
  try {
    const prompts = await Prompt.find({ creator: options.params.id }).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err: any) {
    console.error(err);
    return new Response('Failed to Fetch Prompts', { status: 500 })
  }
}