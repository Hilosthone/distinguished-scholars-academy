'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Hero01 from '../../imges/hero-0.jpeg'
import Hero02 from '../../imges/hero-2.jpg'
import Hero03 from '../../imges/hero-3.jpg'

export default function Hero() {
  return (
    <section className='w-full py-24 bg-dsaWhite'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6'>
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className='text-5xl md:text-6xl font-bold text-black leading-tight'>
            Distinguished <br />
            <span className='text-[#002EFF]'>Scholars</span>
          </h1>
          <p className='text-lg text-black/70 mt-4 max-w-md'>
            “The more that you learn, the more things you will know. The deeper
            you grow, the farther you go — and we help you do that.”
          </p>
          <div className='flex items-center gap-4 mt-6'>
            {/* Primary Button */}
            <button className='flex items-center gap-2 px-6 py-3 bg-[#002EFF] text-white rounded-lg font-semibold transition hover:bg-blue-800 hover:text-white hover:border hover:border-yellow-500'>
              Get Started
              <ArrowRight size={20} />
            </button>

            {/* Outline Button with Yellow Hover */}
            <button className='flex items-center gap-2 px-6 py-3 border border-[#002EFF] text-[#002EFF] rounded-lg font-semibold transition hover:bg-[#FCB900] hover:text-black hover:border hover:border-black'>
              <Play size={20} />
              Watch Video
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className='relative flex justify-center'
        >
          {/* MAIN YELLOW CIRCLE */}
          <div className='w-72 h-72 md:w-80 md:h-80 bg-[#FCB900] rounded-full flex items-center justify-center shadow-xl  sm:pt-6'>
            <Image
              src={Hero01}
              width={260}
              height={260}
              className='rounded-full object-cover'
              alt='Main Students'
            />
        
            {/* BLUE AND YELLOW SMALL CIRCLES */}
            <div className='absolute -top-6 -left-6 w-8 h-8 md:w-10 md:h-10 bg-[#002EFF] rounded-full opacity-80 animate-bounce-slow'></div>
            <div className='absolute -top-4 right-8 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
            <div className='absolute bottom-10 -right-6 w-10 h-10 md:w-12 md:h-12 bg-[#002EFF] rounded-full opacity-70 animate-bounce-slow'></div>
            <div className='absolute bottom-0 left-10 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
          </div>

          {/* FLOATING SMALL IMAGES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='absolute left-0 top-6'
          >
            <Image
              src={Hero02}
              width={85}
              height={85}
              className='rounded-full border-4 border-white shadow-md'
              alt='Student 1'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='absolute left-0 bottom-0'
          >
            <Image
              src={Hero03}
              width={110}
              height={110}
              className='rounded-full border-4 border-white shadow-md'
              alt='Student 2'
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


// // src/components/ui/Hero.tsx
// ;('use client')

// import { motion } from 'framer-motion'
// import { Button } from './button'

// export default function Hero() {
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   }

//   return (
//     <section className='relative flex flex-col justify-center items-center text-center min-h-screen bg-linear-to-tr from-white via-orange-50 to-orange-100 dark:from-black dark:via-gray-900 dark:to-gray-800 text-black dark:text-white px-4 pt-[6rem] md:pt-[7rem]'>
//       {/* Overlay for subtle dark effect */}
//       <div className='absolute inset-0 bg-black/20 dark:bg-black/50 z-0'></div>

//       {/* Hero Content */}
//       <motion.div
//         className='relative z-10 max-w-3xl mx-auto'
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         {/* Main Heading */}
//         <h1 className='text-4xl md:text-6xl font-extrabold leading-tight mb-6'>
//           Unlock Your Potential at{' '}
//           <span className='text-orange-500'>
//             Distinguished Scholars Academy
//           </span>
//         </h1>

//         {/* Subheading */}
//         <p className='text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8'>
//           Where excellence meets opportunity. Join a community of innovators,
//           leaders, and changemakers ready to make a difference in the world.
//         </p>

//         {/* Buttons */}
//         <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Button className='bg-orange-500 text-white px-8 py-4 text-lg font-semibold'>
//               Explore Programs
//             </Button>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Button className='border border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold'>
//               Learn More
//             </Button>
//           </motion.div>
//         </div>

//         {/* Key Benefits Cards */}
//         <motion.div
//           className='mt-10 flex flex-col md:flex-row gap-4 text-left max-w-4xl mx-auto'
//           initial='hidden'
//           whileInView='visible'
//           viewport={{ once: true }}
//           transition={{ staggerChildren: 0.2 }}
//         >
//           {[
//             {
//               title: 'Expert Faculty',
//               desc: 'Learn from experienced educators and industry leaders guiding you every step.',
//             },
//             {
//               title: 'Innovative Programs',
//               desc: 'Cutting-edge courses designed to equip you with skills for tomorrow’s world.',
//             },
//             {
//               title: 'Vibrant Community',
//               desc: 'Connect, collaborate, and grow with like-minded peers and mentors.',
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               className='bg-white/30 dark:bg-black/40 rounded-lg p-6 flex-1 shadow hover:shadow-lg transition'
//               variants={cardVariants}
//               whileHover={{ scale: 1.05 }}
//             >
//               <h3 className='font-semibold text-orange-500'>{item.title}</h3>
//               <p className='mt-2 text-gray-800 dark:text-gray-300'>
//                 {item.desc}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Call-to-Action */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//         >
//           <Button className='mt-10 bg-orange-500 text-white px-8 py-4 rounded-md text-lg font-semibold hover:scale-105 transition-transform'>
//             Enroll Today
//           </Button>
//         </motion.div>
//       </motion.div>
//     </section>
//   )
// }
