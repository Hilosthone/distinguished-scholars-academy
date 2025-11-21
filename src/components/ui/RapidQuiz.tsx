'use client'
import { motion } from 'framer-motion'
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
    title: 'Subject-Based Quizzes',
    desc: 'Focus on specific subjects to strengthen weak areas.',
    icon: Book,
  },
]

export default function RapidQuiz() {
  return (
    <section id='RapidQuiz' className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6 text-center'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-[#002EFF]'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Rapid Quiz Portal
        </motion.h2>

        <motion.p
          className='mt-4 text-gray-700 max-w-2xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Practice UTME-style questions in real time. Improve speed, accuracy,
          and exam readiness with our interactive quiz system.
        </motion.p>

        {/* Features Grid */}
        <div className='grid md:grid-cols-4 gap-8 mt-12'>
          {quizFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className='bg-[#f2f6ff] p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer'
              >
                <Icon size={30} className='text-[#002EFF] mb-4' />
                <h3 className='text-xl font-semibold text-[#002EFF]'>
                  {feature.title}
                </h3>
                <p className='text-gray-700 mt-2'>{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='mt-10'
        >
          <a
            href='/rapid-quiz'
            className='px-6 py-3 bg-[#FCB900] text-black font-semibold rounded-lg hover:bg-[#e6ac00] flex items-center justify-center gap-2 mx-auto'
          >
            Enter Rapid Quiz Portal
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
