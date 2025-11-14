'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import scholar from '../../imges/hero-3.jpg'

export default function Testimonial() {
  return (
    <>
      {/* ====================== TESTIMONIAL SECTION ====================== */}
      <section className='w-full py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center'>
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='relative flex justify-center'
          >
            <div className='relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]'>
              <Image
                src={scholar}
                width={350}
                height={350}
                alt='student'
                className='rounded-2xl shadow-lg relative z-10'
              />

              {/* FLOATING CIRCLES */}
              <div className='absolute -top-6 -left-6 w-8 h-8 bg-[#002EFF] rounded-full opacity-80 animate-bounce'></div>
              <div className='absolute -top-4 right-8 w-6 h-6 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
              <div className='absolute bottom-10 -right-6 w-10 h-10 bg-[#002EFF] rounded-full opacity-70 animate-bounce'></div>
              <div className='absolute bottom-0 left-10 w-6 h-6 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='text-2xl font-bold text-[#002EFF]'>
              What our scholars say about us
            </h3>

            <p className='text-black mt-4'>
              Distinguished Scholars Academy helped me master new skills
              quickly. The lessons are clear, interesting, and flexible.
            </p>

            <p className='mt-4 font-semibold text-[#002EFF]'>
              ⭐⭐⭐⭐⭐ 4.9/5 Rating from 3,000+ students
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====================== CTA SECTION ====================== */}
      <section className='w-full bg-white py-6'>
        <div className='max-w-4xl mx-auto relative px-6'>
          {/* CTA BOX */}
          <div className='bg-[#002df7] text-white rounded-2xl shadow-xl px-12 py-16 relative z-10'>
            <h2 className='text-3xl font-bold'>
              Get ready to learn and <br /> grow your skills
            </h2>

            <p className='mt-3 text-lg opacity-90'>
              Join thousands of learners building amazing futures.
            </p>

            <div className='flex items-center space-x-4 mt-8'>
              <button className='bg-[#FCB900] text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition'>
                Get Started Now
              </button>
              <button className='border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#002EFF] transition'>
                Play Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
