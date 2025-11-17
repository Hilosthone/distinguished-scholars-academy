'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import DSALogo from '../../imges/DSA.jpg'

export default function AboutDSA() {
  return (
    <section className='w-full py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center'>
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className='text-3xl md:text-4xl font-bold text-[#002EFF] leading-snug'>
            About Distinguished Scholars Academy
          </h2>

          <p className='text-gray-700 mt-4 leading-relaxed'>
            DSA is an educational institution dedicated to raising excellent
            students through effective teaching, consistent practice, and
            result-driven mentorship. We combine structured learning with modern
            technology to help every learner excel academically and personally.
          </p>

          <div className='mt-6 p-5 border-l-4 border-[#FCB900] bg-[#fef9e6] rounded-md'>
            <h3 className='font-semibold text-[#002EFF] text-xl'>
              Our Philosophy
            </h3>
            <p className='text-gray-700 mt-2'>
              Every student can become brilliant — all they need is the right
              support, guidance, and learning environment.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — LOGO IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className='w-full flex justify-center'
        >
          <div className='w-64 md:w-80 h-64 md:h-80 bg-[#002EFF] rounded-xl shadow-xl flex items-center justify-center p-6'>
            <Image
              src={DSALogo}
              alt='DSA Logo'
              className='w-full h-full object-contain rounded-xl'
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
