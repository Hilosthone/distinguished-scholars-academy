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
  BookOpen,
  Mail,
  Phone,
  Lock,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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
    phone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Min 6 characters'),
    confirmPassword: z.string(),
    examType: z.string().min(1, 'Select an exam type'),
    subjects: z.array(z.string()).min(1, 'Select at least 1 subject'),
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
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
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
    router.push('/signin')
  }

  return (
    <div className='min-h-screen bg-[#F8FAFF] py-6 md:py-12 px-4 flex flex-col items-center font-sans'>
      {/* Header Section */}
      <div className='text-center mb-8'>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='bg-[#002EFF] text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200'
        >
          <GraduationCap size={28} />
        </motion.div>
        <h1 className='text-xl md:text-2xl font-black text-zinc-900 uppercase tracking-tight'>
          DSA Rapid Quiz Portal
        </h1>
        <p className='text-gray-500 text-xs md:text-sm font-medium mt-1'>
          Practice smart. Test fast. Improve daily.
        </p>
      </div>

      {/* Main Form Card - Responsive Widths Added Here */}
      <Card className='w-full max-w-md md:max-w-lg lg:max-w-xl rounded-4xl shadow-2xl border-none overflow-hidden bg-white/80 backdrop-blur-sm'>
        <div className='h-1.5 bg-[#002EFF]' />
        <CardHeader className='space-y-1 pb-4 md:pb-6'>
          <CardTitle className='text-lg md:text-xl font-bold text-center'>
            Create My Quiz Account
          </CardTitle>
          <CardDescription className='text-center text-xs md:text-sm'>
            Practice for UTME, WAEC & Post-UTME
          </CardDescription>
        </CardHeader>

        <CardContent className='px-4 md:px-8'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              {/* Personal Info Group */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='fullname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Full Name'
                          {...field}
                          className='rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all'
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
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                        Phone (WhatsApp)
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Phone
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                            size={14}
                          />
                          <Input
                            placeholder='080...'
                            {...field}
                            className='pl-9 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all'
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail
                          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                          size={14}
                        />
                        <Input
                          placeholder='student@example.com'
                          {...field}
                          className='pl-9 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[10px]' />
                  </FormItem>
                )}
              />

              {/* Password Group */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                            size={14}
                          />
                          <Input
                            placeholder='••••••••••••••••'
                            type='password'
                            {...field}
                            className='pl-9 rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all'
                          />
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
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                        Confirm
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='••••••••••••••••'
                          type='password'
                          {...field}
                          className='rounded-xl bg-gray-50/50 border-gray-100 focus:bg-white transition-all'
                        />
                      </FormControl>
                      <FormMessage className='text-[10px]' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Selection Group */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='examType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 tracking-wider'>
                        Target Exam
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='rounded-xl bg-gray-50/50 border-gray-100'>
                            <SelectValue placeholder='Select Exam Type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-xl'>
                          <SelectItem value='utme'>UTME (JAMB)</SelectItem>
                          <SelectItem value='waec'>WAEC / NECO</SelectItem>
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
                      <FormLabel className='text-[10px] font-bold uppercase text-gray-400 flex items-center gap-2'>
                        <BookOpen size={12} /> Preferred Subjects (Select 4)
                      </FormLabel>
                      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-50/80 p-3 rounded-2xl border border-gray-100'>
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
                                <FormLabel className='text-[10px] md:text-[11px] font-medium cursor-pointer'>
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
              </div>

              {/* Status Section */}
              <div className='p-4 rounded-2xl bg-blue-50/30 border border-blue-100/50'>
                <FormField
                  control={form.control}
                  name='isDSA'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel className='text-[10px] font-bold uppercase text-[#002EFF]'>
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
                          {['yes', 'no'].map((opt) => (
                            <div
                              key={opt}
                              className='flex items-center space-x-2'
                            >
                              <RadioGroupItem value={opt} id={opt} />
                              <FormLabel
                                htmlFor={opt}
                                className='font-bold text-xs uppercase cursor-pointer'
                              >
                                {opt}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AnimatePresence>
                  {isDSAStudent && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className='mt-3'
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
                                className='rounded-xl bg-white border-blue-200 text-sm h-10'
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Section */}
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='consent'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className='text-[10px] text-gray-500 leading-normal'>
                        I agree to the{' '}
                        <Link
                          href='#'
                          className='underline font-bold text-gray-700'
                        >
                          Terms
                        </Link>{' '}
                        and consent to receive WhatsApp reminders.
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full bg-[#002EFF] hover:bg-blue-700 h-12 md:h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-100 transition-all active:scale-[0.98]'
                >
                  Join Rapid Quiz <ArrowRight className='ml-2' size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Footer Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='mt-8 pb-10 text-center'
      >
        <p className='text-gray-500 text-sm font-medium'>
          Already have an account?{' '}
          <Link
            href='/signin'
            className='text-[#002EFF] font-black uppercase tracking-wider hover:underline ml-1'
          >
            Login Here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
