'use client'
import { FacebookIcon, Instagram, Send } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  const exploreLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Rapid Quiz', href: '#RapidQuiz' },
  ]

  const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ]

  const socialLinks = [
    {
      icon: <FacebookIcon size={20} />,
      href: 'https://www.facebook.com/profile.php?id=100086918049765',
    },
    {
      icon: <Instagram size={20} />,
      href: 'https://www.instagram.com/dsa_tutelage',
    },
    {
      icon: <Send size={20} />,
      href: 'https://t.me/joinchat/EalrMZQfTGY0MzQ0',
    },
  ]

  return (
    <footer className='w-full py-12 bg-black text-[#f2f6ff]'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8'>
        <div>
          <h3 className='font-bold text-lg'>Distinguished Scholars Academy</h3>
          <p className='text-[#f2f6ff] mt-3'>
            We help you learn the right way, fast and effectively.
          </p>
        </div>

        <div>
          <h4 className='font-semibold'>Explore</h4>
          <ul className='mt-2 space-y-2'>
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='hover:text-[#FCB900] transition'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className='font-semibold'>Legal</h4>
          <ul className='mt-2 space-y-2'>
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='hover:text-[#FCB900] transition'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className='font-semibold'>Newsletter</h4>
          <input
            type='email'
            className='w-full px-4 py-2 rounded mt-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#002EFF]'
            placeholder='Enter Email'
          />
          <button className='mt-3 w-full px-4 py-2 bg-[#FCB900] text-black font-semibold rounded hover:bg-[#002EFF] hover:text-white transition'>
            Subscribe
          </button>
        </div>
      </div>

      <div className='max-w-6xl mx-auto pt-10 px-6 flex flex-col md:flex-row items-center justify-between'>
        <p className='text-[#f2f6ff] text-center md:text-left'>
          © <time dateTime={String(year)}>{year}</time>{' '}
          <span className='font-semibold'>Distinguished Scholars Academy</span>.
          All rights reserved.
        </p>

        <div className='flex space-x-4 mt-4 md:mt-0'>
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#f2f6ff] hover:text-[#FCB900] transition'
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
