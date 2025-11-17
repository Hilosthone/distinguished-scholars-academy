'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Clip1 from '../../imges/clip1.jpeg'
import Clip2 from '../../imges/clip2.jpeg'
import Clip3 from '../../imges/clip3.jpeg'

const clips = [
  { title: 'Physics Class Example', img: Clip1 },
  { title: 'Mathematics Tutorial', img: Clip2 },
  { title: 'Success Story Highlight', img: Clip3 },
]

export default function WatchUs() {
  return (
    <section className='w-full py-24 bg-[#f2f6ff]'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-[#002EFF]'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Watch Us
        </motion.h2>

        <motion.p
          className='mt-4 text-gray-700 max-w-2xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Watch clips of real classes, tutorials, and success stories. 
          Our lessons feature clear explanations, exam-based examples, and engaging delivery.
        </motion.p>

        {/* Video Clips Grid */}
        <div className='grid md:grid-cols-3 gap-6 mt-10'>
          {clips.map((clip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className='relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform'
            >
              <Image
                src={clip.img}
                alt={clip.title}
                width={400}
                height={250}
                className='w-full h-56 object-cover'
              />
              <div className='absolute bottom-0 left-0 w-full bg-black/50 text-white p-3 text-sm font-semibold'>
                {clip.title}
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
            href='https://www.youtube.com/c/YourChannel' // replace with DSA channel
            target='_blank'
            rel='noopener noreferrer'
            className='px-6 py-3 bg-[#FCB900] text-black font-semibold rounded-lg hover:bg-[#e6ac00] transition'
          >
            Watch More on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  )
}
