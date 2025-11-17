'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  'DSA helped me score 267 in UTME!',
  'The weekly tests improved my speed.',
  'Their biology and chemistry classes are unmatched!',
  'I gained confidence and excelled in my WAEC exams!',
  'The tutors simplify complex topics brilliantly!',
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className='w-full py-24 bg-white'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#002EFF]'>
          What Our Students Say
        </h2>

        <div className='relative mt-10'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='text-gray-700 text-lg md:text-xl italic font-medium'
            >
              "{testimonials[index]}"
            </motion.p>
          </AnimatePresence>

          {/* Navigation Icons */}
          <div className='flex justify-center items-center gap-6 mt-6'>
            <button
              onClick={prevTestimonial}
              className='p-3 bg-[#002EFF] text-white rounded-full hover:bg-blue-800 transition'
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className='p-3 bg-[#002EFF] text-white rounded-full hover:bg-blue-800 transition'
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
