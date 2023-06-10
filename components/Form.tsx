import Link from "next/link"
import { Dispatch, FC, SetStateAction } from "react"

export interface IPost {
  prompt: string
  tag: string
}
interface IProps {
  type: 'Create' | 'Edit'
  submitting: boolean
  post: IPost
  setPost: Dispatch<SetStateAction<IPost>>
  handleSubmit: (e: any) => Promise<void>
}

const Form: FC<IProps> = (props) => {
  const { type, handleSubmit, post, setPost, submitting } = props
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination wild with any AI-Powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
        </label>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost((prev) => ({ ...prev, prompt: e.target.value }))}
          placeholder="Write your prompt here ..."
          required
          className="form_textarea"
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
          </span>
        </label>

        <input
          value={post.tag}
          onChange={(e) => setPost((prev) => ({ ...prev, tag: e.target.value }))}
          placeholder="#tag"
          required
          className="form_input"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">Cancel</Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
