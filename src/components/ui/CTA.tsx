'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className='w-full py-20 bg-dsaBlue'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className='max-w-4xl mx-auto text-center px-6'
      >
        <h2 className='text-2xl font-bold'>
          Get ready to learn and grow your skill
        </h2>
        <p className='mt-3 text-lg text-black'>
          Unlock your potential with our premium curated courses.
        </p>

        <button className='mt-6 px-6 py-3 bg-[#FCB900] text-black font-bold rounded-lg shadow-lg hover:text-white hover:bg-[#002EFF] transition'>
          Start Learning
        </button>
      </motion.div>
    </section>
  )
}
