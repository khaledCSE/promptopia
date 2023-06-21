'use client'

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { IPrompt } from "../../types/prompt.type"
import { useSession } from "next-auth/react"

const ProfilePage = () => {
  const [prompts, setPrompts] = useState<IPrompt[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch(`/api/prompt/user/${(session?.user as any)?.id}`)
      const data = await res.json()
      setPrompts(data)
    }

    getPrompts()
  }, [session?.user])

  const handleDelete = async (id: string) => {
    const isConfirmed = confirm('Are you sure?')

    if (isConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${id}`, { method: 'DELETE' })

        if (res.ok) {
          const filtered = prompts.filter((prompt) => prompt._id !== id)
          setPrompts(filtered)
        }
      } catch (err: any) {
        console.error(err);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      prompts={prompts}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage
