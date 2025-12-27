'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, GraduationCap } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section
      id='contact'
      className='w-full py-24 bg-[#002EFF] relative overflow-hidden'
    >
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div className='absolute top-[-10%] left-[-5%] w-64 h-64 border-4 border-white rounded-full' />
        <div className='absolute bottom-[-10%] right-[-5%] w-96 h-96 border-8 border-white rounded-full' />
      </div>

      <div className='max-w-7xl mx-auto px-10 md:px-20 text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className='inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-bold rounded-full mb-6 backdrop-blur-sm'>
            Limited Slots Available for 2026
          </span>

          <h2 className='text-4xl md:text-6xl font-extrabold text-white leading-tight uppercase'>
            Ready to Achieve <br />
            <span className='text-[#FCB900]'>Academic Excellence?</span>
          </h2>
        </motion.div>

        <motion.p
          className='text-white/80 mt-8 text-lg md:text-xl max-w-2xl mx-auto font-medium'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Join thousands of students improving their scores, building
          confidence, and excelling in exams with DSA’s proven learning system.
        </motion.p>

        <motion.div
          className='mt-12 flex flex-col sm:flex-row justify-center items-center gap-6'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Primary CTA */}
          <a
            className='w-full sm:w-auto px-10 py-5 bg-[#FCB900] text-black font-extrabold rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-xl'
            href='https://wa.link/7wim2w'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GraduationCap size={24} />
            ENROL NOW
            <ArrowRight size={20} />
          </a>

          {/* Secondary CTA */}
          <a
            className='w-full sm:w-auto px-10 py-5 border-2 border-white/30 text-white font-extrabold rounded-xl hover:bg-white hover:text-[#002EFF] transition-all flex items-center justify-center gap-2'
            href='https://wa.link/xtiui2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MessageCircle size={24} />
            JOIN FREE CLASSES
          </a>
        </motion.div>

        {/* Social Proof Text */}
        <motion.p
          className='mt-10 text-white/50 text-sm font-medium italic'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          No credit card required to join the free orientation class.
        </motion.p>
      </div>
    </section>
  )
}
