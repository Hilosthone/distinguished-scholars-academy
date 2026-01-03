'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Hero01 from '../../imges/hero-01.jpg'
import Hero02 from '../../imges/hero-02.jpg'
import Hero03 from '../../imges/hero-03.jpg'

// Academic symbols to scatter in the background
const formulas = [
  { text: 'E = mc²', top: '10%', left: '5%', rotate: -15 },
  { text: 'H₂O + CO₂', top: '15%', left: '85%', rotate: 10 },
  { text: 'a² + b² = c²', top: '75%', left: '8%', rotate: 20 },
  { text: 'F = ma', top: '85%', left: '80%', rotate: -10 },
  { text: '∫(x) dx', top: '40%', left: '92%', rotate: 15 },
  { text: 'PV = nRT', top: '50%', left: '4%', rotate: -5 },
  { text: 'Δy/Δx', top: '25%', left: '45%', rotate: 12 },
  { text: 'λ = h/p', top: '70%', left: '40%', rotate: -8 },
]

export default function Hero() {
  return (
    <section
      id='home'
      className='relative w-full pt-32 pb-16 md:pt-40 md:pb-24 bg-[#f8f9ff] overflow-hidden'
    >
      {/* --- ACADEMIC FORMULA BACKGROUND --- */}
      <div className='absolute inset-0 pointer-events-none select-none overflow-hidden'>
        {formulas.map((formula, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }} // Very subtle so it doesn't distract
            transition={{ delay: 0.2 * index, duration: 1 }}
            className='absolute font-serif italic text-blue-900 text-lg md:text-2xl whitespace-nowrap'
            style={{
              top: formula.top,
              left: formula.left,
              transform: `rotate(${formula.rotate}deg)`,
            }}
          >
            {formula.text}
          </motion.div>
        ))}
      </div>

      <div className='relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6'>
        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center md:text-left'
        >
          <h1 className='text-3xl md:text-4xl font-extrabold text-black leading-tight'>
            Empowering Students to <br />
            <span className='text-[#002EFF]'>Excel in UTME & WAEC</span>
          </h1>

          <p className='text-base md:text-lg text-gray-600 mt-4 max-w-md mx-auto md:mx-0 leading-relaxed'>
            Join thousands of students learning faster, scoring higher, and
            building academic confidence with the DSA learning system.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8'>
            <Link
              href='https://wa.link/7wim2w'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#002EFF] text-white rounded-lg font-bold transition-all hover:bg-blue-700 active:scale-95 text-sm md:text-base shadow-lg shadow-blue-200'
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>

            <Link
              href='https://wa.link/xtiui2'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#002EFF] text-[#002EFF] rounded-lg font-bold transition-all hover:bg-[#FCB900] hover:text-black hover:border-[#FCB900] active:scale-95 text-sm md:text-base'
            >
              <Play size={18} fill='currentColor' />
              Join Free Classes
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='relative flex justify-center items-center mt-12 md:mt-0'
        >
          {/* Decorative Circles */}
          <div className='absolute w-[120%] h-[120%] border border-blue-100 rounded-full -z-10 animate-[spin_20s_linear_infinite]' />

          <div className='relative w-60 h-60 md:w-80 md:h-80 bg-[#FCB900] rounded-full flex items-center justify-center shadow-xl'>
            <Image
              src={Hero01}
              width={350}
              height={350}
              className='rounded-full object-cover w-[94%] h-[94%] border-2 border-white'
              alt='Main Students'
              priority
            />

            <div className='absolute -top-2 -left-2 w-6 h-6 bg-[#002EFF] rounded-full animate-bounce opacity-80'></div>
            <div className='absolute bottom-4 -right-2 w-8 h-8 bg-[#002EFF] rounded-full animate-pulse opacity-60'></div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className='absolute -left-2 top-0 md:-left-6 md:top-4'
          >
            <Image
              src={Hero02}
              width={80}
              height={80}
              className='w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover'
              alt='Student 1'
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className='absolute -right-2 bottom-0 md:right-0 md:bottom-4'
          >
            <Image
              src={Hero03}
              width={100}
              height={100}
              className='w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover'
              alt='Student 2'
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}