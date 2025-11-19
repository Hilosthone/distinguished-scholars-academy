'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Opeyemi Elizabeth',
    rating: '★★★★★',
    text: `DSA (Distinguish Scholars Academy) has really help me a lot. It build my reading skill. If I didn't understand a topic, I am free to chat the teachers and they are ready to explain for me in a understanding way. They taught me that success is not about just going to class alone but you must put all effort to it by reading, studying it NOT cramming. They make me see life more than I do. During the process of my admission they never life me alone.keep asking not like other tutorial that after the lesson that the end. DSA never do such. They are after the success of ever student. DSA never put room for laziness.`,
    image: null,
  },
  {
    name: 'Ewata Uyoyo',
    rating: '★★★★★',
    text: `Distinguished Scholars Academy: with regards to tutoring, they are very excellent and dedicated to the success of every one of their students. They support you throughout the entire process, from JAMB lessons to post-UTME and even admission. They work hard to help their students achieve the best results, and it shows because they can testify to producing top UTME exam scorers. You can't go wrong with DSA.`,
    image: null,
  },
  {
    name: 'Perfect Bankole',
    rating: '★★★★★',
    text: `I joined DSA last year for 2025 UTME. I will say they were the vehicle God used for me to acquire success. All through my days of preparation, Doctor Philip and his team were supportive academically and emotional. The aspect of the tutorial I love the most is the accountability and welfare unit- their checkup and words of encouragement went a long way. With the help of the tutorial I was able to hit a Jamb score of 306 and also a 75.5 in the University of Ibadan Post UTME exam, and finally getting admission to study Mechanical engineering in UI.
My advice for you that has Joined DSA is to lock in and carry out all the tasks given to you. And for you still doubting, join as soon as possible.
"DSA is the right vehicle for your success."`,
    image: null,
  },
  {
    name: 'Glory Adeyemi',
    rating: '★★★★★',
    text: `The distinguished scholars academy is the best place to be for anyone preparing for JAMB. DSA is blessed with the best tutors ever who are willing and ready to teach students to the best of their understanding.
Keep the flag flying DSA 🫡🫡🫡`,
    image: null,
  },
  {
    name: 'Eninla Oluwole',
    rating: '★★★★★',
    text: `The best online app I've ever joined!! It really improved my academics and my performance in the school, happy with the weekly test assessment because it brings you closer to ways of answering questions in external exams and also prepares you for any upcoming external exams.`,
    image: null,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  // Auto-change every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className='w-full py-24 bg-professional-gradient'>
      <div className='max-w-5xl mx-auto px-6 text-center'>
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
              {/* Image placeholder */}
              <div className='w-28 h-28 rounded-full border-4 border-[#002EFF] shadow-lg overflow-hidden bg-[#F5F5F5] mb-4'></div>

              {/* Name */}
              <h3 className='text-xl font-semibold text-black'>
                {testimonials[index].name}
              </h3>

              {/* Rating */}
              <p className='text-[#FCB900] text-2xl mt-1'>
                {testimonials[index].rating}
              </p>

              {/* Text */}
              <p className='text-[#4B5563] text-lg md:text-xl font-medium italic mt-4 max-w-3xl whitespace-pre-line'>
                “{testimonials[index].text}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
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

          {/* Dots */}
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
