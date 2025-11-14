"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import WAEC from '../../imges/waec.jpeg'
import NECO from '../../imges/neco.jpeg'
import JAMB from '../../imges/jamb.jpeg'
import SEC from '../../imges/secondary-school.jpeg'
import JUPEB from '../../imges/jupeb.jpeg'
import BECE from '../../imges/bece.jpeg'


const courses = [
  {
    name: 'WAEC Tutorial Classes',
    price: '₦25,000',
    img: WAEC,
  },
  {
    name: 'NECO Tutorial Program',
    price: '₦22,000',
    img: NECO,
  },
  {
    name: 'JAMB (UTME) Intensive Class',
    price: '₦30,000',
    img: JAMB,
  },
  {
    name: 'JUPEB Foundation Programme',
    price: '₦150,000',
    img: JUPEB,
  },
  {
    name: 'SS1–SS3 School Tutorial',
    price: '₦18,000',
    img: SEC,
  },
  {
    name: 'BECE / Junior WAEC Coaching',
    price: '₦15,000',
    img: BECE,
  },
]

export default function Courses() {
  return (
    <section className='w-full py-20 bg-[#f2f6ff]'>
      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-3xl font-bold text-[#002EFF] text-center'>
          Popular Courses
        </h2>

        <div className='grid md:grid-cols-3 gap-8 mt-10'>
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='bg-white shadow-lg rounded-xl overflow-hidden border'
            >
              <Image
                src={course.img}
                width={500}
                height={300}
                alt={course.name}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-[#002EFF]'>
                  {course.name}
                </h3>
                <p className='text-black mt-2 font-medium'>{course.price}</p>
                <button className='mt-4 px-4 py-2 bg-[#FCB900] text-white rounded-lg hover:bg-[#e6ac00]'>
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
