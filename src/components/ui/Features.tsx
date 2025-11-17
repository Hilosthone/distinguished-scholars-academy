'use client'
import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  ClipboardList,
  Zap,
  CalendarCheck,
  FileText,
} from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'Experienced Tutors',
    desc: 'Learn from certified, highly skilled tutors with years of teaching experience.',
    icon: Users,
  },
  {
    title: 'Simplified Lessons',
    desc: 'Every topic is broken down into simple, digestible formats for all learners.',
    icon: BookOpen,
  },
  {
    title: 'Weekly Tests & Assessments',
    desc: 'Consistent tests help track progress and reinforce understanding.',
    icon: ClipboardList,
  },
  {
    title: 'Challenge Mode (Rapid Quiz)',
    desc: 'Test your speed and accuracy with fast-paced quizzes.',
    icon: Zap,
  },
  {
    title: 'Daily Study Timetables',
    desc: 'We provide structured daily and weekly study guides for effective learning.',
    icon: CalendarCheck,
  },
  {
    title: 'Printed + Digital Notes',
    desc: 'Get high-quality, exam-focused materials in both print and digital formats.',
    icon: FileText,
  },
]

export default function WhyChooseDSA() {
  return (
    <section className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-3xl mx-auto'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-[#002EFF]'>
            WHY CHOOSE DSA?
          </h2>
          <p className='mt-3 text-gray-700 text-lg'>
            We provide a structured, student-focused learning experience that
            guarantees improvement.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='p-6 rounded-xl bg-white shadow-md border border-gray-200 
                hover:shadow-xl hover:border-[#002EFF] hover:-translate-y-2
                transition-all duration-300 ease-out'
              >
                <div className='flex items-center gap-3'>
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Icon className='text-[#002EFF]' size={32} />
                  </motion.div>

                  <h3 className='text-xl font-semibold text-[#002EFF]'>
                    {feature.title}
                  </h3>
                </div>

                <p className='text-gray-700 mt-3 leading-relaxed'>
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-center mt-14'
        >
          <button
            className='px-8 py-3 rounded-lg font-semibold text-white bg-[#002EFF]
            hover:bg-[#FCB900] transition-all duration-300 flex items-center gap-2 mx-auto'
          >
            Explore Programs
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
