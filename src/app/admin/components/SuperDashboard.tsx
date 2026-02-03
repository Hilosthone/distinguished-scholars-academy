'use client'

import React from 'react'
import {
  CreditCard,
  Users,
  Zap,
  Trophy,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function SuperDashboard() {
  const stats = [
    {
      label: 'Total Scholars',
      value: '12,840',
      change: '+12%',
      trending: 'up',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Today',
      value: '1,204',
      change: '+5%',
      trending: 'up',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Avg. Score',
      value: '64.2%',
      change: '-2%',
      trending: 'down',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Tests Taken',
      value: '45,902',
      change: '+18%',
      trending: 'up',
      icon: BookOpen,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <div className='max-w-5xl mx-auto space-y-5 pb-10 px-4'>
      {/* Tightened Header */}
      <header className='flex items-center justify-between border-b border-slate-100 pb-5 pt-6'>
        <div>
          <h1 className='text-lg font-semibold text-blue-700'>
            System Overview
          </h1>
          <p className='text-slate-500 text-[11px] font-medium uppercase tracking-wider'>
            Real-time analytics <span className='mx-1 text-slate-200'>|</span>{' '}
            DSA.Admin Panel
          </p>
        </div>
        <div className='hidden sm:flex items-center gap-2 bg-emerald-50/50 px-2.5 py-1 rounded-md border border-emerald-100'>
          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
          <span className='text-[10px] font-bold text-emerald-700 uppercase'>
            Live Feed
          </span>
        </div>
      </header>

      {/* KPI Grid - Compact */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            key={stat.label}
            className='bg-white p-4 rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
          >
            <div className='flex justify-between items-start mb-2'>
              <div className={`${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <div
                className={`text-[9px] font-bold flex items-center ${stat.trending === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}
              >
                {stat.change}
                {stat.trending === 'up' ? (
                  <ArrowUpRight size={10} />
                ) : (
                  <ArrowDownRight size={10} />
                )}
              </div>
            </div>
            <p className='text-[10px] font-medium text-slate-400 uppercase tracking-tight'>
              {stat.label}
            </p>
            <p className='text-xl font-bold text-slate-800'>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {/* Intervention Alert - Focused & Moderate */}
        <div className='lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden'>
          <div className='flex items-center gap-2 mb-3'>
            <div className='p-1.5 bg-rose-50 text-rose-600 rounded-md'>
              <AlertCircle size={14} />
            </div>
            <h3 className='font-bold text-slate-700 text-[11px] uppercase tracking-wider'>
              Intervention Queue
            </h3>
          </div>

          <div className='space-y-3'>
            <p className='text-slate-600 text-sm leading-relaxed'>
              <span className='font-bold text-slate-900'>72% failure rate</span>{' '}
              detected in
              <span className='mx-1.5 px-1.5 py-0.5 bg-slate-100 rounded font-semibold text-slate-800 text-xs uppercase'>
                Organic Chemistry
              </span>
            </p>

            <div className='flex gap-4 border-t border-slate-50 pt-3'>
              <div className='flex flex-col'>
                <span className='text-[9px] text-slate-400 font-bold uppercase'>
                  Avg Time
                </span>
                <span className='text-xs font-bold text-slate-700'>
                  12.4 Seconds
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-[9px] text-slate-400 font-bold uppercase'>
                  Accuracy
                </span>
                <span className='text-xs font-bold text-rose-500'>14.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance - Scaled down */}
        <div className='bg-white border border-slate-200 rounded-xl p-5'>
          <h3 className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4'>
            Subject Performance
          </h3>
          <div className='space-y-3'>
            {[
              { name: 'Physics', score: 88, color: 'bg-blue-600' },
              { name: 'Government', score: 72, color: 'bg-slate-800' },
              { name: 'Biology', score: 45, color: 'bg-emerald-500' },
            ].map((subject) => (
              <div key={subject.name} className='group'>
                <div className='flex justify-between items-center mb-1'>
                  <span className='text-[11px] font-semibold text-slate-700'>
                    {subject.name}
                  </span>
                  <span className='text-[10px] font-bold text-slate-400'>
                    {subject.score}%
                  </span>
                </div>
                <div className='h-1 w-full bg-slate-100 rounded-full'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.score}%` }}
                    className={`h-full rounded-full ${subject.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Row - Small Footer style */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='bg-blue-600 rounded-xl p-4 text-white flex items-center justify-between'>
          <div>
            <p className='text-[9px] font-bold text-slate-400 uppercase'>
              Gross Revenue (MTD)
            </p>
            <p className='text-lg font-bold tracking-tight'>₦1,240,500.00</p>
          </div>
          <button className='p-2 bg-black/50 hover:bg-blue-800 rounded-lg transition-colors'>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className='bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3'>
          <div className='w-10 h-10 bg-white border border-slate-200 text-blue-600 rounded-lg flex items-center justify-center shadow-sm'>
            <Trophy size={20} />
          </div>
          <div>
            <p className='text-[11px] font-bold text-slate-900'>
              JAMB Index Prediction
            </p>
            <p className='text-xs text-slate-500'>
              Platform Mean:{' '}
              <span className='font-bold text-blue-600'>268</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}