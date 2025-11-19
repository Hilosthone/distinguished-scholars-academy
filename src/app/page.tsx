'use client'

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
      <BlogPosts />
      <RapidQuiz />
      <CTA />
      <FAQs />
      <Footer />
    </>
  )
}
