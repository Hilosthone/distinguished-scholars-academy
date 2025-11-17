'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DSALogo from '../../imges/DSA.jpg' 

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Tutors', href: '/tutors' },
  { name: 'Watch Us', href: '/watch-us' },
  { name: 'Blog', href: '/blog' },
  { name: 'Free Materials', href: '/materials' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [shadow, setShadow] = useState(false)

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-neutralWhite transition-shadow ${
        shadow ? 'shadow-md' : ''
      }`}
    >
      <div className='max-w-7xl mx-auto px-5 py-4 flex items-center justify-between font-inter'>
        {/* Logo */}
        <Link
          href='/'
          className='text-[#002EFF] flex items-center justify-center font-semibold text-xl tracking-wide'
        >
          <img src={DSALogo.src} alt="DSA Logo" className="h-10 w-auto"/>
          Distinguished Scholars
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8 font-semibold'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-black hover:text-[#002EFF] transition'
            >
              {link.name}
            </Link>
          ))}

          <Link
            href='/enrol'
            className='px-5 py-2 bg-[#002EFF] text-white rounded-xl font-medium hover:bg-opacity-90 transition'
          >
            Enrol Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(true)} className='md:hidden text-black'>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className='fixed top-0 right-0 w-64 h-screen bg-white shadow-xl z-50 p-6'
          >
            {/* Close Button */}
            <button
              className='mb-6 hover:text-[#002EFF] transition'
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Mobile Nav Items */}
            <div className='flex flex-col gap-3 font-semibold font-poppins'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='text-lg text-neutralBlack p-2 rounded hover:bg-[#002EFF] hover:text-white transition'
                >
                  {link.name}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href='/enrol'
                onClick={() => setOpen(false)}
                className='mt-1 px-5 py-2 bg-[#002EFF] text-white rounded-xl text-center font-medium hover:bg-blue-600 transition'
              >
                Enrol Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
