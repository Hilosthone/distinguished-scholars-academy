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
    <header className='fixed top-0 w-full bg-white shadow-sm z-50'>
      <div className='container mx-auto flex justify-between items-center px-6 py-4'>
        {/* Logo */}
        <Link href='/' className='text-2xl font-bold text-[#002EFF]'>
          Distinguished <span className='text-[#FCB900]'>Scholars</span> Academy
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-8 text-black font-medium'>
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
          className='md:hidden bg-white shadow-md'
        >
          <nav className='flex flex-col space-y-4 px-6 py-4 text-center font-medium'>
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
              className='text-[#002EFF] font-medium'
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

// // src/components/ui/Header.tsx
// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { Menu, X, Sun, Moon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [theme, setTheme] = useState<'light' | 'dark'>('light')

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About', href: '#about' },
//     { name: 'Programs', href: '#programs' },
//     { name: 'Gallery', href: '#gallery' },
//     { name: 'Contact', href: '#contact' },
//   ]

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Link href="/" className="text-2xl font-bold text-black dark:text-white">
//             Distinguished <span className="text-orange-500">Scholars</span> Academy
//           </Link>
//         </motion.div>

//         {/* Desktop Nav */}
//         <motion.nav
//           className="hidden md:flex items-center space-x-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, staggerChildren: 0.1 }}
//         >
//           {navLinks.map((link, i) => (
//             <motion.div
//               key={link.name}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + i * 0.1 }}
//             >
//               <Link
//                 href={link.href}
//                 className="text-gray-800 dark:text-gray-200 font-medium hover:text-orange-500 transition-colors"
//               >
//                 {link.name}
//               </Link>
//             </motion.div>
//           ))}

//           {/* Enroll Button */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//           >
//             <Button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
//               Enroll Now
//             </Button>
//           </motion.div>

//           {/* Theme Toggle */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9 }}
//           >
//             <button
//               onClick={() => {
//                 setTheme(theme === 'light' ? 'dark' : 'light')
//                 theme === 'light'
//                   ? document.documentElement.classList.add('dark')
//                   : document.documentElement.classList.remove('dark')
//               }}
//               className="ml-4 p-2 rounded-md bg-white dark:bg-black text-black dark:text-white hover:opacity-80 transition"
//             >
//               {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
//             </button>
//           </motion.div>
//         </motion.nav>

//         {/* Mobile Menu Button */}
//         <motion.button
//           className="md:hidden text-black dark:text-white"
//           onClick={() => setIsOpen(!isOpen)}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </motion.button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <motion.div
//           className="md:hidden bg-white dark:bg-black backdrop-blur-md border-t border-gray-200 dark:border-gray-700"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <nav className="flex flex-col items-center py-4 space-y-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Button className="bg-orange-500 text-white w-3/4">Enroll Now</Button>
//           </nav>
//         </motion.div>
//       )}
//     </header>
//   )
// }
