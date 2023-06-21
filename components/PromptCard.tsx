'use client'

import Image from "next/image"
import { IPrompt } from "../types/prompt.type"
import { FC, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface IProps {
  prompt: IPrompt
  handleDelete?: (id: string) => Promise<void>
}

const PromptCard: FC<IProps> = (props) => {
  const { prompt, handleDelete } = props

  const [copied, setCopied] = useState('')
  const { data: session }: any = useSession()
  const pathname = usePathname()

  const handleCopy = () => {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)

    setTimeout(() => {
      setCopied('')
    }, 3000);
  }

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

          <div className="copy_btn ml-auto" onClick={handleCopy}>
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
      <p className="font-inter text-sm blue_gradient cursor-pointer">#{prompt.tag}</p>

      {session?.user?.id === prompt.creator._id && pathname === '/profile' && (
        <div className="mt-5 flex-end gap-4 border-t border-gray-100 pt-3">
          <Link href={`/update-prompt?id=${prompt._id}`} className="font-inter text-sm green_gradient cursor-pointer">Edit</Link>
          <p className="font-inter text-sm red_gradient cursor-pointer" onClick={() => handleDelete?.(prompt._id.toString())}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
