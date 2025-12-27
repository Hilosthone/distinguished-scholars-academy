'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DSALogo from '../../imges/DSA_2026_WASSCE_WORKSHOP.png'

const navLinks = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'programs', name: 'Programs', href: '#programs' },
  { id: 'tutors', name: 'Tutors', href: '#tutors' },
  { id: 'RapidQuiz', name: 'Rapid Quiz', href: '#RapidQuiz' },
  { id: 'blog', name: 'Blog', href: '#blog' },
  { id: 'contact', name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [shadow, setShadow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 10
      setShadow(isScrolled)

      const pageContent = document.getElementById('page-content')
      if (pageContent) {
        pageContent.classList.toggle('blur-content', isScrolled)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${shadow ? 'backdrop-blur-md bg-white/70 shadow-md' : 'bg-white/80'}
  `}
    >
      <div className='max-w-7xl mx-auto px-5 py-4 flex items-center justify-between'>
        {/* Logo Section */}
        <Link href='/' className='flex items-center gap-2 group'>
          <Image
            src={DSALogo}
            alt='DSA Logo'
            width={80}
            height={80}
            className='h-20 w-auto object-contain'
            priority // Loads logo immediately
          />

          <div className='flex flex-col leading-tight'>
            <span className='text-[#002EFF] font-extrabold text-2xl'>
              DISTINGUISHED
            </span>
            <span className='text-[#002EFF] font-medium text-sm tracking-wide'>
              SCHOLARS ACADEMY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6 font-semibold'>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className='hover:text-[#002EFF] transition-colors relative after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-[#002EFF] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all'
            >
              {link.name}
            </a>
          ))}

          <Link
            href='https://wa.link/7wim2w'
            target='_blank'
            rel='noopener noreferrer'
            className='px-6 py-2 bg-[#002EFF] text-white rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95'
          >
            Enrol Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(true)}
          className='md:hidden p-2 hover:bg-gray-100 rounded-full transition'
          aria-label='Open Menu'
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className='fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 right-0 w-72 h-screen bg-white shadow-2xl p-6 z-50 flex flex-col'
            >
              <button
                onClick={() => setOpen(false)}
                className='self-end p-2 hover:bg-gray-100 rounded-full mb-4'
              >
                <X size={28} />
              </button>

              <div className='flex flex-col gap-2 font-semibold'>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className='text-lg p-3 rounded-lg hover:bg-blue-50 hover:text-[#002EFF] transition'
                  >
                    {link.name}
                  </a>
                ))}

                <Link
                  href='https://wa.link/7wim2w'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setOpen(false)}
                  className='mt-6 px-5 py-3 bg-[#002EFF] text-white rounded-xl text-center font-bold shadow-md active:scale-95 transition'
                >
                  Enrol Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
