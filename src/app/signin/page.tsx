'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Loader2, AlertCircle, User } from 'lucide-react'

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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'

const loginSchema = z.object({
  // Added username validation
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  rememberMe: z.boolean().default(false).optional(),
})

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      username: '', // Initialize username
      email: '', 
      password: '', 
      rememberMe: false 
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    setError('')

    // Simulation of login logic
    setTimeout(() => {
      setLoading(false)
      const email = values.email.toLowerCase()
      
      if (email === 'admin@dsa.com') {
        router.push('/admin')
      } else {
        router.push('/rapid-quiz')
      }
    }, 1500)
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-4 md:p-6'>
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            size={18}
                          />
                          <Input
                            placeholder='Username'
                            {...field}
                            className='pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
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
                          <Mail
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            size={18}
                          />
                          <Input
                            placeholder='name@example.com'
                            {...field}
                            className='pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
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
                          href='/forgot-password'
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
                            type='password'
                            placeholder='••••••••••••••••'
                            {...field}
                            className='pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800 transition-all'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />

                {/* Remember Me */}
                <FormField
                  control={form.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center space-x-2 space-y-0 py-2'>
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

                {error && (
                  <Alert
                    variant='destructive'
                    className='rounded-2xl bg-red-50 border-none'
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
                  className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98]'
                >
                  {loading ? (
                    <Loader2 className='animate-spin' />
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
                  href='/signup'
                  className='text-[#002EFF] hover:underline ml-1 font-black'
                >
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}