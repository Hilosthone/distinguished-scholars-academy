'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  Settings2,
  Clock,
  Shuffle,
  Calendar,
  Target,
  ChevronRight,
  Zap,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  LayoutGrid,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Constants & Data ---
const SUBJECT_POOLS: Record<string, number> = {
  English: 1240,
  Mathematics: 850,
  Physics: 620,
  Chemistry: 440,
  Biology: 910,
}

// --- Types ---
type ComplexityMix = 'Easy Mix' | 'Balanced' | 'Hard Heavy'

interface SubjectConfig {
  id: string
  name: string
  quantity: number
  mix: ComplexityMix
  poolSize: number
}

// --- Sub-Components ---

const SubjectRow = React.memo(
  ({
    sub,
    onUpdate,
    onRemove,
  }: {
    sub: SubjectConfig
    onUpdate: (id: string, field: keyof SubjectConfig, value: any) => void
    onRemove: (id: string) => void
  }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -10 }}
      className='group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all'
    >
      <div className='md:col-span-4'>
        <select
          value={sub.name}
          onChange={(e) => onUpdate(sub.id, 'name', e.target.value)}
          className='w-full bg-transparent font-bold text-slate-800 outline-none cursor-pointer'
        >
          {Object.keys(SUBJECT_POOLS).map((name) => (
            <option key={name}>{name}</option>
          ))}
          {sub.name === 'Select Subject' && (
            <option disabled>Select Subject</option>
          )}
        </select>
        <div className='flex items-center gap-2 mt-1'>
          <span className='text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded'>
            Pool: {sub.poolSize}
          </span>
          {sub.quantity > sub.poolSize && (
            <span className='flex items-center gap-1 text-[10px] font-bold text-rose-500'>
              <AlertCircle size={10} /> Over Limit
            </span>
          )}
        </div>
      </div>

      <div className='md:col-span-3'>
        <label className='text-[9px] font-black text-slate-400 uppercase block mb-1'>
          Qty
        </label>
        <input
          type='number'
          value={sub.quantity || ''}
          placeholder='0'
          onChange={(e) =>
            onUpdate(
              sub.id,
              'quantity',
              Math.max(0, parseInt(e.target.value) || 0),
            )
          }
          className='w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10'
        />
      </div>

      <div className='md:col-span-4'>
        <label className='text-[9px] font-black text-slate-400 uppercase block mb-1'>
          Complexity
        </label>
        <select
          value={sub.mix}
          onChange={(e) => onUpdate(sub.id, 'mix', e.target.value)}
          className='w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold'
        >
          <option>Easy Mix</option>
          <option>Balanced</option>
          <option>Hard Heavy</option>
        </select>
      </div>

      <div className='md:col-span-1 flex justify-end'>
        <button
          onClick={() => onRemove(sub.id)}
          className='p-2 text-slate-300 hover:text-rose-500 transition-colors'
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  ),
)

SubjectRow.displayName = 'SubjectRow'

// --- Main Component ---

export default function ExamBuilder() {
  const [subjects, setSubjects] = useState<SubjectConfig[]>([
    { id: '1', name: 'English', quantity: 40, mix: 'Balanced', poolSize: 1240 },
    {
      id: '2',
      name: 'Mathematics',
      quantity: 40,
      mix: 'Hard Heavy',
      poolSize: 850,
    },
  ])
  const [examType, setExamType] = useState('mock exam')
  const [antiCheat, setAntiCheat] = useState({
    shuffle: true,
    randomize: true,
    adaptive: false,
  })

  const totalQuestions = useMemo(
    () => subjects.reduce((acc, curr) => acc + (curr.quantity || 0), 0),
    [subjects],
  )

  const updateSubject = useCallback(
    (id: string, field: keyof SubjectConfig, value: any) => {
      setSubjects((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s
          const updated = { ...s, [field]: value }
          if (field === 'name')
            updated.poolSize = SUBJECT_POOLS[value as string] || 500
          return updated
        }),
      )
    },
    [],
  )

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: 'Physics',
        quantity: 20,
        mix: 'Balanced',
        poolSize: SUBJECT_POOLS['Physics'],
      },
    ])
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500'>
      {/* Mini Header */}
      <header className='flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6'>
        <div>
          <h1 className='text-2xl font-black text-slate-900'>
            Exam Architect{' '}
            <span className='text-blue-600 font-medium text-sm ml-2'>v2.4</span>
          </h1>
          <p className='text-xs text-slate-400 font-bold uppercase tracking-tighter'>
            Architecture & Deployment Suite
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2'>
            <Save size={14} /> Save Draft
          </button>
          <button className='px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2'>
            <Zap size={14} fill='currentColor' /> Deploy
          </button>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        <main className='lg:col-span-8 space-y-6'>
          {/* Section 1: Curriculum */}
          <div className='bg-white rounded-3xl border border-slate-200 p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black'>
                  1
                </div>
                <h3 className='font-black text-slate-900 uppercase text-[11px] tracking-wider'>
                  Curriculum Design
                </h3>
              </div>
              <button
                onClick={addSubject}
                className='text-[10px] font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors'
              >
                <Plus size={14} strokeWidth={3} /> Add
              </button>
            </div>

            <div className='space-y-3'>
              <AnimatePresence mode='popLayout'>
                {subjects.map((sub) => (
                  <SubjectRow
                    key={sub.id}
                    sub={sub}
                    onUpdate={updateSubject}
                    onRemove={(id) =>
                      setSubjects((prev) => prev.filter((s) => s.id !== id))
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Section 2: Integrity */}
          <div className='bg-white rounded-3xl border border-slate-200 p-6 shadow-sm'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black'>
                2
              </div>
              <h3 className='font-black text-slate-900 uppercase text-[11px] tracking-wider'>
                Integrity Logic
              </h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <ToggleCompact
                label='Shuffle'
                active={antiCheat.shuffle}
                onClick={() =>
                  setAntiCheat((p) => ({ ...p, shuffle: !p.shuffle }))
                }
              />
              <ToggleCompact
                label='Randomize'
                active={antiCheat.randomize}
                onClick={() =>
                  setAntiCheat((p) => ({ ...p, randomize: !p.randomize }))
                }
              />
              <ToggleCompact
                label='Adaptive'
                active={antiCheat.adaptive}
                onClick={() =>
                  setAntiCheat((p) => ({ ...p, adaptive: !p.adaptive }))
                }
              />
            </div>
          </div>
        </main>

        <aside className='lg:col-span-4 space-y-4 sticky top-6'>
          {/* Summary Card */}
          <div className='bg-slate-900 rounded-3xl p-6 text-white shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
              <span className='text-[10px] font-black text-blue-400 uppercase tracking-widest'>
                Metrics
              </span>
              <LayoutGrid size={14} className='text-slate-600' />
            </div>

            <div className='space-y-4'>
              <div className='flex justify-between items-end border-b border-slate-800 pb-4'>
                <span className='text-xs font-bold text-slate-400'>
                  Total Questions
                </span>
                <span className='text-2xl font-black leading-none'>
                  {totalQuestions}
                </span>
              </div>
              <div className='flex justify-between items-end border-b border-slate-800 pb-4'>
                <span className='text-xs font-bold text-slate-400'>
                  Score Potential
                </span>
                <span className='text-2xl font-black leading-none text-blue-400'>
                  {(totalQuestions * 2.5).toFixed(0)}
                </span>
              </div>

              <div className='pt-2 space-y-3'>
                <div className='flex items-center gap-2 text-slate-400'>
                  <Clock size={14} />
                  <span className='text-[10px] font-black uppercase'>
                    Duration: 120m
                  </span>
                </div>
                <div className='flex items-center gap-2 text-slate-400'>
                  <Calendar size={14} />
                  <span className='text-[10px] font-black uppercase'>
                    Access: Feb 10 - 15
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className='bg-blue-600 rounded-3xl p-4 text-white'>
            <div className='grid grid-cols-1 gap-1'>
              {['Mock Exam', 'Practice Test', 'Scholarship'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExamType(mode.toLowerCase())}
                  className={`flex items-center justify-between p-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                    examType === mode.toLowerCase()
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'hover:bg-blue-500 text-blue-100'
                  }`}
                >
                  {mode}
                  <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ToggleCompact({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
        active ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'
      }`}
    >
      <span
        className={`text-[10px] font-black uppercase ${active ? 'text-blue-700' : 'text-slate-400'}`}
      >
        {label}
      </span>
      <div
        className={`w-6 h-3.5 rounded-full relative transition-colors ${active ? 'bg-blue-600' : 'bg-slate-300'}`}
      >
        <motion.div
          animate={{ x: active ? 10 : 2 }}
          className='absolute top-0.5 left-0 w-2.5 h-2.5 bg-white rounded-full'
        />
      </div>
    </button>
  )
}
