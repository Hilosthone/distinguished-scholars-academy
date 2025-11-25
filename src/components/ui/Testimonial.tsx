'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import GloryAdeyemi from '../../imges/Glory Adeyemi.jpg'
import OpeyemiElizabeth from '../../imges/Opeyemi Elizabeth.jpg'
import BankolePerfect from '../../imges/Bankole Perfect.jpg'
import EwataUyoyo from '../../imges/Ewata Uyoyo.jpg'

const testimonials = [
  {
    name: 'Opeyemi Elizabeth',
    rating: '★★★★★',
    text: `DSA (Distinguished Scholars Academy) has really helped me a lot. It built my reading skill and strengthened my understanding of every subject. Whenever I didn't understand a topic, I could freely chat with the teachers and they were always ready to explain in a clear and understandable way. They taught me that success is not just about attending class but putting in the effort to study, practice, and revise. During my admission process, they constantly supported me, unlike other tutorials that leave you alone after lessons. DSA is truly committed to the success of every student, leaving no room for laziness.`,
    image: OpeyemiElizabeth,
  },
  {
    name: 'Ewata Uyoyo',
    rating: '★★★★★',
    text: `Distinguished Scholars Academy is excellent and dedicated to the success of all their students. They provide support throughout the entire learning journey—from JAMB lessons to post-UTME preparation, and even during admission. Their guidance, constant motivation, and professional approach make students confident and fully prepared. Thanks to DSA, I felt fully supported and encouraged to achieve the best results possible.`,
    image: EwataUyoyo,
  },
  {
    name: 'Perfect Bankole',
    rating: '★★★★★',
    text: `I joined DSA last year for the 2025 UTME, and I can say they were the vehicle God used to help me succeed. Throughout my preparation, Dr. Philip and the team were academically and emotionally supportive. I especially loved their accountability and welfare system—the regular check-ins and words of encouragement were amazing. With their guidance, I scored 306 in UTME and 75.5 in the University of Ibadan Post-UTME exam, eventually gaining admission to study Mechanical Engineering at UI. My advice: follow their instructions, stay consistent, and trust the process. DSA is the right vehicle for your success!`,
    image: BankolePerfect,
  },
  {
    name: 'Glory Adeyemi',
    rating: '★★★★★',
    text: `Distinguished Scholars Academy is the best place for anyone preparing for JAMB. They are blessed with the most dedicated tutors who are willing and ready to teach students with patience and clarity. The learning environment is motivating, supportive, and results-driven. With DSA, you don’t just learn; you build confidence, knowledge, and a winning attitude. Keep the flag flying, DSA! 🫡🫡🫡`,
    image: GloryAdeyemi,
  },
  {
    name: 'Eninla Oluwole',
    rating: '★★★★★',
    text: `The best online app I've ever joined! DSA greatly improved my academics and overall performance. Their weekly assessments and rapid quizzes bring you closer to understanding how to tackle real exam questions effectively. They also prepare you for upcoming external exams, making sure you are confident, competent, and ready to succeed. Joining DSA was one of the best decisions I ever made for my education.`,
    image: null,
  },
]


export default function Testimonials() {
  const [index, setIndex] = useState(0)

  // Auto-slide every 6 seconds
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
    <section className='w-full py-24 bg-professional-gradient'>
      <div className='max-w-5xl mx-auto px-6 text-center'>
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-[#002EFF]'
        >
          What Our Students Say
        </motion.h2>

        <div className='relative mt-12'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center px-4'
            >
              {/* IMAGE FRAME */}
              <div className='w-32 h-32 mx-auto rounded-full p-[3px] bg-linear-to-br from-[#002EFF] to-[#FCB900] shadow-lg hover:shadow-[0_0_25px_rgba(0,46,255,0.35)] transition overflow-hidden mb-4'>
                <div className='w-full h-full rounded-full overflow-hidden'>
                  {testimonials[index].image ? (
                    <img
                      src={testimonials[index].image.src}
                      alt={testimonials[index].name}
                      className='w-full h-full object-cover object-[130%_2%]'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-200 text-gray-700 text-3xl font-bold'>
                      {testimonials[index].name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* NAME */}
              <h3 className='text-xl font-semibold text-black'>
                {testimonials[index].name}
              </h3>

              {/* RATING */}
              <p className='text-[#FCB900] text-2xl mt-1'>
                {testimonials[index].rating}
              </p>

              {/* TEXT */}
              <p className='text-[#4B5563] text-lg md:text-xl font-medium italic mt-4 max-w-3xl whitespace-pre-line'>
                “{testimonials[index].text}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className='flex justify-center gap-8 mt-10'>
            <button
              onClick={prev}
              className='p-3 rounded-full bg-[#002EFF] text-white hover:bg-blue-700 transition'
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className='p-3 rounded-full bg-[#002EFF] text-white hover:bg-blue-700 transition'
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* DOTS */}
          <div className='flex justify-center gap-3 mt-6'>
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index
                    ? 'bg-[#002EFF] scale-125'
                    : 'bg-[#ede027] opacity-40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
