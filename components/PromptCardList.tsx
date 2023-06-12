'use client'

import { FC, useEffect, useState } from "react"
import { IPrompt } from "../types/prompt.type"
import PromptCard from "@/components/PromptCard"

interface IProps {
  handleTagClick: () => void
}

const PromptCardList: FC<IProps> = (props) => {
  const { handleTagClick } = props
  const [prompts, setPrompts] = useState<IPrompt[]>([])

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPrompts(data)
    }

    getPrompts()
  }, [])

  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompt) => (<PromptCard key={prompt._id} prompt={prompt} />))}
    </div>
  )
}

export default PromptCardList
