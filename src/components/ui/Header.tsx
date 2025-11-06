'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className='
        sticky top-0 left-0 w-full bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 bg-transparent backdrop-blur-lg border-b border-white/10 z-50'
    >
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
        {/* Logo / Brand */}
        <Link
          href='/'
          className='text-xl md:text-2xl font-bold text-white tracking-wide'
        >
          Distinguished Scholars <span className='text-blue-400'>Academy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='text-gray-200 hover:text-blue-400 transition-colors font-medium'
            >
              {link.name}
            </Link>
          ))}
          <Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-md'>
            Enroll Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-gray-100'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className='md:hidden bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 backdrop-blur-md border-t border-gray-700'>
          <nav className='flex flex-col items-center py-4 space-y-4'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className='text-gray-200 hover:text-blue-400 transition-colors font-medium'
              >
                {link.name}
              </Link>
            ))}
            <Button className='bg-blue-600 hover:bg-blue-700 text-white w-3/4'>
              Enroll Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
