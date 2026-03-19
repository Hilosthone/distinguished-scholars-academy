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
  email: z.string().email('Please enter a valid email address'),
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
    if (searchParams.get('reset') === 'success') {
      setSuccessMsg('Password updated successfully! Please log in.')
    }
    if (searchParams.get('verified') === 'true') {
      setSuccessMsg('Account verified successfully! You can now log in.')
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      // --- ADMIN BYPASS LOGIC ---
      if (values.email === 'admin@dsa.com' && values.password === 'dsaadminpass') {
        localStorage.setItem('user_role', 'super_admin')
        localStorage.setItem('dsa_token', 'admin-session-active') // Placeholder token
        document.cookie = 'admin_token=true; path=/; max-age=3600; SameSite=Lax'
        
        setSuccessMsg('ADMIN ACCESS GRANTED. REDIRECTING...')
        setTimeout(() => {
          router.push('/admin')
        }, 800)
        return;
      }

      // --- STANDARD API LOGIN ---
      const response = await fetch('https://api.distinguishedscholarsacademy.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.')
      }

      // Store JWT token and user info
      if (data.token) {
        localStorage.setItem('dsa_token', data.token)
        localStorage.setItem('dsa_user', JSON.stringify(data.user))
        localStorage.setItem('user_role', 'student')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          {successMsg && (
            <Alert className='mb-6 rounded-2xl bg-emerald-50 border-none text-emerald-600'>
              <CheckCircle2 className='h-4 w-4 text-emerald-600' />
              <AlertDescription className='text-xs font-bold uppercase'>
                {successMsg}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant='destructive' className='mb-6 rounded-2xl bg-rose-50 border-none text-rose-600'>
              <AlertCircle className='h-4 w-4 text-rose-600' />
              <AlertDescription className='text-xs font-bold uppercase'>
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <AtSign className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input
                          {...field}
                          placeholder='name@example.com'
                          className='h-14 pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 outline-none text-sm'
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
                      <Link href='/auth/forgot-password' className='text-[10px] font-bold text-[#002EFF] hover:underline'>
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input
                          {...field}
                          type={showPass ? 'text' : 'password'}
                          placeholder='••••••••••••'
                          className='h-14 pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 outline-none text-sm'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPass(!showPass)}
                          className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002EFF]'
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

              <Button
                type='submit'
                disabled={loading}
                className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98]'
              >
                {loading ? (
                  <Loader2 className='animate-spin' size={20} />
                ) : (
                  <>LOG IN <LogIn size={20} /></>
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-8 text-center'>
            <p className='text-gray-400 font-bold text-xs uppercase'>
              New here?{' '}
              <Link href='/auth/signup' className='text-[#002EFF] hover:underline ml-1 font-black'>
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
      <Suspense fallback={<Loader2 className='animate-spin text-[#002EFF]' size={40} />}>
        <LoginContent />
      </Suspense>
    </div>
  )
}