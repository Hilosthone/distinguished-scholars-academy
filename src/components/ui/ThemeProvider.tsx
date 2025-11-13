// src/components/ui/ThemeProvider.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Hero from './Hero'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      {children}
    </>
  )
}
