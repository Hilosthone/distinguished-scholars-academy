'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Users,
  Lock,
  Unlock,
  Database,
  Search,
  LogOut,
  BarChart3,
  Settings,
  GraduationCap,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Filter,
  Bell,
  ChevronDown,
} from 'lucide-react'

const INITIAL_STUDENTS = [
  {
    id: 'DSA-001',
    full_name: 'Hilosthone A',
    status: 'active',
    email: 'hilosthone@gmail.com',
    performance: 88,
  },
  {
    id: 'DSA-002',
    full_name: 'Sarah Adebayo',
    status: 'restricted',
    email: 'sarah.a@gmail.com',
    performance: 45,
  },
  {
    id: 'DSA-003',
    full_name: 'John Dumelo',
    status: 'active',
    email: 'john.d@outlook.com',
    performance: 92,
  },
]

const SUBJECTS = ['ENG', 'MAT', 'PHY', 'CHEM', 'BIO', 'GOV', 'ECO', 'LIT']

export default function AdminDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<
    'students' | 'add-question' | 'analytics' | 'settings'
  >('students')
  const [students, setStudents] = useState(INITIAL_STUDENTS)

  const [form, setForm] = useState({
    examType: 'JAMB',
    subject: 'ENG',
    question: '', 
    options: {
      a: '',
      b: '',
      c: '',
      d: '',
    },
    correct: 'a',
  })

  useEffect(() => setMounted(true), [])

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'restricted' : 'active'
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    )
  }

  if (!mounted) return null

  const NavItem = ({ id, icon: Icon, label }: any) => {
    const isActive = tab === id
    return (
      <button
        onClick={() => setTab(id)}
        className={`relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? 'text-blue-600 md:bg-blue-600 md:text-white shadow-blue-900/20'
            : 'text-slate-400 md:text-blue-100/60 hover:text-blue-600 md:hover:bg-blue-600/20 md:hover:text-white'
        }`}
      >
        <Icon
          size={20}
          className={
            isActive ? 'scale-110 md:scale-100 transition-transform' : ''
          }
        />
        <span className='text-[10px] md:text-sm font-bold md:font-medium'>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId='activeTab'
            className='absolute -top-3 md:hidden w-1 h-1 bg-blue-600 rounded-full'
          />
        )}
      </button>
    )
  }

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
      <div className='flex justify-between items-start mb-4'>
        <div className='p-2 bg-blue-50 rounded-lg text-blue-600'>
          <Icon size={20} />
        </div>
        <span className='flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full'>
          <ArrowUpRight size={12} /> {trend}
        </span>
      </div>
      <p className='text-slate-500 text-xs font-medium uppercase tracking-wider'>
        {title}
      </p>
      <h3 className='text-2xl font-bold text-slate-900 mt-1'>{value}</h3>
    </div>
  )

  return (
    <div className='min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-slate-900 pb-24 md:pb-0'>
      {/* Desktop Sidebar */}
      <aside className='hidden md:flex w-72 bg-blue-700 text-white p-8 flex-col sticky top-0 h-screen z-20 shadow-xl'>
        <div className='flex items-center gap-3 mb-12'>
          <div className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
            <GraduationCap size={24} className='text-white' />
          </div>
          <div>
            <h1 className='font-bold text-lg tracking-tight leading-none'>
              DSA <span className='text-blue-400'>PORTAL</span>
            </h1>
            <span className='text-[10px] text-blue-300 font-bold uppercase tracking-widest'>
              Management
            </span>
          </div>
        </div>
        <nav className='space-y-2 flex-1'>
          <NavItem id='students' label='Scholar Base' icon={Users} />
          <NavItem id='add-question' label='Question Bank' icon={Database} />
          <NavItem id='analytics' label='Intelligence' icon={BarChart3} />
          <div className='pt-8 border-t border-blue-600/50 mt-4'>
            <NavItem id='settings' label='System Settings' icon={Settings} />
          </div>
        </nav>
        <button
          onClick={() => router.push('/signin')}
          className='mt-auto flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all'
        >
          <LogOut size={18} /> End Session
        </button>
      </aside>

      {/* Mobile Bottom Navbar */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0,0.05)]'>
        <NavItem id='students' label='Scholars' icon={Users} />
        <NavItem id='add-question' label='Library' icon={Database} />
        <NavItem id='analytics' label='Stats' icon={BarChart3} />
        <NavItem id='settings' label='Config' icon={Settings} />
      </nav>

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col'>
        <header className='h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-40'>
          <div className='flex items-center gap-3'>
            <div className='md:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white'>
              <GraduationCap size={18} />
            </div>
            <h2 className='font-bold text-slate-800 capitalize tracking-tight hidden sm:block'>
              {tab.replace('-', ' ')}
            </h2>
          </div>

          {/* Right Header: Notifications & Profile */}
          <div className='flex items-center gap-2 md:gap-6'>
            {/* Notification Bell */}
            <button className='relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all'>
              <Bell size={22} />
              <span className='absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full' />
            </button>

            {/* Vertical Divider */}
            <div className='h-8 w-px bg-slate-200 hidden md:block' />

            {/* Profile Section */}
            <div className='flex items-center gap-3 pl-2 group cursor-pointer'>
              <div className='hidden md:flex flex-col items-end'>
                <span className='text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors'>
                  Admin User
                </span>
                <span className='text-[10px] text-emerald-600 font-bold uppercase bg-emerald-50 px-1.5 rounded'>
                  Master
                </span>
              </div>
              <div className='relative'>
                <div className='w-10 h-10 rounded-xl bg-linear-to-tr from-blue-700 to-blue-400 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs'>
                  AD
                </div>
                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full' />
              </div>
              <ChevronDown
                size={14}
                className='text-slate-400 hidden md:block'
              />
            </div>
          </div>
        </header>

        <div className='p-6 md:p-12 max-w-7xl w-full mx-auto'>
          <AnimatePresence mode='wait'>
            {tab === 'students' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key='students'
              >
                {/* Stats Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10'>
                  <StatCard
                    title='Scholars'
                    value='1,284'
                    icon={Users}
                    trend='12%'
                  />
                  <StatCard
                    title='System Load'
                    value='42%'
                    icon={Activity}
                    trend='0.8%'
                  />
                  <StatCard
                    title='Performance'
                    value='76.4%'
                    icon={TrendingUp}
                    trend='4%'
                  />
                </div>

                {/* Main Table */}
                <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                  <div className='p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <div className='relative w-full sm:max-w-xs'>
                      <Search
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                        size={16}
                      />
                      <input
                        placeholder='Filter scholars...'
                        className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-600 transition-all'
                      />
                    </div>
                    <button className='w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all'>
                      <Filter size={16} /> Advanced Filter
                    </button>
                  </div>

                  <div className='overflow-x-auto'>
                    <table className='w-full text-left'>
                      <thead className='bg-slate-50/50 border-b border-slate-100'>
                        <tr className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                          <th className='px-6 py-4'>Scholar Identity</th>
                          <th className='hidden md:table-cell px-6 py-4'>
                            Index
                          </th>
                          <th className='px-6 py-4'>Auth Status</th>
                          <th className='px-6 py-4 text-right'>Action</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-slate-100'>
                        {students.map((s) => (
                          <tr
                            key={s.id}
                            className='hover:bg-blue-50/20 transition-colors group'
                          >
                            <td className='px-6 py-4'>
                              <div className='font-bold text-slate-800 text-sm'>
                                {s.full_name}
                              </div>
                              <div className='text-[10px] text-slate-400'>
                                {s.id}
                              </div>
                            </td>
                            <td className='hidden md:table-cell px-6 py-4'>
                              <div className='flex items-center gap-2'>
                                <div className='w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden'>
                                  <div
                                    className='h-full bg-blue-600'
                                    style={{ width: `${s.performance}%` }}
                                  />
                                </div>
                                <span className='text-[10px] font-bold text-slate-500'>
                                  {s.performance}%
                                </span>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                              >
                                {s.status}
                              </span>
                            </td>
                            <td className='px-6 py-4 text-right'>
                              <button
                                onClick={() => toggleStatus(s.id, s.status)}
                                className={`p-2 rounded-lg transition-all ${s.status === 'active' ? 'text-slate-300 hover:text-rose-500' : 'text-blue-600 bg-blue-50'}`}
                              >
                                {s.status === 'active' ? (
                                  <Lock size={18} />
                                ) : (
                                  <Unlock size={18} />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'add-question' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key='form'
                className='max-w-2xl mx-auto'
              >
                {/* Question Form remains similar but with refined spacing */}
                <div className='bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden'>
                  {/* Header */}
                  <div className='bg-blue-600 p-6 md:p-8 text-white flex justify-between items-center'>
                    <div>
                      <h2 className='text-lg font-bold'>Central Database</h2>
                      <p className='text-blue-200 text-[10px] uppercase font-bold tracking-widest mt-1'>
                        Question Entry System
                      </p>
                    </div>
                    <div className='bg-blue-500/30 px-3 py-1 rounded-full border border-blue-400/30'>
                      <span className='text-[10px] font-black uppercase'>
                        Pro Editor
                      </span>
                    </div>
                  </div>

                  <form className='p-6 md:p-10 space-y-8'>
                    {/* Meta Row: Exam Body & Subject */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-[10px] font-bold text-slate-400 uppercase'>
                          Examination Body
                        </label>
                        <select className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all'>
                          <option>JAMB (UTME)</option>
                          <option>WAEC (WASSCE)</option>
                          <option>NECO (SSCE)</option>
                          <option>Post-UTME</option>
                        </select>
                      </div>
                      <div className='space-y-2'>
                        <label className='text-[10px] font-bold text-slate-400 uppercase'>
                          Subject Category
                        </label>
                        <select className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all'>
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Question Text Area */}
                    <div className='space-y-2'>
                      <div className='flex justify-between items-end'>
                        <label className='text-[10px] font-bold text-slate-400 uppercase'>
                          Content Prompt
                        </label>
                        <button
                          type='button'
                          className='text-[10px] font-bold text-blue-600 hover:underline'
                        >
                          Add Diagram +
                        </button>
                      </div>
                      <textarea
                        placeholder='Type question content here...'
                        className='w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 text-sm focus:bg-white focus:border-blue-600 outline-none transition-all'
                      />
                    </div>

                    {/* Options Grid */}
                    <div className='space-y-4'>
                      <label className='text-[10px] font-bold text-slate-400 uppercase'>
                        Answer Variants
                      </label>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {['a', 'b', 'c', 'd'].map((opt) => (
                          <div key={opt} className='relative flex items-center'>
                            <span
                              className={`absolute left-4 text-[10px] font-black uppercase ${form.correct === opt ? 'text-blue-600' : 'text-slate-400'}`}
                            >
                              {opt}
                            </span>
                            <input
                              type='text'
                              placeholder={`Option ${opt.toUpperCase()}`}
                              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm outline-none transition-all ${
                                form.correct === opt
                                  ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600'
                                  : 'border-slate-200 focus:border-blue-400'
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pro Feature: Correct Answer Selection */}
                    <div className='pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6'>
                      <div className='flex flex-col gap-2 w-full md:w-auto'>
                        <label className='text-[10px] font-bold text-slate-400 uppercase'>
                          Mark Correct Key
                        </label>
                        <div className='flex gap-2 p-1 bg-slate-100 rounded-2xl'>
                          {['a', 'b', 'c', 'd'].map((opt) => (
                            <button
                              key={opt}
                              type='button'
                              onClick={() => setForm({ ...form, correct: opt })}
                              className={`w-12 h-10 rounded-xl text-xs font-black uppercase transition-all ${
                                form.correct === opt
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                  : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button className='w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2'>
                        <Database size={18} />
                        COMMIT TO QUIZ
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}