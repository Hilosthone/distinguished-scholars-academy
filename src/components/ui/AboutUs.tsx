'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import DSAStudent from '../../imges/AboutDSA.jpg'

export default function AboutDSA() {
  return (
    <section id='about' className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-10 md:px-20 grid md:grid-cols-2 gap-12 lg:gap-24 items-center'>
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className='text-[#002EFF] font-bold tracking-widest text-sm uppercase'>
            Who We Are
          </span>
          <h2 className='text-3xl md:text-4xl font-extrabold text-black mt-2 leading-tight'>
            About Distinguished <br />
            <span className='text-[#002EFF]'>Scholars Academy</span>
          </h2>

          <p className='text-gray-600 mt-6 leading-relaxed text-lg'>
            DSA is an educational institution dedicated to raising excellent
            students through effective teaching, consistent practice, and
            result-driven mentorship. We combine structured learning with modern
            technology to help every learner excel.
          </p>

          <div className='mt-8 p-6 border-l-4 border-[#FCB900] bg-[#fffdf5] rounded-r-xl shadow-sm'>
            <h3 className='font-bold text-[#002EFF] text-xl flex items-center gap-2'>
              Our Philosophy
            </h3>
            <p className='text-gray-700 mt-2 italic'>
              "Every student can become brilliant — all they need is the right
              support, guidance, and learning environment."
            </p>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-8'>
            {[
              'Expert Tutors',
              'CBT Practice',
              'Proven Results',
              'Mentorship',
            ].map((item) => (
              <div
                key={item}
                className='flex items-center gap-2 text-gray-700 font-medium'
              >
                <CheckCircle size={18} className='text-[#002EFF]' />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — IMAGE CONTAINER (FIXED FOR FULL VISIBILITY) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='relative flex justify-center'
        >
          {/* Decorative background shape */}
          <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-[#FCB900]/10 rounded-full -z-10' />

          {/* FIX: Changed aspect-square to aspect-[4/3] to make it wider. 
              FIX: Using object-top or object-center if they are getting cut at the bottom.
          */}
          <div className='relative w-full max-w-lg aspect-4/3 bg-[#002EFF] rounded-3xl shadow-2xl p-2 overflow-visible'>
            <div className='relative w-full h-full overflow-hidden rounded-2xl bg-gray-100'>
              <Image
                src={DSAStudent}
                alt='DSA Students'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover object-center' // center ensures left/right are balanced
                priority
              />
            </div>

            {/* Floating Badge */}
            <div className='absolute -bottom-6 -left-6 bg-white p-4 shadow-xl rounded-2xl flex items-center gap-3 border border-gray-100 z-10'>
              <div className='bg-[#FCB900] p-2 rounded-lg text-white font-bold text-xl'>
                10+
              </div>
              <div className='text-[10px] font-bold text-gray-800 uppercase leading-none'>
                Years of <br /> Excellence
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
