'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className='relative flex items-center justify-center min-h-screen bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 text-white px-6'>
      {/* Overlay for dark transparent effect */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* Hero Content */}
      <motion.div
        className='relative z-10 text-center max-w-3xl mx-auto'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className='text-4xl md:text-6xl font-extrabold leading-tight mb-6'>
          Empowering the Next Generation of{' '}
          <span className='text-blue-400'>Scholars</span>
        </h1>

        <p className='text-lg md:text-xl text-gray-200 mb-8'>
          At Distinguished Scholars Academy, we cultivate brilliance through
          mentorship, academic excellence, and innovation.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link href='#programs'>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg'>
              Explore Programs
            </Button>
          </Link>
          <Link href='#about'>
            <Button
              variant='outline'
              className='border-white text-gray-500 hover:bg-white hover:text-gray-900 px-8 py-6 text-lg'
            >
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
