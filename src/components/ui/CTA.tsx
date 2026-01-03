'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, GraduationCap } from 'lucide-react'

// Academic symbols for the final push
const ctaFormulas = [
  { text: 'E = hf', top: '15%', left: '10%', rotate: -15 },
  { text: 'CH₄ + 2O₂', top: '20%', right: '15%', rotate: 12 },
  { text: 'lim x→0', top: '70%', left: '12%', rotate: -8 },
  { text: 'v² = u² + 2as', top: '75%', right: '10%', rotate: 15 },
  { text: 'ΔS > 0', top: '45%', left: '5%', rotate: 25 },
]

export default function FinalCTA() {
  return (
    <section
      id='contact'
      className='relative w-full py-24 bg-[#002EFF] overflow-hidden'
    >
      {/* --- ACADEMIC BACKGROUND OVERLAY --- */}
      <div className='absolute inset-0 pointer-events-none select-none overflow-hidden'>
        {/* Decorative Circles */}
        <div className='absolute top-[-10%] left-[-5%] w-64 h-64 border-4 border-white/10 rounded-full' />
        <div className='absolute bottom-[-10%] right-[-5%] w-96 h-96 border-8 border-white/10 rounded-full' />

        {/* Floating Formulas */}
        {ctaFormulas.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            animate={{
              y: [0, -15, 0],
              rotate: [f.rotate, f.rotate + 5, f.rotate],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              ease: 'easeInOut',
            }}
            className='absolute font-serif italic text-white text-xl md:text-3xl whitespace-nowrap hidden sm:block'
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
            }}
          >
            {f.text}
          </motion.div>
        ))}
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-20 text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className='inline-flex items-center gap-2 px-5 py-2 bg-white/10 text-white text-xs font-black uppercase tracking-[0.3em] rounded-full mb-8 backdrop-blur-md border border-white/20'>
            <span className='w-2 h-2 bg-[#FCB900] rounded-full animate-ping' />
            Limited Slots for 2026
          </span>

          <h2 className='text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase'>
            Ready to Achieve <br />
            <span className='text-[#FCB900]'>Academic Excellence?</span>
          </h2>
        </motion.div>

        <motion.p
          className='text-white/80 mt-8 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed'
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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Primary CTA */}
          <a
            className='group w-full sm:w-auto px-12 py-6 bg-[#FCB900] text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_rgba(252,185,0,0.3)] active:scale-95'
            href='https://wa.link/7wim2w'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GraduationCap size={28} />
            ENROL NOW
            <ArrowRight
              size={22}
              className='group-hover:translate-x-2 transition-transform'
            />
          </a>

          {/* Secondary CTA */}
          <a
            className='w-full sm:w-auto px-12 py-6 border-2 border-white/30 text-white font-black text-lg rounded-2xl hover:bg-white hover:text-[#002EFF] hover:border-white transition-all flex items-center justify-center gap-3 active:scale-95'
            href='https://wa.link/xtiui2'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MessageCircle size={28} />
            FREE CLASSES
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='mt-12 flex flex-col items-center gap-4'
        >
          <p className='text-white/40 text-sm font-bold uppercase tracking-widest'>
            No credit card required to start
          </p>
          <div className='flex -space-x-3'>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='w-10 h-10 rounded-full border-2 border-[#002EFF] bg-gray-200 overflow-hidden'
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt='Student'
                />
              </div>
            ))}
            <div className='w-10 h-10 rounded-full border-2 border-[#002EFF] bg-[#FCB900] flex items-center justify-center text-[10px] font-black'>
              +2k
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}