'use client'
import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  ClipboardList,
  Zap,
  CalendarCheck,
  FileText,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Experienced Tutors',
    desc: 'Learn from highly skilled tutors with years of teaching experience.',
    icon: Users,
  },
  {
    title: 'Simplified Lessons',
    desc: 'Every topic is broken down into simple, digestible formats for all learners.',
    icon: BookOpen,
  },
  {
    title: 'Weekly Assessments',
    desc: 'Standard assessment tests designed to track your progress and reinforce understanding.',
    icon: ClipboardList,
  },
  {
    title: 'Challenge Mode',
    desc: 'Test your speed and accuracy with fast-paced quizzes via Rapid Quiz.',
    icon: Zap,
  },
  {
    title: 'Daily Accountability',
    desc: 'We monitor your daily studies for effective learning via our welfare arm.',
    icon: CalendarCheck,
  },
  {
    title: 'Exam-Focused Material',
    desc: 'Get high-quality materials in both print and digital formats.',
    icon: FileText,
  },
]

export default function WhyChooseDSA() {
  return (
    <section id='why-dsa' className='w-full py-24 bg-white'>
      {/* Container with matching horizontal padding */}
      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-2xl mx-auto'
        >
          <span className='text-[#002EFF] font-bold tracking-widest text-sm uppercase'>
            Advantages
          </span>
          <h2 className='text-3xl md:text-4xl font-extrabold text-black mt-2 leading-tight uppercase'>
            Why Choose <span className='text-[#002EFF]'>DSA?</span>
          </h2>
          <div className='w-20 h-1.5 bg-[#FCB900] mx-auto mt-4 rounded-full'></div>
          <p className='mt-6 text-gray-600 text-lg leading-relaxed'>
            We provide a structured, student-focused learning experience that
            guarantees academic improvement.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group p-8 rounded-2xl bg-[#f8f9ff] border border-transparent 
                hover:border-[#002EFF]/30 hover:bg-white hover:shadow-2xl 
                transition-all duration-300 ease-out'
              >
                {/* Icon Circle */}
                <div className='w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#002EFF] transition-colors duration-300'>
                  <Icon
                    className='text-[#002EFF] group-hover:text-white transition-colors duration-300'
                    size={28}
                  />
                </div>

                <h3 className='text-xl font-bold text-black mt-6 group-hover:text-[#002EFF] transition-colors'>
                  {feature.title}
                </h3>

                <p className='text-gray-600 mt-3 leading-relaxed text-sm md:text-base'>
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mt-16'
        >
          <Link
            href='#programs'
            className='inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white bg-[#002EFF]
            hover:bg-[#FCB900] hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95'
          >
            Explore Programs
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
