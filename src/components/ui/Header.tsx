'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DSALogo from '../../imges/DSA.jpg'

const navLinks = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'programs', name: 'Programs', href: '#programs' },
  { id: 'tutors', name: 'Tutors', href: '#tutors' },
  { id: 'watch', name: 'Watch Us', href: '#watch-us' },
  { id: 'blog', name: 'Blog', href: '#blog' },
  { id: 'materials', name: 'Free Materials', href: '#materials' },
  { id: 'contact', name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [shadow, setShadow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShadow(window.scrollY > 10)

      const pageContent = document.getElementById('page-content')
      if (pageContent) {
        if (window.scrollY > 10) {
          pageContent.classList.add('blur-content')
        } else {
          pageContent.classList.remove('blur-content')
        }
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow  duration-300
    ${shadow ? 'backdrop-blur-md bg-white/30 shadow-md' : 'bg-white/80'}
  `}
    >
      <div className='max-w-7xl mx-auto px-5 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-[#002EFF] flex items-center gap-2 font-bold text-xl'
        >
          <img src={DSALogo.src} alt='DSA Logo' className='h-15 w-auto' />
          Distinguished <br />
          Scholars Academy
        </Link>

        {/* Desktop */}
        <nav className='hidden md:flex items-center gap-7 font-semibold'>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className='hover:text-[#002EFF] transition'
            >
              {link.name}
            </a>
          ))}

          <Link
            href='/enrol'
            className='px-5 py-2 bg-[#002EFF] text-white rounded-xl hover:bg-opacity-90 transition'
          >
            Enrol Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(true)} className='md:hidden'>
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
            transition={{ duration: 0.35 }}
            className='fixed top-0 right-0 w-64 h-screen bg-white shadow-xl p-6 z-50'
          >
            <button onClick={() => setOpen(false)} className='mb-6'>
              <X size={28} />
            </button>

            <div className='flex flex-col gap-4 font-semibold'>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='text-lg p-2 rounded hover:bg-[#002EFF] hover:text-white transition'
                >
                  {link.name}
                </a>
              ))}

              <Link
                href='/enrol'
                onClick={() => setOpen(false)}
                className='mt-4 px-5 py-2 bg-[#002EFF] text-white rounded-xl text-center'
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
