// 'use client'
// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import scholar from '../../imges/hero-3.jpg'

// export default function Testimonial() {
//   return (
//     <section className='w-full py-20 bg-white'>
//       <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center'>
//         {/* IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Image
//             src={scholar}
//             width={350}
//             height={350}
//             alt='student'
//             className='rounded-2xl shadow-lg'
//           />
//         </motion.div>

//         {/* TEXT */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h3 className='text-2xl font-bold text-[#002EFF]'>
//             What our scholars say about us
//           </h3>

//           <p className='text-black mt-4'>
//             Distinguished Scholars Academy helped me master new skills quickly.
//             The lessons are clear, interesting, and flexible.
//           </p>

//           <p className='mt-4 font-semibold text-[#002EFF]'>
//             ⭐⭐⭐⭐⭐ 4.9/5 Rating from 3,000+ students
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import scholar from '../../imges/hero-3.jpg'

export default function Testimonial() {
  return (
    <section className='w-full py-20 bg-white'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center'>
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='relative flex justify-center'
        >
          {/* MAIN IMAGE */}
          <div className='relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]'>
            <Image
              src={scholar}
              width={350}
              height={350}
              alt='student'
              className='rounded-2xl shadow-lg relative z-10'
            />

            {/* BLUE AND YELLOW FLOATING CIRCLES */}
            <div className='absolute -top-6 -left-6 w-6 h-6 md:w-8 md:h-8 bg-[#002EFF] rounded-full opacity-80 animate-bounce-slow'></div>
            <div className='absolute -top-4 right-8 w-5 h-5 md:w-6 md:h-6 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
            <div className='absolute bottom-10 -right-6 w-8 h-8 md:w-10 md:h-10 bg-[#002EFF] rounded-full opacity-70 animate-bounce-slow'></div>
            <div className='absolute bottom-0 left-10 w-5 h-5 md:w-6 md:h-6 bg-[#FCB900] rounded-full opacity-90 animate-pulse'></div>
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className='text-2xl font-bold text-[#002EFF]'>
            What our scholars say about us
          </h3>

          <p className='text-black mt-4'>
            Distinguished Scholars Academy helped me master new skills quickly.
            The lessons are clear, interesting, and flexible.
          </p>

          <p className='mt-4 font-semibold text-[#002EFF]'>
            ⭐⭐⭐⭐⭐ 4.9/5 Rating from 3,000+ students
          </p>
        </motion.div>
      </div>
    </section>
  )
}
