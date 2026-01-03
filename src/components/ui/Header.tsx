'use client'

import { useState, useEffect, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import DSALogo from '../../imges/DSA_2026_WASSCE_WORKSHOP.png'

const navLinks = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'programs', name: 'Programs', href: '#programs' },
  { id: 'tutors', name: 'Tutors', href: '#tutors' },
  { id: 'RapidQuiz', name: 'Rapid Quiz', href: '#RapidQuiz' },
  { id: 'contact', name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((link) => document.getElementById(link.id))
      const scrollPosition = window.scrollY + 150

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-6 lg:px-8'>
      <header
        className={`mx-auto max-w-7xl transition-all duration-500 ease-in-out relative
        ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,46,255,0.12)] py-2 rounded-2xl md:rounded-3xl border border-white/20'
            : 'bg-transparent py-4 rounded-none'
        }`}
      >
        {/* Progress Bar */}
        {scrolled && (
          <motion.div className='absolute bottom-0 left-6 right-6 h-0.5 bg-[#002EFF]/10 overflow-hidden rounded-full'>
            <motion.div className='h-full bg-[#002EFF]' style={{ scaleX }} />
          </motion.div>
        )}

        <div className='px-4 md:px-6 flex items-center justify-between'>
          {/* Logo Section */}
          <Link
            href='/'
            className='flex items-center gap-2 md:gap-3 group transition-transform hover:scale-[1.02] shrink-0'
          >
            <div className='relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14'>
              <Image
                src={DSALogo}
                alt='DSA Logo'
                fill
                className='object-contain'
                priority
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-[#002EFF] font-black text-base md:text-lg lg:text-xl leading-none tracking-tighter'>
                DISTINGUISHED
              </span>
              <span className='text-gray-500 font-bold text-[8px] md:text-[10px] lg:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase'>
                Scholars Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile, Visible on MD+ */}
          <nav className='hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl lg:rounded-2xl border border-gray-200/50'>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`px-3 lg:px-4 py-2 rounded-lg lg:rounded-xl text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${
                    activeSection === link.id
                      ? 'bg-white text-[#002EFF] shadow-sm ring-1 ring-black/5'
                      : 'text-gray-500 hover:text-black hover:bg-white/50'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className='flex items-center gap-2 md:gap-4'>
            {/* "Enrol Now" now visible on MD (Tablets) and LG (Desktops) */}
            <Link
              href='https://wa.link/7wim2w'
              target='_blank'
              rel='noopener noreferrer'
              className='hidden md:flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-[#002EFF] text-white rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest hover:bg-blue-600 hover:shadow-[0_10px_20px_rgba(0,46,255,0.2)] transition-all active:scale-95 group shrink-0'
            >
              Enrol Now
              <ArrowRight
                size={14}
                className='group-hover:translate-x-1 transition-transform'
              />
            </Link>

            {/* Mobile menu button - Only visible on SM */}
            <button
              onClick={() => setOpen(true)}
              className='md:hidden p-2.5 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all'
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className='fixed inset-0 bg-[#002EFF]/10 backdrop-blur-md md:hidden'
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl p-6 md:p-8 z-50 flex flex-col rounded-l-[30px] md:rounded-l-[40px]'
            >
              <div className='flex justify-between items-center mb-8'>
                <span className='font-black text-[#002EFF] tracking-widest text-sm'>
                  MENU
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className='p-2.5 bg-gray-100 rounded-xl text-gray-500'
                >
                  <X size={22} />
                </button>
              </div>

              <div className='flex flex-col gap-2'>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    className={`text-lg font-black p-4 rounded-2xl transition-all flex justify-between items-center
                      ${
                        activeSection === link.id
                          ? 'bg-[#002EFF] text-white shadow-xl shadow-blue-200'
                          : 'text-gray-400 hover:bg-gray-50'
                      }
                    `}
                  >
                    {link.name}
                    {activeSection === link.id && <ArrowRight size={18} />}
                  </a>
                ))}

                <Link
                  href='https://wa.link/7wim2w'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-6 px-5 py-5 bg-[#FCB900] text-black rounded-2xl text-center font-black text-base shadow-xl shadow-yellow-100 active:scale-95 transition flex items-center justify-center gap-2'
                >
                  ENROL NOW
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}