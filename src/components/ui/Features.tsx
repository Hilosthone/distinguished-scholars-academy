'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Easy-To-Use Interface',
    desc: 'Our platform is smooth and easy, perfect for all learners.',
  },
  {
    title: 'Cloud-Hosted Platform',
    desc: 'Access your learning materials anywhere, anytime.',
  },
  {
    title: 'Interactive Elements',
    desc: 'Engaging quizzes, videos, and collaborative tools.',
  },
]

export default function Features() {
  return (
    <section className='w-full py-20 bg-white'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='p-6 rounded-xl shadow-md bg-white border border-gray-100'
          >
            <h3 className='text-xl font-semibold text-[#002EFF]'>{feature.title}</h3>
            <p className='text-black mt-2'>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
