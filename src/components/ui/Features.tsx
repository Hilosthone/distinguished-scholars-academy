'use client'
import { motion } from 'framer-motion'
import { Monitor, Cloud, Sparkles } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'Easy-To-Use Interface',
    desc: 'Our platform offers a simple, intuitive layout to make learning seamless.',
    icon: Monitor,
  },
  {
    title: 'Cloud-Hosted Platform',
    desc: 'Access all learning materials anytime, anywhere—no limitations.',
    icon: Cloud,
  },
  {
    title: 'Interactive Learning',
    desc: 'Experience engaging quizzes, videos, and collaborative learning tools.',
    icon: Sparkles,
  },
]

export default function Features() {
  return (
    <section className='w-full py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center'>
        {/* LEFT — FEATURES LIST */}
        <div className='space-y-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`
                  p-6 rounded-xl bg-white border border-gray-200 shadow-md w-full
                  transition-all duration-300 ease-out hover:shadow-xl hover:border-[#002EFF] hover:-translate-y-2
                  ${index === 0 ? 'ml-0' : ''}
                  ${index === 1 ? 'ml-6 md:ml-7' : ''}
                  ${index === 2 ? 'ml-3 md:ml-10' : ''}
                `}
              >
                <div className='flex items-center gap-3'>
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Icon className='text-[#002EFF]' size={30} />
                  </motion.div>

                  <h3 className='text-xl font-semibold text-[#002EFF]'>
                    {feature.title}
                  </h3>
                </div>

                <p className='text-black mt-2'>{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className='w-full'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-[#002EFF] leading-snug'>
            A Vibrant E-Learning Platform <br /> Built to Elevate Your Success
          </h2>
          <p className='text-gray-700 mt-4 leading-relaxed'>
            Distinguished Scholars Academy is designed to give students the best
            learning experience through structured materials, interactive tools,
            and modern technology. Whether you're preparing for WAEC, NECO,
            JAMB, UTME, or JUPEB — we provide everything you need to excel.
          </p>

          <button className='mt-6 px-6 py-3 rounded-lg font-semibold text-white bg-[#002EFF] hover:bg-[#FCB900] transition-all duration-300 flex items-center gap-2'>
            Explore More
            <ArrowRight
              size={25}
            />
          </button>
        </motion.div>
      </div>
      {/* bg-[#002EFF]  text-[#FCB900]'*/}
    </section>
  )
}

// 'use client'
// import { motion } from 'framer-motion'

// const features = [
//   {
//     title: 'Easy-To-Use Interface',
//     desc: 'Our platform is smooth and easy, perfect for all learners.',
//   },
//   {
//     title: 'Cloud-Hosted Platform',
//     desc: 'Access your learning materials anywhere, anytime.',
//   },
//   {
//     title: 'Interactive Elements',
//     desc: 'Engaging quizzes, videos, and collaborative tools.',
//   },
// ]

// export default function Features() {
//   return (
//     <section className='w-full py-20 bg-white'>
//       <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8'>
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className='p-6 rounded-xl shadow-md bg-white border border-gray-100'
//           >
//             <h3 className='text-xl font-semibold text-[#002EFF]'>{feature.title}</h3>
//             <p className='text-black mt-2'>{feature.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   )
// }
