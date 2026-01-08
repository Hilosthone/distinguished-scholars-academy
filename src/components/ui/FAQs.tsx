'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Do you teach UTME & WAEC students?',
    answer:
      'Yes! We provide physical classes at our centre in Ibadan, located near the University of Ibadan, Oyo State.',
  },
  {
    question: 'Are classes online or physical?',
    answer:
      'Both! We offer flexible online classes via our dedicated portal and Telegram/WhatsApp groups, as well as intensive physical classes at our academy for students who prefer in-person mentorship.',
  },
  {
    question: 'Do you provide study materials?',
    answer:
      'Absolutely. Every enrolled student gets access to our curated study bank, which includes simplified PDF notes, e-books, and high-yield past question compilations.',
  },
  {
    question: 'How do I join the Rapid Quiz?',
    answer:
      'Once you are registered, you can log in to our Rapid Quiz portal. It’s designed to simulate the real CBT environment, helping you build the speed and accuracy needed for 300+ scores.',
  },
  {
    question: 'Do you offer free orientation classes?',
    answer:
      'Yes! We regularly host free orientation and strategy sessions. You can join our free community via the links in the contact section to experience our teaching first-hand.',
  },
  {
    question: 'Can I switch between online and physical classes?',
    answer:
      'Yes, we allow for flexibility. If your schedule changes, you can consult with our admin to transition to the mode of learning that best supports your success.',
  },
]

const backgroundFormulas = [
  { text: 'Σ n=1 → ∞', top: '10%', left: '5%', rotate: -10 },
  { text: 'A ⇌ B + C', top: '20%', right: '8%', rotate: 15 },
  { text: 'dy/dx', top: '80%', left: '10%', rotate: -5 },
  { text: 'F = G(m₁m₂)/r²', top: '75%', right: '5%', rotate: 12 },
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id='faq'
      className='relative w-full py-24 bg-[#f8faff] overflow-hidden'
    >
      {/* --- BACKGROUND ACADEMIC ELEMENTS --- */}
      <div className='absolute inset-0 pointer-events-none select-none opacity-[0.07] hidden md:block'>
        {backgroundFormulas.map((f, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6 + i,
              ease: 'easeInOut',
            }}
            className='absolute font-serif italic text-[#002EFF] text-2xl font-bold'
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

      <div className='max-w-7xl mx-auto px-6 md:px-20 relative z-10'>
        {/* TITLE SECTION */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4 border border-blue-100'
          >
            <HelpCircle size={16} className='text-[#002EFF]' />
            <span className='text-[#002EFF] text-[10px] font-black uppercase tracking-[0.2em]'>
              Support Center
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl md:text-5xl font-black text-black uppercase tracking-tighter'
          >
            Common <span className='text-[#002EFF]'>Questions</span>
          </motion.h2>
          <div className='w-24 h-1.5 bg-[#FCB900] mx-auto mt-4 rounded-full shadow-sm'></div>
        </div>

        <div className='max-w-3xl mx-auto space-y-5'>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-[30px] transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'bg-white shadow-[0_20px_40px_rgba(0,46,255,0.08)] ring-1 ring-[#002EFF]/20'
                    : 'bg-white/60 hover:bg-white border border-gray-100 hover:shadow-xl'
                }`}
              >
                <button
                  className='w-full flex justify-between items-center px-8 py-6 text-left group'
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <h3
                    className={`text-lg font-black transition-colors tracking-tight ${
                      isOpen ? 'text-[#002EFF]' : 'text-gray-800'
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isOpen
                        ? 'bg-[#002EFF] text-white rotate-180'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-[#002EFF]'
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className='px-8 pb-8 text-gray-500 font-medium leading-relaxed border-t border-gray-50 pt-5'>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className='mt-16 text-center'
        >
          <p className='text-gray-400 font-bold text-sm uppercase tracking-widest'>
            Still have questions?
            <a
              href='https://wa.link/7wim2w'
              className='text-[#002EFF] ml-2 hover:underline'
            >
              Chat with an expert
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}