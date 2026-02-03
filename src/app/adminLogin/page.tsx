'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShieldCheck,
  Lock,
  User,
  Mail,
  ArrowRight,
  Fingerprint,
  AlertCircle,
  Smartphone,
  KeyRound,
  Loader2,
  Clock,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InputFieldProps {
  label: string
  icon: React.ElementType
  type: string
  placeholder: string
  onChange: (val: string) => void
}

export default function AdminLogin() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // --- Inactivity Logic (5 Minutes) ---
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // 5 minutes = 300,000ms
    timeoutRef.current = setTimeout(() => {
      if (step === 2) {
        setStep(1)
        setError('Session expired due to inactivity.')
        setOtp(['', '', '', '', '', ''])
      }
    }, 300000)
  }, [step])

  useEffect(() => {
    // Track mouse movement or keypresses to reset the timer
    window.addEventListener('mousemove', resetTimeout)
    window.addEventListener('keydown', resetTimeout)

    return () => {
      window.removeEventListener('mousemove', resetTimeout)
      window.removeEventListener('keydown', resetTimeout)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [resetTimeout])

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (
      values.username === 'admin' &&
      values.email === 'admin@dsa.com' &&
      values.password === 'dsaadminpass'
    ) {
      setStep(2)
      setLoading(false)
      resetTimeout() // Start 5-min timer once credentials clear
    } else {
      setError('Invalid authorization credentials.')
      setLoading(false)
    }
  }

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (otp.join('') === '123456') {
      router.push('/admin')
    } else {
      setError('Invalid security code.')
      setLoading(false)
      setOtp(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    }
  }

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden'>
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
            {step === 1 ? (
              <ShieldCheck size={40} className='text-blue-500' />
            ) : (
              <Smartphone size={40} className='text-blue-400' />
            )}
          </motion.div>
          <h1 className='text-2xl font-black text-white tracking-tight italic uppercase'>
            {step === 1 ? 'Central Command' : 'Security Check'}
          </h1>
          {step === 2 && (
            <div className='flex items-center justify-center gap-1.5 mt-2 text-[9px] font-black text-amber-500 uppercase tracking-widest'>
              <Clock size={10} /> Auto-expire in 5:00
            </div>
          )}
        </div>

        <AnimatePresence mode='wait'>
          {step === 1 ? (
            <motion.div
              key='login'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className='bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl'
            >
              <form onSubmit={handleInitialSubmit} className='space-y-5'>
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
                    <Loader2 className='animate-spin' />
                  ) : (
                    <>
                      Validate Access <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key='2fa'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl'
            >
              <form onSubmit={handleVerify2FA} className='space-y-6'>
                <div className='flex justify-between gap-2'>
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el
                      }} // Fixed Ref Logic: No return value
                      type='text'
                      maxLength={1}
                      className='w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl font-black text-blue-400 outline-none focus:ring-2 focus:ring-blue-500/50'
                      value={data}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                    />
                  ))}
                </div>
                {error && <ErrorBox message={error} />}
                <button
                  type='submit'
                  disabled={loading || otp.join('').length < 6}
                  className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-2xl py-4 text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20'
                >
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'Finalize Encryption'
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
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
          className='w-full bg-slate-950 border border-slate-800 rounded-2xl px-11 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-700'
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
