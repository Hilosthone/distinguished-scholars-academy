// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { Menu, X } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false)

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About', href: '#about' },
//     { name: 'Programs', href: '#programs' },
//     { name: 'Gallery', href: '#gallery' },
//     { name: 'Contact', href: '#contact' },
//   ]

//   return (
//     <header className='sticky top-0 left-0 w-full bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 backdrop-blur-lg border-b border-white/10 z-50'>
//       <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
//         {/* Logo / Brand */}
//         <Link
//           href='/'
//           className='text-xl md:text-2xl font-bold text-white tracking-wide'
//         >
//           Distinguished Scholars <span className='text-blue-400'>Academy</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className='hidden md:flex items-center space-x-8'>
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className='text-gray-200 hover:text-blue-400 transition-colors font-medium'
//             >
//               {link.name}
//             </Link>
//           ))}
//           <Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-md'>
//             Enroll Now
//           </Button>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className='md:hidden text-gray-100'
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label='Toggle menu'
//         >
//           {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className='md:hidden bg-linear-to-tr from-gray-900 via-gray-800 to-blue-900 backdrop-blur-md border-t border-gray-700'>
//           <nav className='flex flex-col items-center py-4 space-y-4'>
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className='text-gray-200 hover:text-blue-400 transition-colors font-medium'
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Button className='bg-blue-600 hover:bg-blue-700 text-white w-3/4'>
//               Enroll Now
//             </Button>
//           </nav>
//         </div>
//       )}
//     </header>
//   )
// }

// src/components/ui/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="text-2xl font-bold text-black dark:text-white">
            Distinguished <span className="text-orange-500">Scholars</span> Academy
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                className="text-gray-800 dark:text-gray-200 font-medium hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          {/* Enroll Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
              Enroll Now
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
                theme === 'light'
                  ? document.documentElement.classList.add('dark')
                  : document.documentElement.classList.remove('dark')
              }}
              className="ml-4 p-2 rounded-md bg-white dark:bg-black text-black dark:text-white hover:opacity-80 transition"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-black dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-black backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-orange-500 text-white w-3/4">Enroll Now</Button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
