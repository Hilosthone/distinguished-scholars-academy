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
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isSuccess, setIsSuccess] = useState(false)
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

    // Simulating secure validation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (
      values.username === 'admin' &&
      values.email === 'admin@dsa.com' &&
      values.password === 'dsaadminpass'
    ) {
      // 1. Sync Client-side state
      localStorage.setItem('user_role', 'super_admin')

      // 2. Set Cookie for Middleware Security
      // SameSite=Lax ensures the cookie is sent on top-level navigations
      document.cookie = 'admin_token=true; path=/; max-age=3600; SameSite=Lax'

      setIsSuccess(true)

      setTimeout(() => {
        router.push('/admin')
      }, 800)
    } else {
      setError('Access Denied: Invalid Authorization Credentials.')
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-1000'>
      {/* Dynamic Background Glow */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <motion.div
          animate={{
            backgroundColor: isSuccess
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(37, 99, 235, 0.1)',
          }}
          className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]'
        />
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]' />
      </div>

      <motion.div layout className='w-full max-w-md z-10'>
        <div className='text-center mb-8'>
          <motion.div
            animate={isSuccess ? { scale: 1.1, rotate: 360 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`inline-flex p-4 rounded-3xl bg-slate-900 border ${isSuccess ? 'border-emerald-500/50 shadow-emerald-500/20' : 'border-slate-800 shadow-blue-500/10'} shadow-2xl mb-4 transition-all duration-500`}
          >
            {isSuccess ? (
              <CheckCircle2 size={40} className='text-emerald-500' />
            ) : (
              <ShieldCheck size={40} className='text-blue-500' />
            )}
          </motion.div>
          <h1 className='text-2xl font-black text-white tracking-tight italic uppercase'>
            {isSuccess ? 'Access Granted' : 'Central Command'}
          </h1>
          <p className='text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2'>
            {isSuccess
              ? 'Redirecting to secure terminal...'
              : 'Authorized Personnel Only'}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative'
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

            <AnimatePresence mode='wait'>
              {error && <ErrorBox key='error' message={error} />}
            </AnimatePresence>

            <button
              type='submit'
              disabled={loading || isSuccess}
              className={`w-full ${isSuccess ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'} disabled:bg-slate-800 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95`}
            >
              {loading ? (
                <Loader2 className='animate-spin' size={18} />
              ) : isSuccess ? (
                'System Initialized'
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

// --- HELPER COMPONENTS ---

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
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className='flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-bold overflow-hidden'
    >
      <AlertCircle size={14} className='shrink-0' /> {message}
    </motion.div>
  )
}
