'use client'

import { FC } from "react"
import PromptCard from "./PromptCard"
import { IPrompt } from "../types/prompt.type"

interface IProps {
  name: string
  desc: string
  prompts: IPrompt[]
  handleDelete: (id: string) => Promise<void>
}

const Profile: FC<IProps> = (props) => {
  const { name, desc, prompts, handleDelete } = props

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {prompts.map((prompt) => (<PromptCard key={prompt._id} prompt={prompt} handleDelete={handleDelete} />))}
      </div>
    </section>
  )
}

export default Profile
