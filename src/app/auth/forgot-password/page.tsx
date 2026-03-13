'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

import { dsaApi } from '@/lib/api'
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [error, setError] = useState('')
  const [resetToken, setResetToken] = useState('')

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  // STEP 1: Request OTP via dsaApi.auth.forgotPassword
  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setLoading(true)
    setError('')
    try {
      await dsaApi.auth.forgotPassword(values.email)
      setUserEmail(values.email)
      setStep('otp')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // STEP 2: Verify OTP via dsaApi.auth.verifyOtp
  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setLoading(true)
    setError('')
    try {
      const response = await dsaApi.auth.verifyOtp(userEmail, values.otp)

      // Capturing token from response to pass to the Reset Password page
      if (response.token) {
        setResetToken(response.token)
      }

      setStep('success')
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6 font-sans'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md'
      >
        <Card className='rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
          <div className='h-2 bg-[#002EFF]' />

          <AnimatePresence mode='wait'>
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
                                  className='h-14 pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800'
                                />
                              </div>
                            </FormControl>
                            <FormMessage className='text-[10px]' />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <Alert
                          variant='destructive'
                          className='rounded-2xl bg-rose-50 border-none text-rose-600'
                        >
                          <AlertCircle className='h-4 w-4' />
                          <AlertDescription className='text-xs font-bold uppercase'>
                            {error}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type='submit'
                        disabled={loading}
                        className='w-full py-7 bg-[#002EFF] text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100'
                      >
                        {loading ? (
                          <Loader2 className='animate-spin' size={20} />
                        ) : (
                          'SEND OTP'
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className='mt-8 text-center'>
                    <Link
                      href='/auth/login'
                      className='inline-flex items-center gap-2 text-gray-400 hover:text-[#002EFF] font-bold text-xs uppercase transition-colors'
                    >
                      <ArrowLeft size={14} /> Back to Login
                    </Link>
                  </div>
                </CardContent>
              </motion.div>
            )}

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
                          <FormItem className='flex flex-col items-center'>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                <InputOTPGroup className='gap-2 md:gap-3'>
                                  {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot
                                      key={index}
                                      index={index}
                                      className='rounded-xl border-none bg-gray-100 w-10 h-14 md:w-12 md:h-16 font-black text-xl text-[#002EFF] shadow-inner'
                                    />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage className='text-[10px] text-center' />
                          </FormItem>
                        )}
                      />

                      {error && (
                        <Alert
                          variant='destructive'
                          className='w-full rounded-2xl bg-rose-50 border-none text-rose-600'
                        >
                          <AlertCircle className='h-4 w-4' />
                          <AlertDescription className='text-xs font-bold uppercase'>
                            {error}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type='submit'
                        disabled={loading}
                        className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all shadow-xl'
                      >
                        {loading ? (
                          <Loader2 className='animate-spin' size={20} />
                        ) : (
                          'VERIFY CODE'
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className='mt-8 text-center'>
                    <button
                      onClick={() => setStep('email')}
                      className='text-gray-400 hover:text-[#002EFF] font-bold text-xs uppercase transition-colors'
                    >
                      Resend Code
                    </button>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key='success-step'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='p-12 text-center'
              >
                <div className='bg-green-50 text-green-500 w-20 h-20 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-sm'>
                  <CheckCircle2 size={40} />
                </div>
                <h2 className='text-2xl font-black text-zinc-900 uppercase mb-3'>
                  Verified!
                </h2>
                <p className='text-gray-500 text-sm font-medium mb-10 px-4'>
                  Your identity has been confirmed. You can now set your new
                  password.
                </p>
                <Button
                  asChild
                  className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all shadow-xl'
                >
                  <Link href={`/auth/reset-password/${resetToken}`}>
                    SET NEW PASSWORD
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}
