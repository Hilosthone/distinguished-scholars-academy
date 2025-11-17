import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ui/ThemeProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Distinguished Scholars Academy',
  description:
    'Official website of Distinguished Scholars Academy — nurturing excellence and leadership.',
  icons: {
    icon: '/imges/DSA.jpg', // <-- use path from public folder
    shortcut: '/imges/DSA.jpg', // optional
    apple: '/imges/DSA.jpg', // optional
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased 
          bg-neutralWhite dark:bg-neutralBlack 
          text-neutralBlack dark:text-neutralWhite
        `}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
