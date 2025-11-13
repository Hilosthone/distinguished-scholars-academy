// 'use client' // ← Add this

// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import './globals.css'
// import Header from '@/components/ui/Header'
// import Hero from '@/components/ui/Hero'
// import { useState, useEffect } from 'react'

// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

// export const metadata: Metadata = {
//   title: 'Distinguished Scholars Academy',
//   description:
//     'Official website of Distinguished Scholars Academy — nurturing excellence and leadership.',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light')

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [theme])

//   return (
//     <html lang='en'>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark`}
//       >
//         <Header theme={theme} setTheme={setTheme} />
//         <Hero />
//         <main className='pt-24'>{children}</main>
//       </body>
//     </html>
//   )
// }

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
