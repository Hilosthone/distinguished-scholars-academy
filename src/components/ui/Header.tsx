'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { navName: 'Courses', href: '#courses' },
    { navName: 'About Us', href: '#about' },
    { navName: 'Blog', href: '#blog' },
    { navName: 'Scholarship', href: '#scholarship' },
  ]

  return (
    <header className='fixed top-0 w-full bg-transparent shadow-sm z-50'>
      <div className='container mx-auto flex justify-between items-center px-6 py-4'>
        {/* Logo */}
        <Link href='/' className='text-2xl font-bold text-[#002EFF]'>
          Distinguished <span className='text-[#FCB900]'>Scholars</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-8 text-black font-semibold'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='hover:text-[#002EFF] transition'
            >
              {link.navName}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className='hidden md:flex space-x-4'>
          <Link href='/login' className='text-black font-bold py-2'> 
            Log In
          </Link>
          <Link
            href='/signup'
            className='bg-[#002EFF] text-white px-4 py-2 font-bold rounded-lg hover:bg-[#FCB900] hover:text-black transition'
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className='md:hidden text-[#002EFF]'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='md:hidden bg-gray-50 shadow-md'
        >
          <nav className='flex flex-col space-y-4 px-6 py-4 text-center font-bold'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className='hover:text-[#002EFF] transition'
              >
                {link.navName}
              </Link>
            ))}

            <Link
              href='/login'
              onClick={() => setIsOpen(false)}
              className='text-[#002EFF] font-bold hover:text-black'
            >
              Log In
            </Link>

            <Link
              href='/signup'
              onClick={() => setIsOpen(false)}
              className='bg-[#002EFF] text-white py-2 rounded-lg font-bold hover:bg-[#FCB900] hover:text-black transition'
            >
              Sign Up
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}