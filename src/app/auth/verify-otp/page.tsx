// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { GraduationCap, ArrowRight, Loader2, Mail } from 'lucide-react'

// import { dsaApi } from '@/lib/api'
// import { Button } from '@/components/ui/button'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent } from '@/components/ui/card'

// const formSchema = z.object({
//   otp: z.string().length(6, 'OTP must be exactly 6 digits'),
// })

// export default function VerifyOTP() {
//   const [email, setEmail] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [apiError, setApiError] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     // Get the email we stored during registration
//     const storedEmail = localStorage.getItem('dsa_pending_email')
//     if (!storedEmail) {
//       router.push('/auth/signup')
//     } else {
//       setEmail(storedEmail)
//     }
//   }, [router])

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       otp: '',
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (!email) return
//     setApiError(null)
//     setIsLoading(true)

//     try {
//       await dsaApi.auth.verifyOtp(email, values.otp)

//       // Clear the temporary email
//       localStorage.removeItem('dsa_pending_email')

//       // Success! Move to sign in
//       router.push('/auth/signin?verified=true')
//     } catch (error: any) {
//       setApiError(error.message || 'Invalid OTP. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!email) return null

//   return (
//     <div className='min-h-screen bg-[#F8FAFF] py-12 px-4 flex flex-col items-center font-sans'>
//       <div className='text-center mb-6'>
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className='bg-[#002EFF] text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-200'
//         >
//           <Mail size={24} />
//         </motion.div>
//         <h1 className='text-xl font-black text-zinc-900 uppercase tracking-tight'>
//           Verify Email
//         </h1>
//         <p className='text-xs font-bold text-gray-400 mt-2'>
//           SENT TO: <span className='text-zinc-900'>{email}</span>
//         </p>
//       </div>

//       <Card className='w-full max-w-md rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
//         <div className='h-2 bg-[#002EFF]' />

//         <CardContent className='p-8 md:p-10'>
//           {apiError && (
//             <div className='mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[11px] font-bold uppercase tracking-wider text-center'>
//               {apiError}
//             </div>
//           )}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
//               <FormField
//                 control={form.control}
//                 name='otp'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className='text-[10px] font-black uppercase text-gray-400 text-center block mb-4'>
//                       Enter 6-Digit Code
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='000000'
//                         {...field}
//                         maxLength={6}
//                         className='rounded-2xl bg-gray-50 border-none h-16 text-center text-2xl font-black tracking-[0.5em] focus-visible:ring-2 focus-visible:ring-blue-500'
//                       />
//                     </FormControl>
//                     <FormMessage className='text-[10px] text-center' />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type='submit'
//                 disabled={isLoading}
//                 className='w-full bg-[#002EFF] hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100'
//               >
//                 {isLoading ? (
//                   <Loader2 className='animate-spin' size={18} />
//                 ) : (
//                   <>
//                     Verify Account <ArrowRight className='ml-2' size={16} />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </Form>

//           <div className='mt-8 text-center'>
//             <button
//               onClick={() => router.push('/auth/signup')}
//               className='text-[10px] font-black uppercase text-gray-400 hover:text-[#002EFF] transition-colors'
//             >
//               Wrong email? Edit profile
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ArrowRight, Loader2, Mail, RefreshCcw } from 'lucide-react'

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
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
})

export default function VerifyOTP() {
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [apiSuccess, setApiSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem('dsa_pending_email')
    if (!storedEmail) {
      router.push('/auth/signup')
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  // 1. Resend OTP Handler
  const handleResendOTP = async () => {
    if (!email) return
    setIsResending(true)
    setApiError(null)
    setApiSuccess(null)

    try {
      const response = await fetch(
        'https://api.distinguishedscholarsacademy.com/api/auth/send-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        },
      )
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to resend OTP')

      setApiSuccess('A new code has been sent to your email.')
    } catch (error: any) {
      setApiError(error.message)
    } finally {
      setIsResending(false)
    }
  }

  // 2. Verify OTP Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) return
    setApiError(null)
    setApiSuccess(null)
    setIsLoading(true)

    try {
      const response = await fetch(
        'https://api.distinguishedscholarsacademy.com/api/auth/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            otp: values.otp,
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Verification failed. Please check the code.',
        )
      }

      // Per API Schema: Response contains { token, user }
      // Store token for authenticated sessions
      localStorage.setItem('dsa_auth_token', data.token)
      localStorage.removeItem('dsa_pending_email')

      // Redirect to dashboard or success page
      router.push('/dashboard?welcome=true')
    } catch (error: any) {
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!email) return null

  return (
    <div className='min-h-screen bg-[#F8FAFF] py-12 px-4 flex flex-col items-center font-sans'>
      <div className='text-center mb-6'>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='bg-[#002EFF] text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-200'
        >
          <Mail size={24} />
        </motion.div>
        <h1 className='text-xl font-black text-zinc-900 uppercase tracking-tight'>
          Verify Email
        </h1>
        <p className='text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest'>
          SENT TO: <span className='text-[#002EFF]'>{email}</span>
        </p>
      </div>

      <Card className='w-full max-w-md rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
        <div className='h-2 bg-[#002EFF]' />

        <CardContent className='p-8 md:p-10'>
          {apiError && (
            <div className='mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[11px] font-bold uppercase tracking-wider text-center'>
              {apiError}
            </div>
          )}

          {apiSuccess && (
            <div className='mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-[11px] font-bold uppercase tracking-wider text-center'>
              {apiSuccess}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400 text-center block mb-4'>
                      Enter 6-Digit Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='000000'
                        {...field}
                        maxLength={6}
                        className='rounded-2xl bg-gray-50 border-none h-20 text-center text-3xl font-black tracking-[0.3em] focus-visible:ring-2 focus-visible:ring-blue-500'
                      />
                    </FormControl>
                    <FormMessage className='text-[10px] text-center' />
                  </FormItem>
                )}
              />

              <div className='space-y-4'>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-[#002EFF] hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100'
                >
                  {isLoading ? (
                    <Loader2 className='animate-spin' size={18} />
                  ) : (
                    <>
                      Verify Account <ArrowRight className='ml-2' size={16} />
                    </>
                  )}
                </Button>

                <button
                  type='button'
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className='w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#002EFF] transition-colors py-2'
                >
                  {isResending ? (
                    <Loader2 className='animate-spin' size={12} />
                  ) : (
                    <RefreshCcw size={12} />
                  )}
                  Resend Code
                </button>
              </div>
            </form>
          </Form>

          <div className='mt-8 pt-6 border-t border-gray-50 text-center'>
            <button
              onClick={() => router.push('/auth/signup')}
              className='text-[10px] font-black uppercase text-gray-400 hover:text-zinc-900 transition-colors'
            >
              Wait, I used the wrong email
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}