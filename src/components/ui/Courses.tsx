'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

import WAEC from '../../imges/waec.jpeg'
import NECO from '../../imges/neco.jpeg'
import JAMB from '../../imges/jamb.jpeg'
import Year1 from '../../imges/Year01.jpg'
import SUMMER from '../../imges/Summer-Coaching.jpg'
import Skills from '../../imges/Skills.png'

const programs = [
  {
    name: 'Full UTME Preparation',
    img: JAMB,
    desc: 'Complete JAMB tutoring with weekly tests, past questions, and full exam simulations.',
  },
  {
    name: 'Full WAEC Preparation',
    img: WAEC,
    desc: 'Master all WAEC subjects with detailed explanations, practice sessions, and revision plans.',
  },
  {
    name: 'Full NECO Preparation',
    img: NECO,
    desc: 'Comprehensive NECO coaching covering theory, objectives, practicals, and exam drills.',
  },
  {
    name: 'Summer Coaching',
    img: SUMMER,
    desc: 'Holiday lessons designed to strengthen weak areas and prepare students ahead.',
  },
  {
    name: 'Year 1 Tutorials',
    img: Year1,
    desc: 'Support classes for 100-level courses to help students adapt and excel academically.',
  },
  {
    name: 'Skills Acquisition',
    img: Skills,
    desc: 'Learn tech & creative skills including coding, graphics, video editing, and more.',
  },
]

export default function Programs() {
  return (
    <section id='programs' className='w-full py-24 bg-[#f2f6ff]'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-[#002EFF] text-center'
        >
          Programs & Courses
        </motion.h2>

        {/* GRID */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14'>
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
            >
              <Image
                src={program.img}
                width={600}
                height={350}
                alt={program.name}
                className='w-full h-48 object-cover'
              />

              <div className='p-6'>
                <h3 className='text-lg font-semibold text-[#002EFF]'>
                  {program.name}
                </h3>

                <p className='text-gray-600 text-sm mt-2 leading-relaxed'>
                  {program.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className='flex justify-center mt-14'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='px-8 py-3 bg-[#002EFF] text-white font-semibold rounded-lg 
            hover:bg-[#FCB900] transition-all duration-300'
          >
            Explore All Programs
          </motion.button>
        </div>
      </div>
    </section>
  )
}
