'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Blog1 from '../../imges/jamb.jpeg'
import Blog2 from '../../imges/waec.jpeg'
import Blog3 from '../../imges/Habits.png'

const blogs = [
  {
    title: 'JAMB 2026: New Updates You Must Know',
    img: Blog1,
    link: '/blog/jamb-2026-updates',
  },
  {
    title: '10 Study Habits of High‑Scoring Students',
    img: Blog2,
    link: '/blog/study-habits',
  },
  {
    title: 'WAEC Biology: Diagrams You Must Master',
    img: Blog3,
    link: '/blog/waec-biology-diagrams',
  },
]

export default function BlogPosts() {
  return (
    <section className='w-full py-24 bg-[#f2f6ff]'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-[#002EFF]'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Latest Blog Posts
        </motion.h2>

        <div className='grid md:grid-cols-3 gap-8 mt-10'>
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className='bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer'
            >
              <Image
                src={blog.img}
                alt={blog.title}
                width={500}
                height={300}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-[#002EFF] mb-2'>
                  {blog.title}
                </h3>
                <a
                  href={blog.link}
                  className='text-[#FCB900] font-medium hover:underline flex items-center gap-1'
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='mt-10'
        >
          <a
            href='/blog'
            className='px-6 py-3 bg-[#002EFF] text-white font-semibold rounded-lg hover:bg-blue-800 transition'
          >
            View All Blog Posts
          </a>
        </motion.div>
      </div>
    </section>
  )
}
