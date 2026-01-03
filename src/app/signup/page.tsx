'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // This 'full_name' is what your SQL trigger uses!
        data: { full_name: formData.name },
      },
    })

    if (error) {
      setMsg({ type: 'error', text: error.message })
    } else {
      setMsg({
        type: 'success',
        text: 'Registration successful! Check your email for a verification link.',
      })
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-10 rounded-[40px] shadow-xl max-w-md w-full border border-gray-100'
      >
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-black text-[#002EFF] mb-2'>
            JOIN DSA ACADEMY
          </h1>
          <p className='text-gray-400 font-medium'>
            Create your student portal account
          </p>
        </div>

        <form onSubmit={handleSignUp} className='space-y-4'>
          <div className='relative'>
            <User
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Full Name'
              required
              className='w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#002EFF] rounded-2xl outline-none transition-all font-bold'
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className='relative'>
            <Mail
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='email'
              placeholder='Email Address'
              required
              className='w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#002EFF] rounded-2xl outline-none transition-all font-bold'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className='relative'>
            <Lock
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='password'
              placeholder='Create Password'
              required
              className='w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#002EFF] rounded-2xl outline-none transition-all font-bold'
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {msg.text && (
            <div
              className={`p-4 rounded-xl text-sm font-bold ${
                msg.type === 'error'
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-600'
              }`}
            >
              {msg.text}
            </div>
          )}

          <button
            disabled={loading}
            className='w-full py-5 bg-[#002EFF] text-white font-black rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100'
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <>
                REGISTER NOW <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className='mt-8 text-center text-gray-400 font-bold text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='text-[#002EFF] hover:underline'>
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
