'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'Do you teach UTME & WAEC students?',
    answer: 'Yes! We provide comprehensive preparation for UTME, WAEC, and other national exams, ensuring students understand concepts thoroughly and build confidence to excel.'
  },
  {
    question: 'Are classes online or physical?',
    answer: 'Both! We offer flexible online classes you can join from anywhere, as well as physical classes at our academy for a hands-on learning experience.'
  },
  {
    question: 'Do you provide study materials?',
    answer: 'Yes! Students receive detailed printed and digital notes, e-books, and past question compilations to reinforce learning and revision.'
  },
  {
    question: 'How do I join Rapid Quiz?',
    answer: 'Via our Rapid Quiz portal! You can access real-time practice quizzes, track your scores instantly, and compete on our leaderboard.'
  },
  {
    question: 'Do you offer free classes?',
    answer: 'Yes! We provide select free classes and sample tutorials so you can experience our teaching style before enrolling in full programs.'
  },
  {
    question: 'Can I switch between online and physical classes?',
    answer: 'Absolutely! Students can choose the format that suits them best, and even switch when necessary to maintain continuity in learning.'
  },
  {
    question: 'Are there weekly tests and assessments?',
    answer: 'Yes! Every student gets weekly tests and assessments to track progress, identify weaknesses, and reinforce learning in a structured way.'
  },
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className='w-full py-24 bg-[#f2f6ff]'>
      <div className='max-w-4xl mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-[#002EFF] text-center'>
          Frequently Asked Questions
        </h2>

        <div className='mt-10 space-y-4'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white rounded-xl shadow-md overflow-hidden cursor-pointer'
            >
              <div
                className='flex justify-between items-center px-6 py-4'
                onClick={() => toggleFAQ(index)}
              >
                <h3 className='text-lg font-semibold text-[#002EFF]'>
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp size={24} className='text-[#002EFF]' />
                ) : (
                  <ChevronDown size={24} className='text-[#002EFF]' />
                )}
              </div>

              {openIndex === index && (
                <div className='px-6 pb-4 text-gray-700'>
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
