'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Do you teach UTME & WAEC students?',
    answer:
      'Yes! We provide comprehensive preparation for UTME, WAEC, NECO, and Post-UTME. Our curriculum is designed to ensure students understand core concepts thoroughly rather than just memorizing facts.',
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

export default function FAQs() {
  // FIXED: Explicitly tell TypeScript the state can be a number or null
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id='faq' className='w-full py-24 bg-[#f8faff]'>
      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        {/* TITLE SECTION */}
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-extrabold text-black uppercase'
          >
            Common <span className='text-[#002EFF]'>Questions</span>
          </motion.h2>
          <div className='w-16 h-1 bg-[#FCB900] mx-auto mt-4 rounded-full'></div>
        </div>

        <div className='max-w-3xl mx-auto space-y-4'>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-[#002EFF] bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-[#002EFF]/30'
                }`}
              >
                <button
                  className='w-full flex justify-between items-center px-6 py-5 text-left'
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isOpen ? 'text-[#002EFF]' : 'text-gray-800'
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`p-1 rounded-full transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#002EFF] text-white rotate-180'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4'>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
