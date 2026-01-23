'use client'

import Link from 'next/link'
import { Home, Globe, GraduationCap, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface SetupProps {
  selectedSubs: string[]
  setSelectedSubs: (subs: any) => void
  qPerSubject: number
  setQPerSubject: (val: number) => void
  totalMinutes: number
  setTotalMinutes: (val: number) => void
  isStudyMode: boolean
  setIsStudyMode: (val: boolean) => void
  handleStart: () => void
}

export const SetupView = ({
  selectedSubs,
  setSelectedSubs,
  qPerSubject,
  setQPerSubject,
  totalMinutes,
  setTotalMinutes,
  isStudyMode,
  setIsStudyMode,
  handleStart,
}: SetupProps) => {
  return (
    <div className='min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center p-4'>
      {/* Grouped Navigation Header */}
      <div className='mb-8 flex items-center gap-4 bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white/20'>
        <Link
          href='/dashboard'
          className='flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-[#002EFF] font-black uppercase text-[10px] tracking-widest transition-all group'
        >
          <Home
            size={14}
            className='group-hover:scale-110 transition-transform'
          />
          <span>My Dashboard</span>
        </Link>

        <div className='h-4 w-px bg-gray-300' />

        <Link
          href='/'
          className='flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest transition-all group'
        >
          <Globe
            size={14}
            className='group-hover:rotate-12 transition-transform'
          />
          <span>Main Website</span>
        </Link>
      </div>

      <div className='bg-white p-6 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,46,255,0.1)] max-w-md w-full border border-gray-100'>
        <div className='flex flex-col items-center mb-8'>
          <div className='w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#002EFF] mb-4'>
            <GraduationCap size={24} />
          </div>
          <h2 className='text-2xl font-black text-zinc-900 text-center uppercase tracking-tighter'>
            Quiz360Pro <span className='text-[#002EFF]'> Setup</span>
          </h2>
          <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
            Configure your exam session
          </p>
        </div>

        {/* Subject Selection */}
        <div className='grid grid-cols-3 gap-2 mb-6'>
          {['ENG', 'MATH', 'PHY', 'CHEM', 'BIO'].map((s) => (
            <button
              key={s}
              onClick={() =>
                setSelectedSubs((p: string[]) =>
                  p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
                )
              }
              className={`py-3 rounded-xl text-xs font-black border-2 transition-all ${
                selectedSubs.includes(s)
                  ? 'bg-[#002EFF] border-[#002EFF] text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Configuration Sliders/Selects */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='space-y-2'>
            <label className='text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1'>
              Quantity
            </label>
            <div className='relative'>
              <select
                value={qPerSubject}
                onChange={(e) => setQPerSubject(Number(e.target.value))}
                className='w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100'
              >
                {[5, 10, 20, 40].map((n) => (
                  <option key={n} value={n}>
                    {n} Questions
                  </option>
                ))}
              </select>
              <ChevronLeft
                size={10}
                className='absolute right-4 top-1/2 -translate-y-1/2 rotate-270 text-gray-400 pointer-events-none'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1'>
              Duration
            </label>
            <div className='relative'>
              <select
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(Number(e.target.value))}
                className='w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100'
              >
                {[15, 30, 60, 120].map((n) => (
                  <option key={n} value={n}>
                    {n} Minutes
                  </option>
                ))}
              </select>
              <ChevronLeft
                size={10}
                className='absolute right-4 top-1/2 -translate-y-1/2 rotate-270 text-gray-400 pointer-events-none'
              />
            </div>
          </div>
        </div>

        {/* Study Mode Toggle */}
        <button
          onClick={() => setIsStudyMode(!isStudyMode)}
          className={`w-full mb-8 p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
            isStudyMode
              ? 'bg-emerald-50 border-emerald-500/30'
              : 'bg-gray-50 border-transparent'
          }`}
        >
          <div className='flex items-center gap-3'>
            <div
              className={`p-2.5 rounded-xl shadow-sm transition-colors ${
                isStudyMode
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-300'
              }`}
            >
              <GraduationCap size={18} />
            </div>
            <div className='text-left'>
              <span
                className={`block font-black text-[10px] uppercase tracking-wider ${isStudyMode ? 'text-emerald-700' : 'text-gray-500'}`}
              >
                Study Mode
              </span>
              <span className='block text-[8px] text-gray-400 font-bold uppercase'>
                Instant Explanations
              </span>
            </div>
          </div>
          <div
            className={`w-10 h-5 rounded-full relative transition-colors ${isStudyMode ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            <motion.div
              animate={{ x: isStudyMode ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className='absolute top-1 w-3 h-3 bg-white rounded-full'
            />
          </div>
        </button>

        {/* Start Button */}
        <button
          disabled={selectedSubs.length === 0}
          onClick={handleStart}
          className='w-full py-4 bg-[#FCB900] hover:bg-[#eab000] text-zinc-900 font-black rounded-2xl shadow-[0_10px_20px_rgba(252,185,0,0.2)] disabled:opacity-30 disabled:shadow-none transition-all active:scale-[0.98] text-[11px] uppercase tracking-[0.2em]'
        >
          Initialize Examination
        </button>
      </div>
    </div>
  )
}