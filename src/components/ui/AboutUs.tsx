'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Award, BookOpen, Users, Lightbulb } from 'lucide-react'
import DSAStudent from '../../imges/AboutDSA.jpg'

export default function AboutDSA() {
  return (
    <section
      id='about'
      className='relative w-full py-24 bg-white overflow-hidden'
    >
      {/* --- BACKGROUND ACADEMIC ELEMENTS --- */}
      <div className='absolute inset-0 pointer-events-none opacity-5 select-none hidden md:block'>
        <div className='absolute top-20 left-10 text-4xl font-serif italic text-[#002EFF]'>
          sin(θ) = o/h
        </div>
        <div className='absolute bottom-20 right-10 text-4xl font-serif italic text-[#002EFF]'>
          NaCl + H₂O
        </div>
        <div className='absolute top-1/2 left-[48%] text-6xl font-serif italic text-[#002EFF]'>
          π
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-16 lg:gap-24 items-center'>
        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className='flex items-center gap-2 mb-4'>
            <div className='h-0.5 w-8 bg-[#FCB900]' />
            <span className='text-[#002EFF] font-black tracking-[0.3em] text-xs uppercase'>
              Who We Are
            </span>
          </div>

          <h2 className='text-4xl md:text-5xl font-black text-black mt-2 leading-[1.1] tracking-tight'>
            About Distinguished <br />
            <span className='text-[#002EFF]'>Scholars Academy</span>
          </h2>

          <p className='text-gray-500 mt-6 leading-relaxed text-lg font-medium'>
            DSA is an educational institution dedicated to raising excellent
            students through effective teaching, consistent practice, and
            result-driven mentorship. We combine structured learning with modern
            technology to help every learner excel.
          </p>

          {/* Philosophy Box with glassmorphism feel */}
          <div className='mt-10 p-8 border-l-8 border-[#FCB900] bg-gray-50/50 rounded-r-4xl relative overflow-hidden'>
            <Lightbulb className='absolute -right-4 -top-4 text-gray-100 size-24 rotate-12' />
            <h3 className='font-black text-[#002EFF] text-xl uppercase tracking-widest mb-2 relative z-10'>
              Our Philosophy
            </h3>
            <p className='text-gray-700 text-lg italic leading-snug relative z-10'>
              "Every student can become brilliant — all they need is the right
              support, guidance, and learning environment."
            </p>
          </div>

          {/* Feature Grid */}
          <div className='grid grid-cols-2 gap-y-6 gap-x-4 mt-12'>
            {[
              { label: 'Expert Tutors', icon: <Users size={20} /> },
              { label: 'CBT Practice', icon: <BookOpen size={20} /> },
              { label: 'Proven Results', icon: <Award size={20} /> },
              { label: 'Mentorship', icon: <CheckCircle size={20} /> },
            ].map((item) => (
              <div
                key={item.label}
                className='flex items-center gap-3 text-black font-bold group'
              >
                <div className='bg-blue-50 p-2 rounded-lg text-[#002EFF] group-hover:bg-[#002EFF] group-hover:text-white transition-colors'>
                  {item.icon}
                </div>
                <span className='text-sm uppercase tracking-wider'>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='relative'
        >
          {/* Scientific Orbital Rings around the image */}
          <div className='absolute -inset-10 border border-blue-100 rounded-full animate-[spin_15s_linear_infinite] opacity-50' />
          <div className='absolute -inset-4 border border-blue-50 rounded-full animate-[spin_10s_linear_infinite_reverse] opacity-50' />

          {/* Floating Academic Icons */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className='absolute -top-10 right-10 z-20 bg-white shadow-xl p-3 rounded-2xl border border-gray-100 text-blue-600 font-serif font-bold italic'
          >
            F = ma
          </motion.div>

          <div className='relative w-full aspect-4/5 md:aspect-4/3 bg-[#002EFF] rounded-[40px] shadow-[0_20px_50px_rgba(0,46,255,0.2)] p-2'>
            <div className='relative w-full h-full overflow-hidden rounded-4XL bg-gray-100'>
              <Image
                src={DSAStudent}
                alt='DSA Students'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover object-top hover:scale-105 transition-transform duration-700'
                priority
              />
            </div>

            {/* Modern Floating Badge */}
            <div className='absolute -bottom-8 -left-8 bg-white p-6 shadow-2xl rounded-[30px] flex items-center gap-4 border border-gray-50 z-10 group hover:-translate-y-2 transition-transform'>
              <div className='bg-[#FCB900] w-14 h-14 rounded-2xl text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-yellow-200'>
                10+
              </div>
              <div className='flex flex-col'>
                <span className='text-[12px] font-black text-black uppercase tracking-widest leading-none'>
                  Years of
                </span>
                <span className='text-[12px] font-black text-[#002EFF] uppercase tracking-widest'>
                  Excellence
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}