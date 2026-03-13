// 'use client'

// import { useState, useEffect, Suspense } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { motion } from 'framer-motion'
// import {
//   Lock,
//   LogIn,
//   Loader2,
//   AlertCircle,
//   Eye,
//   EyeOff,
//   AtSign,
//   CheckCircle2,
// } from 'lucide-react'

// // API Utility
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
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { Checkbox } from '@/components/ui/checkbox'

// const loginSchema = z.object({
//   identifier: z.string().min(3, 'Username or Email is required'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   rememberMe: z.boolean().default(false).optional(),
// })

// // Sub-component to handle search params safely within Suspense
// function LoginContent() {
//   const [loading, setLoading] = useState(false)
//   const [showPass, setShowPass] = useState(false)
//   const [error, setError] = useState('')
//   const [successMsg, setSuccessMsg] = useState('')

//   const router = useRouter()
//   const searchParams = useSearchParams()

//   // Check if we arrived here after a successful password reset
//   useEffect(() => {
//     if (searchParams.get('reset') === 'success') {
//       setSuccessMsg('Password updated successfully! Please log in.')
//     }
//   }, [searchParams])

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       identifier: '',
//       password: '',
//       rememberMe: false,
//     },
//   })

//   async function onSubmit(values: z.infer<typeof loginSchema>) {
//     setLoading(true)
//     setError('')
//     setSuccessMsg('')

//     try {
//       // In your api.ts, payload is passed to fetch body
//       // Adjusting keys to match common backend expectations
//       const payload = {
//         email: values.identifier,
//         password: values.password,
//       }

//       const response = await dsaApi.auth.login(payload)

//       // Store token securely
//       if (response.token) {
//         localStorage.setItem('dsa_token', response.token)
//       }

//       router.push('/dashboard')
//       router.refresh()
//     } catch (err: any) {
//       // Using err.message because of your handleResponse helper in api.ts
//       setError(err.message || 'Invalid credentials. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className='w-full max-w-md'
//     >
//       <Card className='rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
//         <div className='h-2 bg-[#002EFF]' />

//         <CardHeader className='text-center pt-10 pb-2'>
//           <CardTitle className='text-2xl md:text-3xl font-black text-[#002EFF] tracking-tighter uppercase'>
//             Welcome Back
//           </CardTitle>
//           <CardDescription className='font-bold uppercase text-[10px] tracking-[0.2em] text-gray-400'>
//             DSA Student Portal
//           </CardDescription>
//         </CardHeader>

//         <CardContent className='p-6 md:p-8'>
//           {/* Success Alert from Password Reset */}
//           {successMsg && (
//             <Alert className='mb-6 rounded-2xl bg-emerald-50 border-none text-emerald-600'>
//               <CheckCircle2 className='h-4 w-4 text-emerald-600' />
//               <AlertDescription className='text-xs font-bold uppercase italic'>
//                 {successMsg}
//               </AlertDescription>
//             </Alert>
//           )}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
//               <FormField
//                 control={form.control}
//                 name='identifier'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
//                       Username or Email
//                     </FormLabel>
//                     <FormControl>
//                       <div className='relative'>
//                         <AtSign
//                           className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
//                           size={18}
//                         />
//                         <Input
//                           {...field}
//                           autoComplete='username'
//                           placeholder='Enter your identity'
//                           className='h-14 pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all outline-none text-sm'
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage className='text-[10px]' />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name='password'
//                 render={({ field }) => (
//                   <FormItem>
//                     <div className='flex justify-between items-center'>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
//                         Password
//                       </FormLabel>
//                       <Link
//                         href='/auth/forgot-password'
//                         className='text-[10px] font-bold text-[#002EFF] hover:underline'
//                       >
//                         Forgot Password?
//                       </Link>
//                     </div>
//                     <FormControl>
//                       <div className='relative'>
//                         <Lock
//                           className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
//                           size={18}
//                         />
//                         <Input
//                           {...field}
//                           type={showPass ? 'text' : 'password'}
//                           autoComplete='current-password'
//                           placeholder='••••••••••••'
//                           className='h-14 pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all outline-none text-sm'
//                         />
//                         <button
//                           type='button'
//                           onClick={() => setShowPass(!showPass)}
//                           className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002EFF] transition-colors'
//                         >
//                           {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//                         </button>
//                       </div>
//                     </FormControl>
//                     <FormMessage className='text-[10px]' />
//                   </FormItem>
//                 )}
//               />

//               <div className='flex items-center justify-between py-2'>
//                 <FormField
//                   control={form.control}
//                   name='rememberMe'
//                   render={({ field }) => (
//                     <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                           className='rounded-md border-gray-300 data-[state=checked]:bg-[#002EFF]'
//                         />
//                       </FormControl>
//                       <FormLabel className='text-[11px] font-bold text-gray-500 uppercase cursor-pointer'>
//                         Remember me
//                       </FormLabel>
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {error && (
//                 <Alert
//                   variant='destructive'
//                   className='rounded-2xl bg-rose-50 border-none text-rose-600'
//                 >
//                   <AlertCircle className='h-4 w-4 text-rose-600' />
//                   <AlertDescription className='text-xs font-bold uppercase'>
//                     {error}
//                   </AlertDescription>
//                 </Alert>
//               )}

//               <Button
//                 type='submit'
//                 disabled={loading}
//                 className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98]'
//               >
//                 {loading ? (
//                   <Loader2 className='animate-spin' size={20} />
//                 ) : (
//                   <>
//                     LOG IN <LogIn size={20} />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </Form>

//           <div className='mt-8 text-center'>
//             <p className='text-gray-400 font-bold text-xs uppercase tracking-tight'>
//               New here?{' '}
//               <Link
//                 href='/auth/signup'
//                 className='text-[#002EFF] hover:underline ml-1 font-black'
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }

// // Main page component with Suspense boundary
// export default function LoginPage() {
//   return (
//     <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 md:p-6 font-sans'>
//       <Suspense
//         fallback={<Loader2 className='animate-spin text-[#002EFF]' size={40} />}
//       >
//         <LoginContent />
//       </Suspense>
//     </div>
//   )
// }

'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion } from 'framer-motion'
import {
  Lock,
  LogIn,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  AtSign,
  CheckCircle2,
} from 'lucide-react'

// API Utility
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
import { Checkbox } from '@/components/ui/checkbox'

const loginSchema = z.object({
  identifier: z.string().min(3, 'Username or Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().default(false).optional(),
})

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 1. Check for password reset success
    if (searchParams.get('reset') === 'success') {
      setSuccessMsg('Password updated successfully! Please log in.')
    }
    // 2. Check for account verification success (NEW)
    if (searchParams.get('verified') === 'true') {
      setSuccessMsg('Account verified successfully! You can now log in.')
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      // Backend usually expects 'email' or 'username'.
      // Using 'email' as the key to match your common API structure
      const payload = {
        email: values.identifier,
        password: values.password,
      }

      const response = await dsaApi.auth.login(payload)

      if (response.token) {
        localStorage.setItem('dsa_token', response.token)
        // Clean up any leftover registration emails
        localStorage.removeItem('dsa_pending_email')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='w-full max-w-md'
    >
      <Card className='rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
        <div className='h-2 bg-[#002EFF]' />

        <CardHeader className='text-center pt-10 pb-2'>
          <CardTitle className='text-2xl md:text-3xl font-black text-[#002EFF] tracking-tighter uppercase'>
            Welcome Back
          </CardTitle>
          <CardDescription className='font-bold uppercase text-[10px] tracking-[0.2em] text-gray-400'>
            DSA Student Portal
          </CardDescription>
        </CardHeader>

        <CardContent className='p-6 md:p-8'>
          {/* Success Alerts */}
          {successMsg && (
            <Alert className='mb-6 rounded-2xl bg-emerald-50 border-none text-emerald-600'>
              <CheckCircle2 className='h-4 w-4 text-emerald-600' />
              <AlertDescription className='text-xs font-bold uppercase italic'>
                {successMsg}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='identifier'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                      Username or Email
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <AtSign
                          className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <Input
                          {...field}
                          autoComplete='username'
                          placeholder='Enter your identity'
                          className='h-14 pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all outline-none text-sm'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[10px]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex justify-between items-center'>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                        Password
                      </FormLabel>
                      <Link
                        href='/auth/forgot-password'
                        className='text-[10px] font-bold text-[#002EFF] hover:underline'
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Lock
                          className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <Input
                          {...field}
                          type={showPass ? 'text' : 'password'}
                          autoComplete='current-password'
                          placeholder='••••••••••••'
                          className='h-14 pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all outline-none text-sm'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPass(!showPass)}
                          className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002EFF] transition-colors'
                        >
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-[10px]' />
                  </FormItem>
                )}
              />

              <div className='flex items-center justify-between py-2'>
                <FormField
                  control={form.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='rounded-md border-gray-300 data-[state=checked]:bg-[#002EFF]'
                        />
                      </FormControl>
                      <FormLabel className='text-[11px] font-bold text-gray-500 uppercase cursor-pointer'>
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <Alert
                  variant='destructive'
                  className='rounded-2xl bg-rose-50 border-none text-rose-600'
                >
                  <AlertCircle className='h-4 w-4 text-rose-600' />
                  <AlertDescription className='text-xs font-bold uppercase'>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type='submit'
                disabled={loading}
                className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98]'
              >
                {loading ? (
                  <Loader2 className='animate-spin' size={20} />
                ) : (
                  <>
                    LOG IN <LogIn size={20} />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-8 text-center'>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-tight'>
              New here?{' '}
              <Link
                href='/auth/signup'
                className='text-[#002EFF] hover:underline ml-1 font-black'
              >
                Create Account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 md:p-6 font-sans'>
      <Suspense
        fallback={<Loader2 className='animate-spin text-[#002EFF]' size={40} />}
      >
        <LoginContent />
      </Suspense>
    </div>
  )
}