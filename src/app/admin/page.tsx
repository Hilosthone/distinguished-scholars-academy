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
  Filter,
  Bell,
  BookOpen,
  LayoutDashboard,
  Zap,
  Menu,
  X,
} from 'lucide-react'

const INITIAL_STUDENTS = [
  {
    id: 'DSA-001',
    full_name: 'Hilosthone A',
    status: 'active',
    email: 'hilosthone@gmail.com',
    performance: 88,
    cohort: 'JAMB 2026',
  },
  {
    id: 'DSA-002',
    full_name: 'Sarah Adebayo',
    status: 'restricted',
    email: 'sarah.a@gmail.com',
    performance: 45,
    cohort: 'WAEC 2026',
  },
  {
    id: 'DSA-003',
    full_name: 'John Dumelo',
    status: 'active',
    email: 'john.d@outlook.com',
    performance: 92,
    cohort: 'JAMB 2026',
  },
]

const SUBJECTS = ['ENG', 'MAT', 'PHY', 'CHEM', 'BIO', 'GOV', 'ECO', 'LIT']

export default function AdminNexus() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [tab, setTab] = useState('overview')
  const [students, setStudents] = useState(INITIAL_STUDENTS)

  useEffect(() => setMounted(true), [])

  const toggleStatus = (id: string, currentStatus: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: currentStatus === 'active' ? 'restricted' : 'active',
            }
          : s,
      ),
    )
  }

  if (!mounted) return null

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scholars', label: 'Scholars', icon: Users },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'intelligence', label: 'Analytics', icon: BarChart3 },
    { id: 'config', label: 'Settings', icon: Settings },
  ]

  return (
    <div className='min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-100'>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className='fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-60 lg:hidden'
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Following the Blue BG Request */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-70 w-64 bg-blue-600 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `}
      >
        <div className='p-6 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20'>
              <GraduationCap size={20} className='text-white' />
            </div>
            <span className='font-bold tracking-tight text-sm'>
              DSA.<span className='text-blue-200'>ADMIN</span>
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='lg:hidden text-blue-100 hover:text-white'
          >
            <X size={20} />
          </button>
        </div>

        <nav className='flex-1 px-4 space-y-1 mt-4'>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id)
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === item.id
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-800/20'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon
                size={18}
                className={tab === item.id ? 'opacity-100' : 'opacity-70'}
              />
              {item.label}
            </button>
          ))}
        </nav>

        <div className='p-4 border-t border-blue-500/50'>
          <button
            onClick={() => router.push('/auth/login')}
            className='w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-100 hover:text-white transition-colors group'
          >
            <LogOut
              size={18}
              className='group-hover:-translate-x-1 transition-transform'
            />{' '}
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 min-w-0 flex flex-col h-screen overflow-hidden'>
        <header className='h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg'
            >
              <Menu size={20} />
            </button>
            <div className='flex items-center gap-2'>
              <div className='w-1.5 h-1.5 rounded-full bg-blue-600' />
              <h2 className='text-xs font-bold text-slate-500 uppercase tracking-[0.15em]'>
                {tab}
              </h2>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button className='p-2 text-slate-400 hover:text-blue-600 relative'>
              <Bell size={18} />
              <span className='absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white' />
            </button>
            <div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-blue-200'>
              AD
            </div>
          </div>
        </header>

        <div className='flex-1 overflow-y-auto p-4 lg:p-10'>
          <div className='max-w-6xl mx-auto space-y-6 pb-10'>
            <AnimatePresence mode='wait'>
              {tab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='space-y-6'
                >
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                    <MiniStat
                      title='Total Scholars'
                      value='1,284'
                      icon={Users}
                      color='text-blue-600'
                    />
                    <MiniStat
                      title='Tests Taken'
                      value='856'
                      icon={Zap}
                      color='text-amber-500'
                    />
                    <MiniStat
                      title='Avg Score'
                      value='76.4%'
                      icon={TrendingUp}
                      color='text-emerald-500'
                    />
                  </div>

                  <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
                    <div className='px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30'>
                      <div className='relative flex-1 min-w-60'>
                        <Search
                          className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                          size={14}
                        />
                        <input
                          className='w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 outline-none transition-all'
                          placeholder='Search records...'
                        />
                      </div>
                      <button className='px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl flex items-center gap-2 hover:border-blue-500 transition-colors'>
                        <Filter size={14} /> Filter List
                      </button>
                    </div>

                    <div className='overflow-x-auto'>
                      <table className='w-full text-left text-sm'>
                        <thead className='bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest'>
                          <tr>
                            <th className='px-6 py-4'>Scholar Identity</th>
                            <th className='px-6 py-4 hidden md:table-cell'>
                              Cohort
                            </th>
                            <th className='px-6 py-4'>Status</th>
                            <th className='px-6 py-4 text-right'>Actions</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                          {students.map((s) => (
                            <tr
                              key={s.id}
                              className='hover:bg-blue-50/30 transition-colors'
                            >
                              <td className='px-6 py-4'>
                                <p className='font-bold text-slate-900'>
                                  {s.full_name}
                                </p>
                                <p className='text-[10px] text-slate-400 font-mono'>
                                  {s.id}
                                </p>
                              </td>
                              <td className='px-6 py-4 hidden md:table-cell'>
                                <span className='text-xs font-medium text-slate-600'>
                                  {s.cohort}
                                </span>
                              </td>
                              <td className='px-6 py-4'>
                                <span
                                  className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${s.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
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
                                    <Lock size={16} />
                                  ) : (
                                    <Unlock size={16} />
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
              {tab === 'library' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='max-w-2xl mx-auto bg-white p-8 border border-slate-200 rounded-4xl shadow-xl'
                >
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-blue-600 rounded-2xl text-white'>
                      <Database size={24} />
                    </div>
                    <div>
                      <h3 className='font-black text-xl text-slate-900'>
                        Archive Manager
                      </h3>
                      <p className='text-xs text-slate-400 font-bold uppercase tracking-widest'>
                        Library v2.0
                      </p>
                    </div>
                  </div>
                  <div className='grid gap-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-[10px] font-black text-slate-400 uppercase ml-1'>
                          Exam Subject
                        </label>
                        <select className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all'>
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className='space-y-2'>
                        <label className='text-[10px] font-black text-slate-400 uppercase ml-1'>
                          Reference Year
                        </label>
                        <input
                          type='number'
                          defaultValue={2026}
                          className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all'
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-[10px] font-black text-slate-400 uppercase ml-1'>
                        Question Meta
                      </label>
                      <textarea
                        placeholder='Type your question here...'
                        className='w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-40 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-sm'
                      />
                    </div>
                    <button className='bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2'>
                      <Database size={18} /> Update quiz library
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

function MiniStat({ title, value, icon: Icon, color }: any) {
  return (
    <div className='bg-white p-5 border border-slate-200 rounded-[1.25rem] flex items-center gap-5 hover:border-blue-200 transition-colors shadow-sm'>
      <div className={`p-3 rounded-xl bg-slate-50 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>
          {title}
        </p>
        <p className='text-xl font-black text-slate-900 leading-none'>
          {value}
        </p>
      </div>
    </div>
  )
}
