import { FC, ReactNode } from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'

interface IProps {
  children: ReactNode
}

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts'
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
