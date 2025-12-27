'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Clock, BarChart2, Book, ArrowRight } from 'lucide-react'

const quizFeatures = [
  {
    title: 'Instant Scoring',
    desc: 'Get immediate feedback after each question to track your progress.',
    icon: Zap,
  },
  {
    title: 'Timed Mode',
    desc: 'Challenge yourself with countdown timers to simulate real exam conditions.',
    icon: Clock,
  },
  {
    title: 'Leaderboard',
    desc: 'Compete with other students and see how you rank weekly.',
    icon: BarChart2,
  },
  {
    title: 'Subject-Based',
    desc: 'Focus on specific subjects to strengthen your weak areas.',
    icon: Book,
  },
]

export default function RapidQuiz() {
  return (
    <section
      id='RapidQuiz'
      className='w-full py-24 bg-white relative overflow-hidden'
    >
      {/* Decorative background element for energy */}
      <div className='absolute -top-24 -right-24 w-96 h-96 bg-[#002EFF]/5 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        {/* TITLE SECTION */}
        <div className='text-center mb-16'>
          <motion.h2
            className='text-3xl md:text-4xl font-extrabold text-black uppercase'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rapid <span className='text-[#002EFF]'>Quiz Portal</span>
          </motion.h2>
          <div className='w-16 h-1 bg-[#FCB900] mx-auto mt-4 rounded-full'></div>

          <motion.p
            className='mt-6 text-gray-600 max-w-2xl mx-auto text-lg'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Practice UTME-style questions in real time. Improve your speed,
            accuracy, and exam readiness with our high-speed interactive quiz
            system.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
          {quizFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm 
                hover:shadow-xl hover:border-[#002EFF]/20 transition-all duration-300'
              >
                <div className='w-14 h-14 bg-[#f0f4ff] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#002EFF] transition-colors duration-300'>
                  <Icon
                    size={28}
                    className='text-[#002EFF] group-hover:text-white transition-colors duration-300'
                  />
                </div>

                <h3 className='text-xl font-bold text-black group-hover:text-[#002EFF] transition-colors'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 mt-3 text-sm leading-relaxed'>
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-16 flex justify-center'
        >
          <Link
            href='/rapid-quiz'
            className='group px-10 py-4 bg-[#FCB900] text-black font-extrabold rounded-xl shadow-lg 
  hover:bg-[#002EFF] hover:text-white transition-all duration-300 flex items-center gap-3'
          >
            START QUIZ NOW
            <ArrowRight
              size={20}
              className='group-hover:translate-x-1 transition-transform'
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
