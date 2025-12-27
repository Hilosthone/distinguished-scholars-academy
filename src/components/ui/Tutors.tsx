'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Emmanuel from '../../imges/Mr. Emmanuel.jpg'
import Hakeem from '../../imges/Mr. Hakeem.jpg'
import MissBetty from '../../imges/Miss.jpg'
import DrPhils from '../../imges/Dr. Phils.jpg'
import DhocthorJay from '../../imges/Dhocthor Jay.jpg'
import Timilehin from '../../imges/Mr. Timilehin.jpg'

const tutors = [
  { name: 'Mr. Timilehin', subject: 'Physics', img: Timilehin },
  { name: 'Miss Betty', subject: 'English', img: MissBetty },
  { name: 'Mr. Hakeem', subject: 'Mathematics', img: Hakeem },
  { name: 'Dr. Jay', subject: 'Chemistry', img: DhocthorJay },
  { name: 'Dr. Phils', subject: 'Biology', img: DrPhils },
  { name: 'Mr. Emmanuel', subject: 'Chemistry', img: Emmanuel },
]

export default function Tutors() {
  return (
    <section id='tutors' className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        {/* TITLE SECTION */}
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-3xl md:text-4xl font-extrabold text-black uppercase'
          >
            Meet Our <span className='text-[#002EFF]'>Expert Tutors</span>
          </motion.h2>

          <div className='w-16 h-1 bg-[#FCB900] mx-auto mt-4 rounded-full'></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-gray-600 mt-6 max-w-lg mx-auto text-lg'
          >
            Our educators are industry experts dedicated to simplifying complex
            topics and ensuring student success.
          </motion.p>
        </div>

        {/* GRID */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {tutors.map((tutor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group p-8 bg-[#f8f9ff] border border-transparent rounded-2xl text-center 
              hover:bg-white hover:shadow-2xl hover:border-[#002EFF]/20 
              transition-all duration-300'
            >
              {/* Tutor Image Container */}
              <div className='relative w-36 h-36 mx-auto rounded-full p-1.5 border-2 border-dashed border-[#002EFF]/30 group-hover:border-solid group-hover:border-[#002EFF] transition-all duration-500'>
                <div className='w-full h-full rounded-full overflow-hidden'>
                  <Image
                    src={tutor.img}
                    alt={tutor.name}
                    width={150}
                    height={150}
                    className='object-cover object-top w-full h-full grayscale-30 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110'
                  />
                </div>
              </div>

              <h3 className='text-xl font-bold text-black mt-6 group-hover:text-[#002EFF] transition-colors'>
                {tutor.name}
              </h3>

              {/* Subject Badge */}
              <div className='inline-block mt-3 px-4 py-1 rounded-full bg-blue-50 text-[#002EFF] text-xs font-bold uppercase tracking-wider group-hover:bg-[#002EFF] group-hover:text-white transition-all duration-300'>
                {tutor.subject}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
