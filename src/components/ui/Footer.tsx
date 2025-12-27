'use client'
import { Facebook, Instagram, Send, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

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
      icon: <Facebook size={20} />,
      href: 'https://www.facebook.com/profile.php?id=100086918049765',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      href: 'https://www.instagram.com/dsa_tutelage',
    },
    {
      name: 'Telegram',
      icon: <Send size={20} />,
      href: 'https://t.me/joinchat/EalrMZQfTGY0MzQ0',
    },
  ]

  return (
    <footer className='w-full bg-[#050505] text-gray-400 pt-20 pb-10'>
      <div className='max-w-7xl mx-auto px-10 md:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10'>
          {/* BRAND COLUMN */}
          <div className='space-y-6'>
            <h3 className='text-white font-extrabold text-xl tracking-tighter'>
              DISTINGUISHED <span className='text-[#002EFF]'>SCHOLARS</span>{' '}
              ACADEMY
            </h3>
            <p className='text-sm leading-relaxed'>
              Empowering students with the right skills, speed, and confidence
              to dominate national exams and secure university admissions.
            </p>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-sm'>
                <Phone size={16} className='text-[#FCB900]' />
                <span>+234 (0) 810 000 0000</span>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Mail size={16} className='text-[#FCB900]' />
                <span>info@dsatutelage.com</span>
              </div>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-widest text-xs'>
              Explore
            </h4>
            <ul className='space-y-4'>
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm hover:text-[#FCB900] transition-colors duration-300'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-widest text-xs'>
              Legal
            </h4>
            <ul className='space-y-4'>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm hover:text-[#FCB900] transition-colors duration-300'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div>
            <h4 className='text-white font-bold mb-6 uppercase tracking-widest text-xs'>
              Stay Updated
            </h4>
            <p className='text-sm mb-4'>
              Subscribe to get exam updates and study tips.
            </p>
            <form className='relative' onSubmit={(e) => e.preventDefault()}>
              <input
                type='email'
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#002EFF] transition-all'
                placeholder='Your Email Address'
              />
              <button className='mt-3 w-full py-3 bg-[#002EFF] text-white font-bold rounded-xl hover:bg-[#FCB900] hover:text-black transition-all duration-300'>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='pt-10 flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-xs text-gray-500 text-center md:text-left leading-relaxed'>
            © {year}{' '}
            <span className='text-gray-300 font-semibold'>
              Distinguished Scholars Academy
            </span>
            . <br className='md:hidden' />
            Built for excellence. All rights reserved.
          </p>

          <div className='flex items-center gap-4'>
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
                className='w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-[#FCB900] hover:text-black transition-all duration-300 shadow-xl'
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
