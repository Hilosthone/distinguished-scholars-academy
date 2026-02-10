'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShieldCheck,
  Lock,
  User,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  ChevronLeft,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface InputFieldProps {
  label: string
  icon: React.ElementType
  type: string
  placeholder: string
  onChange: (val: string) => void
}

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (
      values.username === 'admin' &&
      values.email === 'admin@dsa.com' &&
      values.password === 'dsaadminpass'
    ) {
      // --- THE CRITICAL FIX ---
      // We must set the role so the Admin Dashboard allows us in!
      localStorage.setItem('user_role', 'super_admin')

      // Redirect to dashboard
      router.push('/admin')
    } else {
      setError('Invalid authorization credentials.')
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden'>
      {/* Background Glow */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]' />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]' />
      </div>

      <motion.div layout className='w-full max-w-md z-10'>
        <div className='text-center mb-8'>
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0.8 }}
            className='inline-flex p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-4'
          >
            <ShieldCheck size={40} className='text-blue-500' />
          </motion.div>
          <h1 className='text-2xl font-black text-white tracking-tight italic uppercase'>
            Central Command
          </h1>
          <p className='text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2'>
            Authorized Personnel Only
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl'
        >
          <form onSubmit={handleLogin} className='space-y-5'>
            <InputField
              label='Username'
              icon={User}
              type='text'
              placeholder='admin'
              onChange={(val) => setValues({ ...values, username: val })}
            />
            <InputField
              label='Admin Email'
              icon={Mail}
              type='email'
              placeholder='admin@dsa.com'
              onChange={(val) => setValues({ ...values, email: val })}
            />
            <InputField
              label='Security Key'
              icon={Lock}
              type='password'
              placeholder='••••••••••••'
              onChange={(val) => setValues({ ...values, password: val })}
            />

            {error && <ErrorBox message={error} />}

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20'
            >
              {loading ? (
                <Loader2 className='animate-spin' size={18} />
              ) : (
                <>
                  Validate Access <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='mt-8 text-center'
        >
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[11px] font-black uppercase tracking-widest group'
          >
            <ChevronLeft
              size={14}
              className='group-hover:-translate-x-1 transition-transform'
            />
            Back to DSA Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

function InputField({
  label,
  icon: Icon,
  type,
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <div className='space-y-2'>
      <label className='text-[10px] font-black text-slate-500 uppercase ml-1'>
        {label}
      </label>
      <div className='relative'>
        <Icon
          className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-600'
          size={16}
        />
        <input
          type={type}
          required
          placeholder={placeholder}
          className='w-full bg-slate-950 border border-slate-800 rounded-2xl px-11 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-700 transition-all focus:border-blue-500/50'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      </div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-bold'
    >
      <AlertCircle size={14} /> {message}
    </motion.div>
  )
}
