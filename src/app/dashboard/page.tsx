'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Play,
  Trophy,
  ChevronRight,
  Target,
  Sparkles,
  Bell,
  Home,
  User,
  Search,
  Zap,
  Timer,
  Globe,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const chartData = [
  { day: 'M', score: 65 },
  { day: 'T', score: 59 },
  { day: 'W', score: 80 },
  { day: 'T', score: 81 },
  { day: 'F', score: 56 },
  { day: 'S', score: 95 },
  { day: 'S', score: 88 },
]

export default function DashboardPage() {
  const [hasActiveQuiz, setHasActiveQuiz] = useState(false)
  const [studentName, setStudentName] = useState('Hilosthone')
  const [targetScore, setTargetScore] = useState(78)

  useEffect(() => {
    // 1. Check for active quiz sessions
    const session = localStorage.getItem('quiz_session')
    if (session) setHasActiveQuiz(true)

    // 2. Load personalized settings (fallback to defaults if empty)
    const savedName = localStorage.getItem('student_name')
    const savedTarget = localStorage.getItem('biology_target')

    if (savedName) setStudentName(savedName)
    if (savedTarget) setTargetScore(parseInt(savedTarget))
  }, [])

  // Calculate SVG dash offset based on targetScore (0 to 100)
  // formula: circumference - (percent * circumference / 100)
  const circumference = 251
  const strokeDashoffset = circumference - (targetScore * circumference) / 100

  return (
    <div className='max-w-5xl mx-auto space-y-4 p-3 md:p-6 pb-24 md:pb-10 bg-[#FAFBFF] min-h-screen'>
      {/* 1. Ultra-Slim Header */}
      <div className='flex justify-between items-center px-1'>
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white hover:shadow-sm transition-all group'
          >
            <Globe
              size={12}
              className='text-gray-400 group-hover:text-blue-600 transition-colors'
            />
            <span className='text-[9px] font-black text-gray-400 group-hover:text-zinc-900 uppercase tracking-widest transition-colors'>
              Main Website
            </span>
          </Link>

          <div className='hidden md:block h-3 w-px bg-gray-200' />

          <div className='hidden md:block'>
            <h2 className='text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]'>
              System / Dashboard
            </h2>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='relative cursor-pointer hover:bg-white hover:shadow-sm p-2 rounded-xl transition-all border border-transparent hover:border-gray-100'>
            <Bell size={14} className='text-gray-500' />
            <span className='absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full border border-white animate-pulse' />
          </div>

          <Link href='/dashboard/settings'>
            <div className='h-7 w-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden hover:border-blue-400 transition-all cursor-pointer'>
              <User size={14} className='text-gray-400' />
            </div>
          </Link>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className='relative overflow-hidden bg-[#002EFF] rounded-2xl p-5 md:p-6 text-white shadow-[0_20px_50px_rgba(0,46,255,0.2)]'>
        <div className='relative z-10 flex justify-between items-center gap-4'>
          <div className='max-w-[65%]'>
            <div className='inline-flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 mb-2'>
              <Sparkles size={8} className='text-blue-200' />
              <span className='text-[8px] font-bold uppercase tracking-widest'>
                Elite Tier
              </span>
            </div>
            <h1 className='text-lg md:text-xl font-black tracking-tight mb-1'>
              Welcome, {studentName}
            </h1>
            <p className='text-blue-100 text-[10px] opacity-80 leading-relaxed max-w-xs'>
              You're in the <strong>Top 5%</strong>. Master{' '}
              <strong>Biology</strong> today to maintain your streak.
            </p>
            <div className='mt-4 flex gap-2'>
              <Link href='/rapid-quiz'>
                <Button
                  size='sm'
                  className={`h-7 rounded-lg px-3 font-bold uppercase text-[8px] tracking-widest shadow-xl transition-all active:scale-95 ${
                    hasActiveQuiz
                      ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-orange-900/20'
                      : 'bg-white text-[#002EFF] hover:bg-blue-50 shadow-blue-900/20'
                  }`}
                >
                  {hasActiveQuiz ? 'Resume Quiz' : 'Start Practice'}{' '}
                  <Play className='ml-1 fill-current' size={8} />
                </Button>
              </Link>
            </div>
          </div>

          <div className='relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0'>
            <svg className='w-full h-full -rotate-90 filter drop-shadow-lg'>
              <circle
                cx='50%'
                cy='50%'
                r='40%'
                stroke='currentColor'
                strokeWidth='4'
                fill='transparent'
                className='text-white/10'
              />
              <circle
                cx='50%'
                cy='50%'
                r='40%'
                stroke='currentColor'
                strokeWidth='4'
                fill='transparent'
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className='text-white transition-all duration-1000 ease-out'
                strokeLinecap='round'
              />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center text-xs md:text-sm font-black'>
              {targetScore}%
            </div>
          </div>
        </div>
        <div className='absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl' />
      </section>

      <StatsGrid compact />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        {/* 4. Analytics Card */}
        <Card className='lg:col-span-8 rounded-2xl p-4 border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] bg-white'>
          <div className='mb-6'>
            <h3 className='font-black text-gray-900 text-[9px] uppercase tracking-[0.2em]'>
              Performance
            </h3>
            <p className='text-[9px] text-gray-400 font-medium'>
              Weekly Score Distribution
            </p>
          </div>
          <div className='h-40 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id='colorScore' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#002EFF' stopOpacity={0.15} />
                    <stop offset='95%' stopColor='#002EFF' stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray='3 3'
                  vertical={false}
                  stroke='#f0f0f0'
                />
                <XAxis
                  dataKey='day'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#9ca3af' }}
                  dy={10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    fontSize: '9px',
                    fontWeight: 'bold',
                  }}
                />
                <Area
                  type='monotone'
                  dataKey='score'
                  stroke='#002EFF'
                  strokeWidth={3}
                  fill='url(#colorScore)'
                  dot={{ r: 3, fill: '#002EFF', stroke: '#fff' }}
                  activeDot={{ r: 5, fill: '#002EFF' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 5. Side Column */}
        <div className='lg:col-span-4 space-y-4'>
          <Link href='/rapid-quiz'>
            <Card className='rounded-2xl p-4 border-none shadow-sm bg-white hover:border-blue-100 border transition-all group cursor-pointer'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all'>
                    <Timer size={16} />
                  </div>
                  <div>
                    <h3 className='font-black text-zinc-900 text-[10px] uppercase tracking-wider'>
                      Rapid Quiz
                    </h3>
                    <p className='text-[8px] text-zinc-400 font-bold uppercase'>
                      Timed Simulation
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className='text-zinc-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all'
                />
              </div>
            </Card>
          </Link>

          <Card className='rounded-2xl p-4 border-none shadow-sm bg-white text-zinc-900'>
            <div className='flex justify-between items-center mb-4 text-zinc-900'>
              <h3 className='font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2'>
                <Trophy size={10} className='text-amber-500' /> Rankings
              </h3>
            </div>
            <div className='space-y-2.5'>
              {[
                {
                  name: 'Amaka V.',
                  score: '2,840',
                  rank: 1,
                  color: 'bg-amber-100 text-amber-600',
                },
                {
                  name: `${studentName} (You)`,
                  score: '2,450',
                  rank: 2,
                  color: 'bg-blue-600 text-white',
                },
              ].map((user) => (
                <div
                  key={user.name}
                  className='flex items-center justify-between group cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className={`w-5 h-5 rounded-lg text-[8px] font-black flex items-center justify-center ${user.color}`}
                    >
                      {user.rank}
                    </span>
                    <span className='text-[10px] font-bold text-gray-700'>
                      {user.name}
                    </span>
                  </div>
                  <span className='text-[9px] font-black text-gray-400'>
                    {user.score} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className='rounded-2xl p-4 border-none shadow-lg bg-zinc-900 text-white relative overflow-hidden group'>
            <div className='relative z-10'>
              <div className='flex items-center gap-2 mb-1'>
                <Zap size={10} className='text-blue-400 fill-blue-400' />
                <h3 className='font-black text-[10px] uppercase tracking-widest'>
                  Daily Blitz
                </h3>
              </div>
              <p className='text-[9px] text-zinc-400 mb-3 font-medium'>
                Solve 5 Math problems
              </p>
              <Button
                size='sm'
                className='h-7 w-full bg-blue-600 hover:bg-blue-500 rounded-lg text-[8px] font-black uppercase tracking-widest'
              >
                Accept +50XP
              </Button>
            </div>
            <div className='absolute -bottom-4 -right-4 text-white/5 rotate-12'>
              <Target size={80} />
            </div>
          </Card>
        </div>
      </div>

      {/* 6. Subject Grid */}
      <section className='pt-2'>
        <div className='flex justify-between items-center mb-3 px-1'>
          <h3 className='font-black text-gray-900 text-[9px] uppercase tracking-[0.2em]'>
            Recommended
          </h3>
          <button className='text-[8px] font-black text-[#002EFF] tracking-widest uppercase hover:underline'>
            View All
          </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {['Biology', 'Chemistry', 'Physics', 'English'].map((name, idx) => (
            <Link href='/rapid-quiz' key={name}>
              <Card className='group p-3.5 rounded-2xl border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-white'>
                <div
                  className={`w-7 h-7 bg-gray-50 rounded-xl mb-2.5 flex items-center justify-center transition-all group-hover:bg-[#002EFF] group-hover:text-white`}
                >
                  <Target size={14} />
                </div>
                <h4 className='font-black text-[11px] text-gray-900 tracking-tight'>
                  {name}
                </h4>
                <p className='text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5'>
                  12 Topics
                </p>
                <div className='mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
                  <ArrowRight size={10} className='text-blue-600' />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Mobile Floating Dock */}
      <nav className='fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] md:hidden bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-around items-center'>
        <Link
          href='/dashboard'
          className='flex flex-col items-center py-1.5 px-3 rounded-xl bg-blue-600 text-white'
        >
          <Home size={16} strokeWidth={3} />
          <span className='text-[6px] font-black uppercase mt-1 tracking-widest'>
            Home
          </span>
        </Link>
        <Link
          href='/rapid-quiz'
          className='flex flex-col items-center py-1.5 px-3 rounded-xl text-zinc-500'
        >
          <Timer size={16} />
          <span className='text-[6px] font-black uppercase mt-1 tracking-widest'>
            Quiz
          </span>
        </Link>
        <div className='flex flex-col items-center py-1.5 px-3 rounded-xl text-zinc-500'>
          <Search size={16} />
        </div>
        <Link
          href='/dashboard/settings'
          className='flex flex-col items-center py-1.5 px-3 rounded-xl text-zinc-500'
        >
          <User size={16} />
          <span className='text-[6px] font-black uppercase mt-1 tracking-widest'>
            Profile
          </span>
        </Link>
      </nav>
    </div>
  )
}