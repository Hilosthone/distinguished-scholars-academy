'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/ui/Header'
import Hero from '@/components/ui/Hero'
import Features from '@/components/ui/Features'
import Features1 from '@/components/ui/Features1'
import Courses from '@/components/ui/Courses'
import Tutors from '@/components/ui/Tutors'
import AboutUs from '@/components/ui/AboutUs'
import WatchUs from '@/components/ui/WatchUs'
import Testimonial from '@/components/ui/Testimonial'
import BlogPosts from '@/components/ui/BlogPosts'
import RapidQuiz from '@/components/ui/RapidQuiz'
import CTA from '@/components/ui/CTA'
import FAQs from '@/components/ui/FAQs'
import Footer from '@/components/ui/Footer'

export default function HomePage() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // If the app hasn't mounted on the client yet, we can return a
  // simple background color or null to prevent the console error.
  if (!hasMounted) {
    return <div className='bg-white min-h-screen' />
  }

  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <Features />
      <Courses />
      <Features1 />
      <Tutors />
      <WatchUs />
      <Testimonial />
      <RapidQuiz />
      <BlogPosts />
      <CTA />
      <FAQs />
      <Footer />
    </>
  )
}