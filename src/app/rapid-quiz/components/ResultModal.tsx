'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Eye,
  Download,
  RotateCcw,
  Home,
  Target,
  Medal,
} from 'lucide-react'

interface ResultModalProps {
  userScore: number
  subjectStats: any[]
  onReview: () => void
  onDownload: () => void
  onRetake: () => void
  onHome: () => void
}

export const ResultModal = ({
  userScore,
  subjectStats,
  onReview,
  onDownload,
  onRetake,
  onHome,
}: ResultModalProps) => {
  const isPassed = userScore >= 50

  // Dynamic UI settings based on score
  const theme = {
    accent: isPassed ? 'text-[#FCB900]' : 'text-zinc-400',
    bg: isPassed ? 'bg-yellow-50' : 'bg-zinc-50',
    label: isPassed ? 'Mastery Achieved' : 'Keep Practicing',
    icon: isPassed ? <Trophy size={28} /> : <Target size={28} />,
  }

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-md z-200 flex items-center justify-center p-6 overflow-y-auto'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className='bg-white rounded-4xl max-w-sm w-full shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-white/20 overflow-hidden'
      >
        {/* Header Section */}
        <div className={`pt-10 pb-6 text-center ${theme.bg}`}>
          <motion.div
            initial={{ rotate: -10, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm bg-white ${theme.accent}`}
          >
            {theme.icon}
          </motion.div>

          <h2 className='text-5xl font-black text-zinc-900 tracking-tighter'>
            {userScore}
            <span className='text-2xl text-zinc-400'>%</span>
          </h2>
          <p
            className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${theme.accent}`}
          >
            {theme.label}
          </p>
        </div>

        {/* Breakdown Section */}
        <div className='p-8'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2'>
              <Medal size={14} /> Subject Analysis
            </h3>
          </div>

          <div className='space-y-3 mb-8 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar'>
            {subjectStats.map((sub) => (
              <div key={sub.name} className='group'>
                <div className='flex justify-between items-end mb-1.5'>
                  <span className='font-bold text-xs text-zinc-600 group-hover:text-zinc-900 transition-colors'>
                    {sub.name}
                  </span>
                  <span
                    className={`text-[10px] font-black ${sub.percent >= 50 ? 'text-emerald-600' : 'text-rose-500'}`}
                  >
                    {sub.percent}%
                  </span>
                </div>
                <div className='w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.percent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${sub.percent >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Grid */}
          <div className='grid gap-3'>
            <div className='grid grid-cols-2 gap-3'>
              <button
                onClick={onReview}
                className='flex items-center justify-center gap-2 py-3.5 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black active:scale-95 transition-all shadow-lg shadow-zinc-200'
              >
                <Eye size={16} /> Review
              </button>
              <button
                onClick={onDownload}
                className='flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-100'
              >
                <Download size={16} /> Report
              </button>
            </div>

            <div className='grid grid-cols-2 gap-3 mt-1'>
              <button
                onClick={onRetake}
                className='flex items-center justify-center gap-2 py-3 bg-zinc-50 text-zinc-500 rounded-xl font-bold text-[9px] uppercase hover:bg-zinc-100 transition-all'
              >
                <RotateCcw size={14} /> Try Again
              </button>
              <button
                onClick={onHome}
                className='flex items-center justify-center gap-2 py-3 bg-zinc-50 text-zinc-500 rounded-xl font-bold text-[9px] uppercase hover:bg-zinc-100 transition-all'
              >
                <Home size={14} /> Dashboard
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
