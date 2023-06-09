'use client'
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"

interface IProps {
  session: Session | null | undefined
  children: ReactNode
}

const Provider: FC<IProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
