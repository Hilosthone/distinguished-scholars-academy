'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  GraduationCap,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AtSign,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

const SUBJECT_OPTIONS = [
  'Mathematics',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
  'Literature',
  'Commerce',
  'CRS/IRS',
]

const formSchema = z
  .object({
    fullname: z.string().min(2, 'Name is required'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'No spaces or special characters allowed'),
    phone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Min 8 characters'),
    confirmPassword: z.string(),
    examType: z.string().min(1, 'Select an exam type'),
    subjects: z
      .array(z.string())
      .min(1, 'Select at least 1 subject')
      .max(4, 'Max 4 subjects'),
    isDSA: z.enum(['yes', 'no']),
    studentId: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, 'Consent required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export default function DSASignUp() {
  const [isDSAStudent, setIsDSAStudent] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      examType: '',
      isDSA: 'no',
      consent: true,
      subjects: [],
      studentId: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Registering Student:', values)
    router.push('/welcome-tutorial')
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] py-6 md:py-12 px-4 flex flex-col items-center font-sans'>
      {/* Header */}
      <div className='text-center mb-6'>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='bg-[#002EFF] text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-200'
        >
          <GraduationCap size={28} />
        </motion.div>
        <h1 className='text-xl font-black text-zinc-900 uppercase tracking-tight'>
          Create Account
        </h1>
      </div>

      <Card className='w-full max-w-md md:max-w-xl rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
        <div className='h-2 bg-[#002EFF]' />

        <CardContent className='p-6 md:p-10'>
          {/* Social Logins */}
          <div className='grid grid-cols-2 gap-4 mb-8'>
            <Button
              variant='outline'
              className='rounded-2xl py-6 border-gray-100 font-bold text-xs flex gap-2 hover:bg-gray-50'
            >
              <img
                src='https://www.svgrepo.com/show/475656/google-color.svg'
                className='w-4 h-4'
                alt='Google'
              />
              GOOGLE
            </Button>
            <Button
              variant='outline'
              className='rounded-2xl py-6 border-gray-100 font-bold text-xs flex gap-2 hover:bg-gray-50'
            >
              <img
                src='https://www.svgrepo.com/show/475647/facebook-color.svg'
                className='w-4 h-4'
                alt='Facebook'
              />
              FACEBOOK
            </Button>
          </div>

          <div className='relative mb-8'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-[10px] uppercase font-black text-gray-400'>
              <span className='bg-white px-4'>Or use email</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Name & Username Row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='fullname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User
                            className='absolute left-3 top-3.5 text-gray-400'
                            size={16}
                          />
                          <Input
                            placeholder='full name'
                            {...field}
                            className='rounded-2xl bg-gray-50 border-none h-12 font-bold pl-10'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <AtSign
                            className='absolute left-3 top-3.5 text-gray-400'
                            size={16}
                          />
                          <Input
                            placeholder='username'
                            {...field}
                            className='rounded-2xl bg-gray-50 border-none h-12 font-bold pl-10'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email & Phone Row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='name@example.com'
                          {...field}
                          className='rounded-2xl bg-gray-50 border-none h-12 font-bold'
                        />
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        WhatsApp Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='08012345678'
                          {...field}
                          className='rounded-2xl bg-gray-50 border-none h-12 font-bold'
                        />
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Row with Eye Icon */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showPass ? 'text' : 'password'}
                            placeholder='••••••••'
                            {...field}
                            className='rounded-2xl bg-gray-50 border-none h-12 font-bold pr-10'
                          />
                          <button
                            type='button'
                            onClick={() => setShowPass(!showPass)}
                            className='absolute right-3 top-3 text-gray-400 hover:text-[#002EFF]'
                          >
                            {showPass ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                        Confirm
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder='••••••••'
                            {...field}
                            className='rounded-2xl bg-gray-50 border-none h-12 font-bold pr-10'
                          />
                          <button
                            type='button'
                            onClick={() => setShowConfirm(!showConfirm)}
                            className='absolute right-3 top-3 text-gray-400 hover:text-[#002EFF]'
                          >
                            {showConfirm ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Exam Selection */}
              <FormField
                control={form.control}
                name='examType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400'>
                      Target Exam / Class
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='rounded-2xl bg-gray-50 border-none h-12 font-bold'>
                          <SelectValue placeholder='Select level' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='rounded-2xl'>
                        <SelectItem value='utme'>JAMB (UTME)</SelectItem>
                        <SelectItem value='waec'>WAEC/NECO</SelectItem>
                        <SelectItem value='post-utme'>Post-UTME</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subjects */}
              <FormField
                control={form.control}
                name='subjects'
                render={() => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400 flex justify-between'>
                      <span>Subjects of Interest</span>
                      <span className='text-[#002EFF]'>
                        {form.watch('subjects').length}/4
                      </span>
                    </FormLabel>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-4xl'>
                      {SUBJECT_OPTIONS.map((subject) => (
                        <FormField
                          key={subject}
                          control={form.control}
                          name='subjects'
                          render={({ field }) => (
                            <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(subject)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          subject,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (v) => v !== subject,
                                          ),
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-[11px] font-bold cursor-pointer'>
                                {subject}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage className='text-[10px]' />
                  </FormItem>
                )}
              />

              {/* DSA Student Status */}
              <div className='p-5 rounded-4xl bg-blue-50/50 border border-blue-100'>
                <FormField
                  control={form.control}
                  name='isDSA'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel className='text-[10px] font-black uppercase text-[#002EFF]'>
                        Are you a DSA Student?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => {
                            field.onChange(val)
                            setIsDSAStudent(val === 'yes')
                          }}
                          defaultValue={field.value}
                          className='flex gap-6'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='yes' id='yes' />
                            <FormLabel
                              htmlFor='yes'
                              className='font-black text-xs uppercase'
                            >
                              Yes
                            </FormLabel>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='no' id='no' />
                            <FormLabel
                              htmlFor='no'
                              className='font-black text-xs uppercase'
                            >
                              No
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AnimatePresence>
                  {isDSAStudent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='mt-4'
                    >
                      <FormField
                        control={form.control}
                        name='studentId'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='Enter DSA Student ID'
                                {...field}
                                className='rounded-xl bg-white border-blue-100 h-10 text-xs'
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                type='submit'
                className='w-full bg-[#002EFF] hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100 transition-all active:scale-[0.98]'
              >
                Create Account <ArrowRight className='ml-2' size={16} />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className='mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest'>
        Already a member?{' '}
        <Link href='/signin' className='text-[#002EFF] hover:underline'>
          Login
        </Link>
      </p>
    </div>
  )
}
