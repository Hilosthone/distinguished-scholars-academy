'use client'
import { motion } from 'framer-motion'

const tutors = [
  { name: 'Mr. Timilehin', subject: 'Physics' },
  { name: 'Mrs. Betty', subject: 'English' },
  { name: 'Dr. Pius', subject: 'Mathematics' },
  { name: 'Dr. Jay', subject: 'Chemistry' },
  { name: 'Dr. Phils', subject: 'Biology' },
  { name: 'Mr. Emmanuel', subject: 'Chemistry' },
]

export default function Tutors() {
  return (
    <section className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-[#002EFF] text-center'
        >
          Meet Our Tutors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='text-center text-gray-600 mt-3'
        >
          Our tutors are experts who simplify learning.
        </motion.p>

        {/* GRID */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14'>
          {tutors.map((tutor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='p-6 bg-white border shadow-md rounded-xl text-center hover:shadow-xl 
              hover:-translate-y-2 transition-all duration-300'
            >
              {/* Circle Placeholder */}
              <div className='w-20 h-20 mx-auto rounded-full bg-[#002EFF] text-white 
              flex items-center justify-center text-3xl font-bold'>
                {tutor.name.charAt(0)}
              </div>

              <h3 className='text-xl font-semibold text-[#002EFF] mt-4'>
                {tutor.name}
              </h3>

              <p className='text-gray-700 mt-1'>{tutor.subject}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
