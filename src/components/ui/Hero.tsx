// 'use client'

// import { motion } from 'framer-motion'
// import { ArrowRight, Play } from 'lucide-react'
// import Image from 'next/image'
// import Hero01 from '../../imges/hero-0.jpeg'
// import Hero02 from '../../imges/hero-2.jpg'
// import Hero03 from '../../imges/hero-3.jpg'

// export default function Hero() {
//   return (
//     <section className='w-full py-24 bg-dsaWhite'>
//       <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6'>
//         {/* LEFT TEXT */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <h1 className='text-5xl md:text-6xl font-bold text-black leading-tight'>
//             Distinguished <br />
//             <span className='text-[#002EFF]'>Scholars Academy</span>
//           </h1>
//           <p className='text-lg text-black/70 mt-4 max-w-md'>
//             “The more that you learn, the more things you will know. The deeper
//             you grow, the farther you go — and we help you do that.”
//           </p>
//           <div className='flex items-center gap-4 mt-6'>
//             {/* Primary Button */}
//             <button className='flex items-center gap-2 px-6 py-3 bg-[#002EFF] text-white rounded-lg font-semibold transition hover:bg-blue-800 hover:text-white hover:border hover:border-yellow-500'>
//               Get Started
//               <ArrowRight size={20} />
//             </button>

//             {/* Outline Button with Yellow Hover */}
//             <button className='flex items-center gap-2 px-6 py-3 border border-[#002EFF] text-[#002EFF] rounded-lg font-semibold transition hover:bg-[#FCB900] hover:text-black hover:border hover:border-black'>
//               <Play size={20} />
//               Watch Video
//             </button>
//           </div>
//         </motion.div>

//         {/* RIGHT IMAGE SECTION */}
//         {/* RIGHT IMAGE SECTION */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//           className='relative flex justify-center'
//         >
//           {/* MAIN YELLOW CIRCLE */}
//           <div className='w-72 h-72 md:w-80 md:h-80 bg-[#FCB900] rounded-full flex items-center justify-center shadow-xl  sm:pt-6'>
//             <Image
//               src={Hero01}
//               width={260}
//               height={260}
//               className='rounded-full object-cover'
//               alt='Main Students'
//             />
        
//             {/* BLUE AND YELLOW SMALL CIRCLES */}
//             <div className='absolute -top-6 -left-6 w-8 h-8 md:w-10 md:h-10 bg-[#002EFF] rounded-full opacity-80 animate-bounce-slow'></div>
//             <div className='absolute -top-4 right-8 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
//             <div className='absolute bottom-10 -right-6 w-10 h-10 md:w-12 md:h-12 bg-[#002EFF] rounded-full opacity-70 animate-bounce-slow'></div>
//             <div className='absolute bottom-0 left-10 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
//           </div>

//           {/* FLOATING SMALL IMAGES */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className='absolute left-0 top-6'
//           >
//             <Image
//               src={Hero02}
//               width={85}
//               height={85}
//               className='rounded-full border-4 border-white shadow-md'
//               alt='Student 1'
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//             className='absolute left-0 bottom-0'
//           >
//             <Image
//               src={Hero03}
//               width={110}
//               height={110}
//               className='rounded-full border-4 border-white shadow-md'
//               alt='Student 2'
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

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
          {/* HEADLINE */}
          <h1 className='text-3xl md:text-4xl font-bold text-black leading-tight'>
            Empowering Students to <br />
            <span className='text-[#002EFF]'>Excel in UTME & WAEC</span>
          </h1>

          {/* SUB-TEXT */}
          <p className='text-lg text-black/70 mt-4 max-w-md'>
            Join thousands of students learning faster, scoring higher, and
            building academic confidence with the DSA learning system.
          </p>

          {/* BUTTONS */}
          <div className='flex items-center gap-4 mt-6'>
            {/* Start Learning */}
            <button className='flex items-center gap-2 px-6 py-3 bg-[#002EFF] text-white rounded-lg font-semibold transition hover:bg-blue-800 hover:text-white'>
              Start Learning
              <ArrowRight size={20} />
            </button>

            {/* Join Free Classes */}
            <button className='flex items-center gap-2 px-6 py-3 border border-[#002EFF] text-[#002EFF] rounded-lg font-semibold transition hover:bg-[#FCB900] hover:text-black hover:border-black'>
              <Play size={20} />
              Join Free Classes
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className='relative flex justify-center'
        >
          {/* MAIN YELLOW CIRCLE */}
          <div className='w-72 h-72 md:w-80 md:h-80 bg-[#FCB900] rounded-full flex items-center justify-center shadow-xl sm:pt-6'>
            <Image
              src={Hero01}
              width={260}
              height={260}
              className='rounded-full object-cover'
              alt='Main Students'
            />

            {/* DECORATIVE CIRCLES */}
            <div className='absolute -top-6 -left-6 w-8 h-8 md:w-10 md:h-10 bg-[#002EFF] rounded-full opacity-80 animate-bounce-slow'></div>
            <div className='absolute -top-4 right-8 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
            <div className='absolute bottom-10 -right-6 w-10 h-10 md:w-12 md:h-12 bg-[#002EFF] rounded-full opacity-70 animate-bounce-slow'></div>
            <div className='absolute bottom-0 left-10 w-6 h-6 md:w-8 md:h-8 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
          </div>

          {/* FLOATING IMAGES */}
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
