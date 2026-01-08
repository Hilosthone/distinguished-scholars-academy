'use client'
import { useState, useEffect } from 'react'
import { Facebook, Instagram, Send, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const [year, setYear] = useState<number | string>('2026')

  useEffect(() => {
    setMounted(true)
    setYear(new Date().getFullYear())
  }, [])

  const exploreLinks = [
    { name: 'Programs', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Rapid Quiz', href: '#RapidQuiz' },
    { name: 'FAQs', href: '#faq' },
  ]

  const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      href: 'https://www.facebook.com/profile.php?id=100086918049765',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={18} />,
      href: 'https://www.instagram.com/dsa_tutelage',
    },
    {
      name: 'Telegram',
      icon: <Send size={18} />,
      href: 'https://t.me/joinchat/EalrMZQfTGY0MzQ0',
    },
  ]

  if (!mounted) return null

  return (
    <footer className='w-full bg-[#0a0e1a] text-gray-400 pt-16 pb-8 relative overflow-hidden'>
      {/* REPEATING FORMULA PATTERN */}
      <div className='absolute inset-0 opacity-[0.07] pointer-events-none'>
        <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern
              id='formula-pattern'
              x='0'
              y='0'
              width='300'
              height='300'
              patternUnits='userSpaceOnUse'
            >
              <text x='20' y='50' fill='white' fontSize='12' fontFamily='serif'>
                E=mc²
              </text>
              <text
                x='180'
                y='80'
                fill='white'
                fontSize='10'
                fontFamily='serif'
              >
                H₂O
              </text>
              <text
                x='80'
                y='150'
                fill='white'
                fontSize='12'
                fontFamily='serif'
              >
                πr²
              </text>
              <text
                x='220'
                y='180'
                fill='white'
                fontSize='11'
                fontFamily='serif'
              >
                F=ma
              </text>
              <text
                x='40'
                y='240'
                fill='white'
                fontSize='10'
                fontFamily='serif'
              >
                PV=nRT
              </text>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#formula-pattern)' />
        </svg>
      </div>

      <div className='max-w-7xl mx-auto px-6 md:px-12 relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5'>
          {/* BRAND COLUMN */}
          <div className='space-y-5'>
            <h3 className='text-white font-black text-lg tracking-tight uppercase'>
              Distinguished <span className='text-[#002EFF]'>Scholars</span>{' '}
              Academy
            </h3>
            <p className='text-xs leading-relaxed max-w-sm'>
              Empowering students with the right skills, speed, and confidence
              to dominate national exams and secure university admissions.
            </p>
            <div className='space-y-2.5'>
              <div className='flex items-center gap-3 text-[13px]'>
                <Phone size={14} className='text-[#FCB900]' />
                <span className='hover:text-white transition-colors'>
                  +234 906 186 4717
                </span>
              </div>
              <div className='flex items-center gap-3 text-[13px]'>
                <Mail size={14} className='text-[#FCB900]' />
                <span className='hover:text-white transition-colors'>
                  dsatutelage@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-5 uppercase tracking-widest text-[10px]'>
              Explore
            </h4>
            <ul className='space-y-3'>
              {exploreLinks.map((link) => (
                <li key={`explore-${link.name}`}>
                  <Link
                    href={link.href}
                    className='text-[13px] hover:text-[#FCB900] transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-5 uppercase tracking-widest text-[10px]'>
              Legal
            </h4>
            <ul className='space-y-3'>
              {legalLinks.map((link) => (
                <li key={`legal-${link.name}`}>
                  <Link
                    href={link.href}
                    className='text-[13px] hover:text-[#FCB900] transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-5 uppercase tracking-widest text-[10px]'>
              Newsletter
            </h4>
            <p className='text-[13px] mb-4'>
              Subscribe for exam updates and study tips.
            </p>
            <form className='space-y-2' onSubmit={(e) => e.preventDefault()}>
              <input
                type='email'
                required
                className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#002EFF] transition-all'
                placeholder='Email Address'
              />
              <button
                type='submit'
                className='w-full py-2.5 bg-[#002EFF] text-white font-bold rounded-lg hover:bg-[#FCB900] hover:text-black transition-all text-xs uppercase'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='pt-8 flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-[11px] text-gray-500 text-center md:text-left leading-relaxed'>
            © {year}{' '}
            <span className='text-gray-300 font-semibold'>
              Distinguished Scholars Academy
            </span>
            .
            <br className='md:hidden' /> Built for excellence. All rights
            reserved.
          </p>

          <div className='flex items-center gap-3'>
            {socialLinks.map((social) => (
              <a
                key={`social-${social.name}`}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-[#FCB900] hover:text-black transition-all shadow-sm'
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
