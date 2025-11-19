'use client'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Video,
  BarChart3,
  FileText,
  ClipboardCheck,
  AlarmClock,
  CalendarCheck,
  Trophy,
} from 'lucide-react'

const features = [
  { title: 'LMS Access', icon: BookOpen },
  { title: 'Recorded Classes', icon: Video },
  { title: 'Free E-books & Summaries', icon: FileText },
  { title: 'Dashboard Tracking', icon: BarChart3 },
  { title: 'Past Questions Practice', icon: ClipboardCheck },
  { title: 'Weekly Reviews', icon: AlarmClock },
  { title: 'Study Schedules', icon: CalendarCheck },
  { title: 'Leaderboard Competitions', icon: Trophy },
]

export default function Features() {
  return (
    <section id='materials' className='w-full py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-[#002EFF] text-center'
        >
          What Students Get
        </motion.h2>

        {/* FEATURES GRID */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14'>
          {features.map((feat, index) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='p-6 rounded-xl bg-white shadow-md border border-gray-200 
                hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
              >
                <div className='flex items-center gap-3 mb-3'>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Icon className='text-[#002EFF]' size={30} />
                  </motion.div>

                  <h3 className='text-lg font-semibold text-[#002EFF]'>
                    {feat.title}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
