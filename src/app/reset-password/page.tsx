'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Lock, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react'

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

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function SetNewPassword() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setLoading(true)
    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    // Redirect to login after success
    router.push('/signin?reset=success')
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
          
          <CardHeader className='text-center pt-10 pb-2'>
            <div className='bg-blue-50 text-[#002EFF] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <Lock size={24} />
            </div>
            <CardTitle className='text-2xl font-black text-zinc-900 tracking-tight uppercase'>
              New Password
            </CardTitle>
            <CardDescription className='font-medium text-xs text-gray-500'>
              Please create a strong password that you don't use elsewhere.
            </CardDescription>
          </CardHeader>

          <CardContent className='p-8'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                
                {/* New Password */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            {...field}
                            className='pl-12 pr-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800'
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002EFF]"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400 ml-1'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <CheckCircle2 className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                          <Input
                            type='password'
                            placeholder='••••••••'
                            {...field}
                            className='pl-12 py-6 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#002EFF] font-bold text-gray-800'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50/50 p-4 rounded-2xl space-y-2">
                   <p className="text-[9px] font-black uppercase text-blue-400 tracking-wider">Security Requirements</p>
                   <ul className="text-[11px] font-bold text-zinc-500 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${form.getValues('password').length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(form.getValues('password')) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        One uppercase letter
                      </li>
                   </ul>
                </div>

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full py-7 bg-black text-white font-black rounded-2xl hover:bg-[#002EFF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100'
                >
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'UPDATE PASSWORD'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}