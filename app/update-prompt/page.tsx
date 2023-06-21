'use client'
import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '' })
  const { data: session } = useSession()

  const router = useRouter()
  const params = useSearchParams()
  const promptId = params.get('id')

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({ prompt: data.prompt, tag: data.tag })
    }
    getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID Not found')

    // Make request
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...post
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
