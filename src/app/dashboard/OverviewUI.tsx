'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Timer,
  Zap,
  Trophy,
  CheckCircle2,
  Flame,
  Target,
  Rocket,
} from 'lucide-react'

// Sub-component for the stats at the bottom
function SmallStat({ label, value, icon: Icon, color }: any) {
  return (
    <Card className='p-3 rounded-2xl border-none shadow-sm bg-white flex items-center gap-3'>
      <div
        className={`h-9 w-9 bg-blue-50/50 ${color} rounded-xl flex items-center justify-center shrink-0 shadow-inner`}
      >
        <Icon size={18} strokeWidth={3} />
      </div>
      <div>
        <p className='text-[8px] font-black text-gray-400 uppercase leading-none mb-0.5'>
          {label}
        </p>
        <p className='text-xs font-black text-gray-900 leading-none'>{value}</p>
      </div>
    </Card>
  )
}

export default function OverviewUI({
  setView,
}: {
  setView: (view: any) => void
}) {
  const studentName = 'Hilosthone' // This could eventually come from props or a store

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* --- MAIN WELCOME BANNER --- */}
        <section className='lg:col-span-2 relative overflow-hidden bg-[#002EFF] rounded-4xl p-8 text-white shadow-lg'>
          <div className='relative z-10 space-y-4'>
            <Badge className='bg-[#FCB900] text-[#002EFF] hover:bg-[#FCB900] border-none font-black px-3 py-1'>
              <Flame size={12} className='mr-1 fill-[#002EFF]' /> 15 DAY STREAK
            </Badge>
            <h1 className='text-3xl md:text-4xl font-black uppercase italic tracking-tight'>
              Road to <span className='text-[#FCB900]'>JAMB 2026</span>
            </h1>
            <p className='text-blue-100 text-xs md:text-sm max-w-sm font-medium'>
              "The beautiful thing about learning is that no one can take it
              away from you."
            </p>
            <Button
              onClick={() => setView('quiz360')}
              className='bg-[#FCB900] text-[#002EFF] font-black rounded-xl text-[10px] px-8 h-10 shadow-lg shadow-yellow-400/20 active:scale-95 transition-transform'
            >
              LAUNCH QUIZ360 <Rocket className='ml-2' size={14} />
            </Button>
          </div>
          {/* Background Decorative Icon */}
          <Target
            size={180}
            className='text-white/10 absolute -right-8 -bottom-8 rotate-12 pointer-events-none'
          />
        </section>

        {/* --- COUNTDOWN CARD --- */}
        <Card className='rounded-4xl p-6 bg-white border-none shadow-sm flex flex-col items-center justify-center text-center'>
          <p className='text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2'>
            Days Until UTME
          </p>
          <div className='flex items-baseline gap-1'>
            <span className='text-5xl font-black text-[#002EFF] tracking-tighter'>
              54
            </span>
            <span className='text-xs font-black text-[#FCB900]'>DAYS LEFT</span>
          </div>
          <div className='w-full mt-6 h-2 bg-blue-50 rounded-full overflow-hidden'>
            <div className='bg-linear-to-r from-[#002EFF] to-[#FCB900] h-full w-[65%]' />
          </div>
        </Card>
      </div>

      {/* --- QUICK STATS GRID --- */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <SmallStat
          label='Avg Score'
          value='78%'
          icon={Timer}
          color='text-blue-600'
        />
        <SmallStat
          label='Topics'
          value='12/40'
          icon={Zap}
          color='text-yellow-500'
        />
        <SmallStat
          label='Global Rank'
          value='#12'
          icon={Trophy}
          color='text-orange-500'
        />
        <SmallStat
          label='Accuracy'
          value='92%'
          icon={CheckCircle2}
          color='text-emerald-500'
        />
      </div>
    </div>
  )
}
