'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Zap,
  Clock,
  BarChart2,
  Book,
  ArrowRight,
  User,
  ShieldCheck,
  X,
} from 'lucide-react'

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

const bgFormulas = [
  { text: 'y = mx + c', top: '10%', left: '5%', rotate: -15 },
  { text: 'C₆H₁₂O₆', top: '15%', right: '10%', rotate: 10 },
  { text: 'v = u + at', top: '80%', left: '8%', rotate: 20 },
  { text: 'sin²θ + cos²θ = 1', top: '85%', right: '12%', rotate: -10 },
]

export default function RapidQuiz() {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section
      id='RapidQuiz'
      className='w-full py-24 bg-white relative overflow-hidden'
    >
      {/* --- ACADEMIC BACKGROUND ELEMENTS --- */}
      <div className='absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10'>
        {bgFormulas.map((f, i) => (
          <motion.div
            key={`formula-${i}`}
            animate={{ y: [0, -20, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              ease: 'easeInOut',
            }}
            className='absolute font-serif italic text-[#002EFF] text-5xl'
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              transform: `rotate(${f.rotate}deg)`,
            }}
          >
            {f.text}
          </motion.div>
        ))}
      </div>

      <div className='absolute -top-24 -right-24 w-96 h-96 bg-[#002EFF]/5 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-7xl mx-auto px-6 md:px-20 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4'
          >
            <span className='w-2 h-2 bg-[#002EFF] rounded-full animate-pulse' />
            <span className='text-[#002EFF] text-xs font-black uppercase tracking-[0.2em]'>
              Interactive Learning
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl md:text-5xl font-black text-black uppercase tracking-tight'
          >
            Rapid <span className='text-[#002EFF]'>Quiz Portal</span>
          </motion.h2>
          <div className='w-24 h-1.5 bg-[#FCB900] mx-auto mt-4 rounded-full shadow-sm'></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-medium'
          >
            Practice UTME-style questions in real time. Improve your speed,
            accuracy, and exam readiness with our high-speed interactive quiz
            system.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
          {quizFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={`feature-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 hover:border-[#002EFF]/20 transition-all duration-500'
              >
                <div className='w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#002EFF] group-hover:rotate-10 transition-all duration-300'>
                  <Icon
                    size={28}
                    className='text-[#002EFF] group-hover:text-white transition-colors duration-300'
                  />
                </div>
                <h3 className='text-xl font-black text-black group-hover:text-[#002EFF] transition-colors uppercase tracking-tight'>
                  {feature.title}
                </h3>
                <p className='text-gray-500 mt-3 text-sm leading-relaxed font-medium'>
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='mt-16 flex justify-center'
        >
          <button
            onClick={() => setShowModal(true)}
            className='group px-12 py-5 bg-[#FCB900] text-black font-black rounded-2xl shadow-xl shadow-yellow-100 hover:bg-[#002EFF] hover:text-white transition-all duration-300 flex items-center gap-4 active:scale-95'
          >
            START QUIZ NOW
            <ArrowRight
              size={22}
              className='group-hover:translate-x-2 transition-transform'
            />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className='fixed inset-0 z-100 flex items-center justify-center p-6'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className='absolute inset-0 bg-black/60 backdrop-blur-md'
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className='relative bg-white w-full max-w-lg rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden'
            >
              <button
                onClick={() => setShowModal(false)}
                className='absolute top-8 right-8 text-gray-400 hover:text-black hover:rotate-90 transition-all'
              >
                <X size={28} />
              </button>
              <div className='text-center mb-10'>
                <h3 className='text-3xl font-black text-black uppercase tracking-tighter'>
                  Access Gateway
                </h3>
                <p className='text-gray-500 font-bold text-sm uppercase tracking-widest mt-2'>
                  Select your portal to continue
                </p>
              </div>
              <div className='flex flex-col gap-4'>
                <Link href='/admin' className='group'>
                  <div className='flex items-center gap-5 p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-[#002EFF] hover:bg-blue-50/50 transition-all duration-300'>
                    <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-[#002EFF] group-hover:scale-110 transition-transform'>
                      <ShieldCheck size={36} />
                    </div>
                    <div className='text-left'>
                      <h4 className='font-black text-xl text-black uppercase leading-none'>
                        Admin
                      </h4>
                      <p className='text-sm text-gray-500 mt-1 font-medium'>
                        Manage exams & database
                      </p>
                    </div>
                    <ArrowRight className='ml-auto text-gray-300 group-hover:text-[#002EFF] group-hover:translate-x-2 transition-all' />
                  </div>
                </Link>
                <Link href='/rapid-quiz' className='group'>
                  <div className='flex items-center gap-5 p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-[#FCB900] hover:bg-yellow-50/50 transition-all duration-300'>
                    <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-[#FCB900] group-hover:scale-110 transition-transform'>
                      <User size={36} />
                    </div>
                    <div className='text-left'>
                      <h4 className='font-black text-xl text-black uppercase leading-none'>
                        Student
                      </h4>
                      <p className='text-sm text-gray-500 mt-1 font-medium'>
                        Enter test environment
                      </p>
                    </div>
                    <ArrowRight className='ml-auto text-gray-300 group-hover:text-[#FCB900] group-hover:translate-x-2 transition-all' />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}