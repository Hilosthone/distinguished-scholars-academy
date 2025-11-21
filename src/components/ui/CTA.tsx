'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section id='contact' className='w-full py-24 bg-[#002EFF]'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <motion.h2
          className='text-3xl md:text-5xl font-bold text-white'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Achieve Academic Excellence?
        </motion.h2>

        <motion.p
          className='text-white/90 mt-4 text-lg md:text-xl max-w-2xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Join thousands of students improving their scores, building
          confidence, and excelling in exams with DSA’s proven learning system.
        </motion.p>

        <motion.div
          className='mt-8 flex flex-col sm:flex-row justify-center items-center gap-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Primary CTA */}
          <a
            className='px-8 py-4 bg-[#FCB900] text-black font-semibold rounded-lg flex items-center gap-2 hover:bg-[#e6ac00] hover:underline transition'
            href='https://wa.link/7wim2w'
            target='_blank'
            rel='noopener noreferrer'
          >
            Enrol Now
            <ArrowRight size={20} />
          </a>

          {/* Secondary CTA */}
          <a
            className='px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#002EFF] hover:underline transition'
            href='https://wa.link/xtiui2'
            target='_blank'
            rel='noopener noreferrer'
          >
            Join Free Classes
          </a>
        </motion.div>
      </div>
    </section>
  )
}
