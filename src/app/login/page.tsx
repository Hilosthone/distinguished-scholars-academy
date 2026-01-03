'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // SIMULATED LOGIN LOGIC (No Supabase)
    setTimeout(() => {
      setLoading(false)

      if (password.length < 4) {
        setError('Password must be at least 4 characters.')
        return
      }

      // Demo Routing Logic
      if (email.toLowerCase() === 'admin@dsa.com') {
        router.push('/admin')
      } else {
        router.push('/rapid-quiz')
      }
    }, 1500)
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6 font-sans'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='bg-white p-10 rounded-[40px] shadow-xl max-w-md w-full border border-gray-100'
      >
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-black text-[#002EFF] mb-2 tracking-tighter'>
            WELCOME BACK
          </h1>
          <p className='text-gray-400 font-bold uppercase text-[10px] tracking-widest'>
            DSA Student Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-4'>
          {/* Email */}
          <div className='relative'>
            <Mail
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='email'
              placeholder='Email Address'
              required
              className='w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#002EFF] rounded-2xl outline-none font-bold text-gray-800'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className='relative'>
            <Lock
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='password'
              placeholder='Password'
              required
              className='w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#002EFF] rounded-2xl outline-none font-bold text-gray-800'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className='p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2'
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <button
            disabled={loading}
            className='w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-50'
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <>
                LOG IN <LogIn size={20} />
              </>
            )}
          </button>
        </form>

        <p className='mt-8 text-center text-gray-400 font-bold text-sm'>
          New here?{' '}
          <Link href='/signup' className='text-[#002EFF] hover:underline'>
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}