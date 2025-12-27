'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'

import GloryAdeyemi from '../../imges/Glory Adeyemi.jpg'
import OpeyemiElizabeth from '../../imges/Opeyemi Elizabeth.jpg'
import BankolePerfect from '../../imges/Bankole Perfect.jpg'
import EwataUyoyo from '../../imges/Ewata Uyoyo.jpg'

const testimonials = [
  {
    name: 'Opeyemi Elizabeth',
    rating: '★★★★★',
    text: `DSA (Distinguished Scholars Academy) has really helped me a lot. It built my reading skill and strengthened my understanding of every subject. Whenever I didn't understand a topic, I could freely chat with the teachers and they were always ready to explain in a clear way.`,
    image: OpeyemiElizabeth,
  },
  {
    name: 'Ewata Uyoyo',
    rating: '★★★★★',
    text: `Distinguished Scholars Academy is excellent and dedicated to the success of all their students. They provide support throughout the entire learning journey—from JAMB lessons to post-UTME preparation.`,
    image: EwataUyoyo,
  },
  {
    name: 'Perfect Bankole',
    rating: '★★★★★',
    text: `I joined DSA for the 2025 UTME. I scored 306 in UTME and 75.5 in the UI Post-UTME, eventually gaining admission to study Mechanical Engineering at UI. DSA is the right vehicle for your success!`,
    image: BankolePerfect,
  },
  {
    name: 'Glory Adeyemi',
    rating: '★★★★★',
    text: `Distinguished Scholars Academy is the best place for anyone preparing for JAMB. They are blessed with the most dedicated tutors. With DSA, you don’t just learn; you build confidence.`,
    image: GloryAdeyemi,
  },
  {
    name: 'Eninla Oluwole',
    rating: '★★★★★',
    text: `The best online app I've ever joined! Their weekly assessments and rapid quizzes bring you closer to understanding how to tackle real exam questions effectively.`,
    image: null,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      id='testimonials'
      className='w-full py-24 bg-white relative overflow-hidden'
    >
      {/* Background Quote Decoration */}
      <div className='absolute top-0 right-0 w-full h-full opacity-[0.04] pointer-events-none flex justify-end items-center'>
        <Quote size={400} className='text-[#002EFF] rotate-180' />
      </div>

      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        {/* TITLE */}
        <div className='mb-16'>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-extrabold text-black uppercase'
          >
            Student <span className='text-[#002EFF]'>Success Stories</span>
          </motion.h2>
          <div className='w-16 h-1 bg-[#FCB900] mt-4 rounded-full'></div>
        </div>

        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className='grid md:grid-cols-[1fr_2fr] gap-12 items-center'
            >
              {/* LEFT: IRREGULAR GLOWING IMAGE */}
              <div className='relative flex justify-center'>
                {/* The Glow Effect */}
                <div className='absolute inset-0 bg-[#002EFF] blur-[50px] opacity-20 scale-110 rounded-full animate-pulse' />

                {/* Irregular Shape Container */}
                <div
                  className='relative w-64 h-80 bg-gray-100 shadow-2xl overflow-hidden group'
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    borderRadius: '20px',
                  }}
                >
                  {testimonials[index].image ? (
                    <Image
                      src={testimonials[index].image}
                      alt={testimonials[index].name}
                      fill
                      className='object-cover object-top transition-transform duration-700 group-hover:scale-110'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-[#002EFF] text-white text-6xl font-bold'>
                      {testimonials[index].name.charAt(0)}
                    </div>
                  )}
                  {/* Subtle overlay */}
                  <div className='absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[20px]' />
                </div>
              </div>

              {/* RIGHT: TEXT CONTENT */}
              <div className='text-left'>
                {/* NAME */}
                <h3 className='text-3xl font-extrabold text-black tracking-tight'>
                  {testimonials[index].name}
                </h3>

                {/* RATING */}
                <div className='flex gap-1 mt-2'>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className='text-[#FCB900] text-xl'>
                      ★
                    </span>
                  ))}
                </div>

                {/* TESTIMONY STATEMENT */}
                <div className='relative mt-8'>
                  <p className='text-gray-600 text-lg md:text-2xl font-medium italic leading-relaxed'>
                    “{testimonials[index].text}”
                  </p>
                </div>

                {/* CONTROLS (Next to text on desktop) */}
                <div className='flex gap-4 mt-10'>
                  <button
                    onClick={prev}
                    className='p-3 rounded-xl bg-gray-100 text-[#002EFF] hover:bg-[#002EFF] hover:text-white transition-all shadow-sm'
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={next}
                    className='p-3 rounded-xl bg-gray-100 text-[#002EFF] hover:bg-[#002EFF] hover:text-white transition-all shadow-sm'
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PROGRESS BAR DOTS */}
        <div className='flex gap-3 mt-16'>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-12 bg-[#002EFF]' : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
