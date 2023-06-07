'use client'
import '@styles/globals.css'
import Navbar from '@components/Navbar'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Health Bridge',
  description: 'Web app for patients and doctors',
}



export default function RootLayout({ children, session }) {
  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
