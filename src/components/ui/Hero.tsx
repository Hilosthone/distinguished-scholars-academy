// 'use client'

// import { motion } from 'framer-motion'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'

// export default function Hero() {
//   return (
//     <section className='relative flex items-center justify-center min-h-screen bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 text-white px-6'>
//       {/* Overlay for dark transparent effect */}
//       <div className='absolute inset-0 bg-black/50'></div>

//       {/* Hero Content */}
//       <motion.div
//         className='relative z-10 text-center max-w-3xl mx-auto'
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className='text-4xl md:text-6xl font-extrabold leading-tight mb-6'>
//           Empowering the Next Generation of{' '}
//           <span className='text-blue-400'>Scholars</span>
//         </h1>

//         <p className='text-lg md:text-xl text-gray-200 mb-8'>
//           At Distinguished Scholars Academy, we cultivate brilliance through
//           mentorship, academic excellence, and innovation.
//         </p>

//         <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
//           <Link href='#programs'>
//             <Button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg'>
//               Explore Programs
//             </Button>
//           </Link>
//           <Link href='#about'>
//             <Button
//               variant='outline'
//               className='border-white text-gray-500 hover:bg-white hover:text-gray-900 px-8 py-6 text-lg'
//             >
//               Learn More
//             </Button>
//           </Link>
//         </div>
//       </motion.div>
//     </section>
//   )
// }



// // src/components/ui/Hero.tsx
// 'use client'

// import { motion } from 'framer-motion'
// import { Button } from './button'

// export default function Hero() {
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   }

//   return (
//     <section className="h-screen flex flex-col justify-center items-center text-center bg-white dark:bg-black px-4 pt-24 md:px-0">
      
//       {/* Main Title */}
//       <motion.h1
//         className="text-4xl md:text-6xl font-extrabold pt-24 md:pt-8 text-black dark:text-white leading-tight"
//         initial={{ opacity: 0, y: -50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         Unlock Your Potential at{' '}
//         <span className="text-orange-500">Distinguished Scholars Academy</span>
//       </motion.h1>

//       {/* Subheading / Tagline */}
//       <motion.p
//         className="mt-4 text-gray-700 dark:text-gray-300 text-lg md:text-2xl max-w-3xl"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.2, duration: 0.8 }}
//       >
//         Where excellence meets opportunity. Join a community of innovators, leaders, and changemakers ready to make a difference in the world.
//       </motion.p>

//       {/* Key Benefits */}
//       <motion.div
//         className="mt-8 flex flex-col md:flex-row gap-4 text-left max-w-4xl"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ staggerChildren: 0.2 }}
//       >
//         {[
//           {
//             title: 'Expert Faculty',
//             desc: 'Learn from experienced educators and industry leaders guiding you every step.',
//           },
//           {
//             title: 'Innovative Programs',
//             desc: 'Cutting-edge courses designed to equip you with skills for tomorrow’s world.',
//           },
//           {
//             title: 'Vibrant Community',
//             desc: 'Connect, collaborate, and grow with like-minded peers and mentors.',
//           },
//         ].map((item, i) => (
//           <motion.div
//             key={i}
//             className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4 flex-1 shadow hover:shadow-lg transition"
//             variants={cardVariants}
//             whileHover={{ scale: 1.05 }}
//           >
//             <h3 className="font-semibold text-orange-600 dark:text-orange-400">{item.title}</h3>
//             <p className="mt-1 text-gray-700 dark:text-gray-300">{item.desc}</p>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Call-to-Action */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.6, duration: 0.8 }}
//       >
//         <Button className="mt-10 bg-orange-500 text-white px-8 py-4 rounded-md text-lg font-semibold hover:scale-105 transition-transform">
//           Enroll Today
//         </Button>
//       </motion.div>
//     </section>
//   )
// }



// src/components/ui/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from './button'

export default function Hero() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative flex flex-col justify-center items-center text-center min-h-screen bg-linear-to-tr from-white via-orange-50 to-orange-100 dark:from-black dark:via-gray-900 dark:to-gray-800 text-black dark:text-white px-4 pt-[6rem] md:pt-[7rem]">

      {/* Overlay for subtle dark effect */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/50 z-0"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Unlock Your Potential at{' '}
          <span className="text-orange-500">Distinguished Scholars Academy</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
          Where excellence meets opportunity. Join a community of innovators, leaders, and changemakers ready to make a difference in the world.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button className="bg-orange-500 text-white px-8 py-4 text-lg font-semibold">
              Explore Programs
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button className="border border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Key Benefits Cards */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row gap-4 text-left max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              title: 'Expert Faculty',
              desc: 'Learn from experienced educators and industry leaders guiding you every step.',
            },
            {
              title: 'Innovative Programs',
              desc: 'Cutting-edge courses designed to equip you with skills for tomorrow’s world.',
            },
            {
              title: 'Vibrant Community',
              desc: 'Connect, collaborate, and grow with like-minded peers and mentors.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/30 dark:bg-black/40 rounded-lg p-6 flex-1 shadow hover:shadow-lg transition"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-semibold text-orange-500">{item.title}</h3>
              <p className="mt-2 text-gray-800 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button className="mt-10 bg-orange-500 text-white px-8 py-4 rounded-md text-lg font-semibold hover:scale-105 transition-transform">
            Enroll Today
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
