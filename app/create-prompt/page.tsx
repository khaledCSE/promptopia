'use client'
import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '' })
  const { data: session } = useSession()

  const router = useRouter()

  const createPrompt = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    // Make request
    try {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        body: JSON.stringify({
          ...post,
          userId: (session?.user as any)?.id,
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setPost({ prompt: '', tag: '' })
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
