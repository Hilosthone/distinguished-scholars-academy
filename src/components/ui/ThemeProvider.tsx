// src/components/ui/ThemeProvider.tsx
'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import Courses from "@/components/ui/Courses"
import Testimonial from "@/components/ui/Testimonial";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/ui/Footer";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Courses />
      <Testimonial />
      <CTA />
      <Footer />
      {children}
    </>
  )
}
