// src/components/ui/ThemeProvider.tsx
'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import Features1 from "@/components/ui/Features1"
import Courses from "@/components/ui/Courses"
import Tutors from "@/components/ui/Tutors"
import AboutUs from "@/components/ui/AboutUs"
import WatchUs from "@/components/ui/WatchUs"
import Testimonial from "@/components/ui/Testimonial";
import BlogPosts from "@/components/ui/BlogPosts"
import RapidQuiz from "@/components/ui/RapidQuiz"
import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs"
import Footer from "@/components/ui/Footer";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Courses />
      <Features1 />
      <Tutors />
      <AboutUs />
      <WatchUs />
      <Testimonial />
      <BlogPosts />
      <RapidQuiz />
      <CTA />
      <FAQs />
      <Footer />
      {children}
    </>
  )
}
