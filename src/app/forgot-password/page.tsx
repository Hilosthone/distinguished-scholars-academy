'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp' 

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits'),
})

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setLoading(true)
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUserEmail(values.email)
    setLoading(false)
    setStep('otp')
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setLoading(true)
    // Simulate verifying OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setStep('success')
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md'
      >
        <Card className='rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
          <div className='h-2 bg-[#002EFF]' />

          <AnimatePresence mode='wait'>
            {/* STEP 1: EMAIL INPUT */}
            {step === 'email' && (
              <motion.div
                key='email-step'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CardHeader className='text-center pt-10 pb-2'>
                  <div className='bg-blue-50 text-[#002EFF] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Mail size={24} />
                  </div>
                  <CardTitle className='text-2xl font-black text-zinc-900 tracking-tight uppercase'>
                    Reset Password
                  </CardTitle>
                  <CardDescription className='font-medium text-xs text-gray-500'>
                    Enter your email to receive a 6-digit OTP code.
                  </CardDescription>
                </CardHeader>

                <CardContent className='p-8'>
                  <Form {...emailForm}>
                    <form
                      onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                      className='space-y-6'
                    >
                      <FormField
                        control={emailForm.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <Mail
                                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                                  size={18}
                                />
                                <Input
                                  placeholder='name@example.com'
                                  {...field}
                                  className='pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800'
                                />
                              </div>
                            </FormControl>
                            <FormMessage className='text-[10px]' />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='submit'
                        disabled={loading}
                        className='w-full py-7 bg-[#002EFF] text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100'
                      >
                        {loading ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          'SEND OTP'
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className='mt-8 text-center'>
                    <Link
                      href='/signin'
                      className='inline-flex items-center gap-2 text-gray-400 hover:text-[#002EFF] font-bold text-xs uppercase'
                    >
                      <ArrowLeft size={14} /> Back to Login
                    </Link>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 'otp' && (
              <motion.div
                key='otp-step'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CardHeader className='text-center pt-10 pb-2'>
                  <div className='bg-blue-50 text-[#002EFF] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <ShieldCheck size={24} />
                  </div>
                  <CardTitle className='text-2xl font-black text-zinc-900 tracking-tight uppercase'>
                    Verify OTP
                  </CardTitle>
                  <CardDescription className='font-medium text-xs text-gray-500'>
                    We sent a code to{' '}
                    <span className='text-zinc-900 font-bold'>{userEmail}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className='p-8'>
                  <Form {...otpForm}>
                    <form
                      onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                      className='space-y-8 flex flex-col items-center'
                    >
                      <FormField
                        control={otpForm.control}
                        name='otp'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup className='gap-2'>
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={0}
                                  />
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={1}
                                  />
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={2}
                                  />
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={3}
                                  />
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={4}
                                  />
                                  <InputOTPSlot
                                    className='rounded-xl border-none bg-gray-100 w-10 h-14 font-black text-lg text-[#002EFF]'
                                    index={5}
                                  />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage className='text-[10px] text-center' />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='submit'
                        disabled={loading}
                        className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all shadow-xl'
                      >
                        {loading ? (
                          <Loader2 className='animate-spin' />
                        ) : (
                          'VERIFY & PROCEED'
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className='mt-8 text-center'>
                    <button
                      onClick={() => setStep('email')}
                      className='text-gray-400 hover:text-[#002EFF] font-bold text-xs uppercase'
                    >
                      Resend Code
                    </button>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 'success' && (
              <motion.div
                key='success-step'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='p-12 text-center'
              >
                <div className='bg-green-50 text-green-500 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                  <CheckCircle2 size={32} />
                </div>
                <h2 className='text-2xl font-black text-zinc-900 uppercase mb-2'>
                  Verified!
                </h2>
                <p className='text-gray-500 text-sm font-medium mb-8'>
                  Your identity has been confirmed. You can now set your new
                  password.
                </p>
                <Button asChild className='...'>
                  <Link href='/reset-password'>CREATE NEW PASSWORD</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}