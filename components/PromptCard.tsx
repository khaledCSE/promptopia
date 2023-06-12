'use client'

import Image from "next/image"
import { IPrompt } from "../types/prompt.type"
import { FC, useState } from "react"

interface IProps {
  prompt: IPrompt
}

const PromptCard: FC<IProps> = (props) => {
  const { prompt } = props

  const [copied, setCopied] = useState('')

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image} alt={prompt.creator.username}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{prompt.creator.email}</p>
          </div>

          <div className="copy_btn ml-auto" onClick={() => { }}>
            <Image
              alt="copy icon"
              src={copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
              }
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">{prompt.tag}</p>
    </div>
  )
}

export default PromptCard
