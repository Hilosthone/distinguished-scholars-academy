// // src/app/auth/signup/page.tsx
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { motion, AnimatePresence } from 'framer-motion'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import {
//   GraduationCap,
//   ArrowRight,
//   User,
//   Eye,
//   EyeOff,
//   AtSign,
//   Loader2,
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
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Card, CardContent } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Separator } from '@/components/ui/separator'

// const SUBJECT_OPTIONS = [
//   'Mathematics',
//   'English',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Economics',
//   'Government',
//   'Literature',
//   'Commerce',
//   'CRS/IRS',
// ]

// const formSchema = z
//   .object({
//     fullname: z.string().min(2, 'Name is required'),
//     username: z
//       .string()
//       .min(3, 'Username must be at least 3 characters')
//       .regex(/^[a-zA-Z0-9_]+$/, 'No spaces or special characters allowed'),
//     phone: z.string().min(10, 'Valid phone number required'),
//     email: z.string().email('Invalid email address'),
//     password: z.string().min(8, 'Min 8 characters'),
//     confirmPassword: z.string(),
//     examType: z.string().min(1, 'Select an exam type'),
//     subjects: z
//       .array(z.string())
//       .min(1, 'Select at least 1 subject')
//       .max(4, 'Max 4 subjects'),
//     isDSA: z.enum(['yes', 'no']),
//     studentId: z.string().optional(),
//     consent: z.boolean().refine((val) => val === true, 'Consent required'),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'],
//   })

// export default function DSASignUp() {
//   const [isDSAStudent, setIsDSAStudent] = useState(false)
//   const [showPass, setShowPass] = useState(false)
//   const [showConfirm, setShowConfirm] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [apiError, setApiError] = useState<string | null>(null)
//   const router = useRouter()

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullname: '',
//       username: '',
//       phone: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       examType: '',
//       isDSA: 'no',
//       consent: true,
//       subjects: [],
//       studentId: '',
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setApiError(null)
//     setIsLoading(true)

//     try {
//       // UPDATED: Mapping keys to match Postman/Backend exactly
//       const payload = {
//         name: values.fullname,
//         username: values.username,
//         email: values.email,
//         password: values.password,
//         phoneNumber: values.phone,         // Backend expects 'phoneNumber'
//         level: values.examType,           // Backend expects 'level'
//         subjectsOfInterest: values.subjects, // Backend expects 'subjectsOfInterest'
//         isDSA: values.isDSA === 'yes',
//         studentId: values.studentId,
//       }

//       await dsaApi.auth.register(payload)
//       // router.push('/signin?success=account-created')
//       router.push('/auth/signin?success=account-created')
//     } catch (error: any) {
//       // Improved error message retrieval
//       const msg = error.response?.data?.message || error.message || "Registration failed"
//       setApiError(msg)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className='min-h-screen bg-[#F8FAFF] py-6 md:py-12 px-4 flex flex-col items-center font-sans'>
//       {/* Header */}
//       <div className='text-center mb-6'>
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className='bg-[#002EFF] text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-200'
//         >
//           <GraduationCap size={28} />
//         </motion.div>
//         <h1 className='text-xl font-black text-zinc-900 uppercase tracking-tight'>
//           Create Account
//         </h1>
//       </div>

//       <Card className='w-full max-w-md md:max-w-xl rounded-[40px] shadow-2xl border-none overflow-hidden bg-white'>
//         <div className='h-2 bg-[#002EFF]' />

//         <CardContent className='p-6 md:p-10'>
//           {apiError && (
//             <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[11px] font-bold uppercase tracking-wider">
//               {apiError}
//             </div>
//           )}

//           <div className='grid grid-cols-2 gap-4 mb-8'>
//             <Button variant='outline' className='rounded-2xl py-6 border-gray-100 font-bold text-xs flex gap-2 hover:bg-gray-50'>
//               <img src='https://www.svgrepo.com/show/475656/google-color.svg' className='w-4 h-4' alt='Google' />
//               GOOGLE
//             </Button>
//             <Button variant='outline' className='rounded-2xl py-6 border-gray-100 font-bold text-xs flex gap-2 hover:bg-gray-50'>
//               <img src='https://www.svgrepo.com/show/475647/facebook-color.svg' className='w-4 h-4' alt='Facebook' />
//               FACEBOOK
//             </Button>
//           </div>

//           <div className='relative mb-8'>
//             <div className='absolute inset-0 flex items-center'>
//               <Separator />
//             </div>
//             <div className='relative flex justify-center text-[10px] uppercase font-black text-gray-400'>
//               <span className='bg-white px-4'>Or use email</span>
//             </div>
//           </div>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 <FormField
//                   control={form.control}
//                   name='fullname'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Full Name</FormLabel>
//                       <FormControl>
//                         <div className='relative'>
//                           <User className='absolute left-3 top-3.5 text-gray-400' size={16} />
//                           <Input placeholder='full name' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold pl-10' />
//                         </div>
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name='username'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Username</FormLabel>
//                       <FormControl>
//                         <div className='relative'>
//                           <AtSign className='absolute left-3 top-3.5 text-gray-400' size={16} />
//                           <Input placeholder='username' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold pl-10' />
//                         </div>
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 <FormField
//                   control={form.control}
//                   name='email'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Email Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder='name@example.com' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold' />
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name='phone'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>WhatsApp Number</FormLabel>
//                       <FormControl>
//                         <Input placeholder='08012345678' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold' />
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                 <FormField
//                   control={form.control}
//                   name='password'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Password</FormLabel>
//                       <FormControl>
//                         <div className='relative'>
//                           <Input type={showPass ? 'text' : 'password'} placeholder='••••••••' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold pr-10' />
//                           <button type='button' onClick={() => setShowPass(!showPass)} className='absolute right-3 top-3 text-gray-400'>
//                             {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name='confirmPassword'
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Confirm</FormLabel>
//                       <FormControl>
//                         <div className='relative'>
//                           <Input type={showConfirm ? 'text' : 'password'} placeholder='••••••••' {...field} className='rounded-2xl bg-gray-50 border-none h-12 font-bold pr-10' />
//                           <button type='button' onClick={() => setShowConfirm(!showConfirm)} className='absolute right-3 top-3 text-gray-400'>
//                             {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage className='text-[10px]' />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name='examType'
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className='text-[10px] font-black uppercase text-gray-400'>Target Exam / Class</FormLabel>
//                     {/* Fixed: Value binding for Select */}
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger className='rounded-2xl bg-gray-50 border-none h-12 font-bold'>
//                           <SelectValue placeholder='Select level' />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent className='rounded-2xl'>
//                         {/* Values updated to common backend identifiers */}
//                         <SelectItem value='jamb'>JAMB (UTME)</SelectItem>
//                         <SelectItem value='waec'>WAEC/NECO</SelectItem>
//                         <SelectItem value='post-utme'>Post-UTME</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name='subjects'
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-[10px] font-black uppercase text-gray-400 flex justify-between'>
//                       <span>Subjects</span>
//                       <span className='text-[#002EFF]'>{form.watch('subjects').length}/4</span>
//                     </FormLabel>
//                     <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-3xl'>
//                       {SUBJECT_OPTIONS.map((subject) => (
//                         <FormField
//                           key={subject}
//                           control={form.control}
//                           name='subjects'
//                           render={({ field }) => (
//                             <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value?.includes(subject)}
//                                   onCheckedChange={(checked) => {
//                                     const currentValues = field.value || []
//                                     return checked
//                                       ? field.onChange([...currentValues, subject])
//                                       : field.onChange(currentValues.filter((v) => v !== subject))
//                                   }}
//                                 />
//                               </FormControl>
//                               <FormLabel className='text-[11px] font-bold cursor-pointer'>{subject}</FormLabel>
//                             </FormItem>
//                           )}
//                         />
//                       ))}
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               <div className='p-5 rounded-4xl bg-blue-50/50 border border-blue-100'>
//                 <FormField
//                   control={form.control}
//                   name='isDSA'
//                   render={({ field }) => (
//                     <FormItem className='space-y-3'>
//                       <FormLabel className='text-[10px] font-black uppercase text-[#002EFF]'>DSA Student?</FormLabel>
//                       <FormControl>
//                         <RadioGroup onValueChange={(val) => { field.onChange(val); setIsDSAStudent(val === 'yes') }} value={field.value} className='flex gap-6'>
//                           <div className='flex items-center space-x-2'>
//                             <RadioGroupItem value='yes' id='yes' />
//                             <FormLabel htmlFor='yes' className='font-black text-xs'>YES</FormLabel>
//                           </div>
//                           <div className='flex items-center space-x-2'>
//                             <RadioGroupItem value='no' id='no' />
//                             <FormLabel htmlFor='no' className='font-black text-xs'>NO</FormLabel>
//                           </div>
//                         </RadioGroup>
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <AnimatePresence>
//                   {isDSAStudent && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='mt-4 overflow-hidden'>
//                       <FormField
//                         control={form.control}
//                         name='studentId'
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input placeholder='Enter DSA Student ID' {...field} className='rounded-xl bg-white border-blue-100 h-10 text-xs' />
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <Button
//                 type='submit'
//                 disabled={isLoading}
//                 className='w-full bg-[#002EFF] hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100'
//               >
//                 {isLoading ? <Loader2 className='animate-spin' size={18} /> : <>Create Account <ArrowRight className='ml-2' size={16} /></>}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>

//       <p className='mt-8 text-sm font-bold text-gray-400 uppercase'>
//         Already a member? <Link href='/auth/signin' className='text-[#002EFF] hover:underline'>Login</Link>
//       </p>
//     </div>
//   )
// }

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
  User,
  Eye,
  EyeOff,
  AtSign,
  Loader2,
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
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setApiError(null)
    setIsLoading(true)

    try {
      const payload = {
        name: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phone,
        level: values.examType,
        subjectsOfInterest: values.subjects,
        isDSA: values.isDSA === 'yes',
        studentId: values.studentId,
      }

      await dsaApi.auth.register(payload)

      // Store email for the OTP page to use
      localStorage.setItem('dsa_pending_email', values.email)

      // REDIRECT to verify-otp instead of signin
      router.push('/auth/verify-otp')
    } catch (error: any) {
      const msg = error.message || 'Registration failed. Please try again.'
      setApiError(msg)
    } finally {
      setIsLoading(false)
    }
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
          {apiError && (
            <div className='mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[11px] font-bold uppercase tracking-wider text-center'>
              {apiError}
            </div>
          )}

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
                            className='absolute right-3 top-3 text-gray-400'
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
                            className='absolute right-3 top-3 text-gray-400'
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
                        <SelectItem value='jamb'>JAMB (UTME)</SelectItem>
                        <SelectItem value='waec'>WAEC/NECO</SelectItem>
                        <SelectItem value='post-utme'>Post-UTME</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-[10px]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subjects'
                render={() => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-black uppercase text-gray-400 flex justify-between'>
                      <span>Subjects</span>
                      <span className='text-[#002EFF]'>
                        {form.watch('subjects').length}/4
                      </span>
                    </FormLabel>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-3xl'>
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
                                    const currentValues = field.value || []
                                    return checked
                                      ? field.onChange([
                                          ...currentValues,
                                          subject,
                                        ])
                                      : field.onChange(
                                          currentValues.filter(
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

              <div className='p-5 rounded-4xl bg-blue-50/50 border border-blue-100'>
                <FormField
                  control={form.control}
                  name='isDSA'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel className='text-[10px] font-black uppercase text-[#002EFF]'>
                        DSA Student?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => {
                            field.onChange(val)
                            setIsDSAStudent(val === 'yes')
                          }}
                          value={field.value}
                          className='flex gap-6'
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='yes' id='yes' />
                            <FormLabel
                              htmlFor='yes'
                              className='font-black text-xs'
                            >
                              YES
                            </FormLabel>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='no' id='no' />
                            <FormLabel
                              htmlFor='no'
                              className='font-black text-xs'
                            >
                              NO
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
                      className='mt-4 overflow-hidden'
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
                disabled={isLoading}
                className='w-full bg-[#002EFF] hover:bg-blue-700 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100'
              >
                {isLoading ? (
                  <Loader2 className='animate-spin' size={18} />
                ) : (
                  <>
                    Create Account <ArrowRight className='ml-2' size={16} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className='mt-8 text-sm font-bold text-gray-400 uppercase'>
        Already a member?{' '}
        <Link href='/auth/signin' className='text-[#002EFF] hover:underline'>
          Login
        </Link>
      </p>
    </div>
  )
}