import { FC, ReactNode } from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

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
        <Provider session={undefined}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
