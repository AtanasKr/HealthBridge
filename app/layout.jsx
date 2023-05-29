import '@styles/globals.css'
import Navbar from '@components/Navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Health Bridge',
  description: 'Web app for patients and doctors',
}



export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
