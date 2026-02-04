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
  ShieldAlert,
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

const CYBER_YELLOW = '#FFD700'

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
      className='group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-[#FFD700] hover:shadow-md transition-all'
    >
      <div className='md:col-span-4'>
        <select
          value={sub.name}
          onChange={(e) => onUpdate(sub.id, 'name', e.target.value)}
          className='w-full bg-transparent font-black text-slate-800 outline-none cursor-pointer text-sm'
        >
          {Object.keys(SUBJECT_POOLS).map((name) => (
            <option key={name}>{name}</option>
          ))}
          {sub.name === 'Select Subject' && (
            <option disabled>Select Subject</option>
          )}
        </select>
        <div className='flex items-center gap-2 mt-1'>
          <span className='text-[9px] font-black text-slate-900 bg-[#FFD700] px-1.5 py-0.5 rounded uppercase tracking-tighter'>
            Pool: {sub.poolSize}
          </span>
          {sub.quantity > sub.poolSize && (
            <span className='flex items-center gap-1 text-[9px] font-black text-rose-600 uppercase'>
              <AlertCircle size={10} /> Limit Exceeded
            </span>
          )}
        </div>
      </div>

      <div className='md:col-span-3'>
        <label className='text-[8px] font-black text-slate-400 uppercase block mb-1 tracking-widest'>
          Quantum
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
          className='w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-black outline-none focus:border-[#FFD700] transition-colors'
        />
      </div>

      <div className='md:col-span-4'>
        <label className='text-[8px] font-black text-slate-400 uppercase block mb-1 tracking-widest'>
          Complexity
        </label>
        <select
          value={sub.mix}
          onChange={(e) => onUpdate(sub.id, 'mix', e.target.value)}
          className='w-full p-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase outline-none focus:border-[#FFD700]'
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
    <div className='max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 bg-[#fbfbfb]'>
      {/* Mini Header */}
      <header className='flex flex-wrap items-center justify-between gap-4 mb-8 border-b-2 border-slate-900 pb-6'>
        <div>
          <h1 className='text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2'>
            EXAM{' '}
            <span className='text-[#FFD700] px-1 rounded'>
              ARCHITECT
            </span>
            <span className='text-blue-600 font-bold text-xs'>V2.4</span>
          </h1>
          <p className='text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1'>
            System Deployment Control
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='px-4 py-2 bg-white border-2 border-slate-900 rounded-xl text-[10px] font-black uppercase text-slate-900 hover:bg-[#FFD700] transition-all flex items-center gap-2'>
            <Save size={14} /> Save Draft
          </button>
          <button className='px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2'>
            <Zap size={14} fill='currentColor' /> Deploy Node
          </button>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        <main className='lg:col-span-8 space-y-6'>
          {/* Section 1: Curriculum */}
          <div className='bg-white rounded-4xl border-2 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-[#FFD700] text-slate-900 rounded-lg flex items-center justify-center text-xs font-black border border-slate-900'>
                  01
                </div>
                <h3 className='font-black text-slate-900 uppercase text-[12px] tracking-widest'>
                  Curriculum Matrix
                </h3>
              </div>
              <button
                onClick={addSubject}
                className='text-[10px] font-black bg-slate-100 hover:bg-[#FFD700] px-4 py-2 rounded-xl flex items-center gap-2 transition-colors border border-slate-200'
              >
                <Plus size={14} strokeWidth={4} /> Add Stream
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
                      setSubjects((p) => p.filter((s) => s.id !== id))
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Section 2: Integrity */}
          <div className='bg-white rounded-4xl border-2 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black border border-slate-900'>
                02
              </div>
              <h3 className='font-black text-slate-900 uppercase text-[12px] tracking-widest'>
                Anti-Collision Logic
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
          <div className='bg-slate-900 rounded-4xl p-6 text-white border-2 border-slate-900 relative overflow-hidden'>
            <div className='absolute top-0 right-0 p-4 opacity-20'>
              <ShieldAlert size={80} color={CYBER_YELLOW} />
            </div>

            <div className='flex items-center justify-between mb-8 relative z-10'>
              <span className='text-[10px] font-black text-[#FFD700] uppercase tracking-[0.4em]'>
                Configuration Metrics
              </span>
              <LayoutGrid size={16} />
            </div>

            <div className='space-y-6 relative z-10'>
              <div className='flex justify-between items-end border-b border-slate-800 pb-4'>
                <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                  Total Questions
                </span>
                <span className='text-4xl font-black leading-none italic'>
                  {totalQuestions}
                </span>
              </div>
              <div className='flex justify-between items-end border-b border-slate-800 pb-4'>
                <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                  Raw Score
                </span>
                <span className='text-4xl font-black leading-none text-[#FFD700]'>
                  {(totalQuestions * 2.5).toFixed(0)}
                </span>
              </div>

              <div className='pt-2 grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2 text-slate-300'>
                  <Clock size={14} className='text-[#FFD700]' />
                  <span className='text-[9px] font-black uppercase tracking-tighter'>
                    120 Min
                  </span>
                </div>
                <div className='flex items-center gap-2 text-slate-300'>
                  <Target size={14} className='text-[#FFD700]' />
                  <span className='text-[9px] font-black uppercase tracking-tighter'>
                    Adaptive: {antiCheat.adaptive ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-[#FFD700] rounded-4xl p-2 border-2 border-slate-900'>
            <div className='grid grid-cols-1 gap-1'>
              {['Mock Exam', 'Practice Test', 'Scholarship'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExamType(mode.toLowerCase())}
                  className={`flex items-center justify-between p-4 rounded-2xl text-[11px] font-black uppercase transition-all border-2 ${
                    examType === mode.toLowerCase()
                      ? 'bg-slate-900 text-[#FFD700] border-slate-900 shadow-xl translate-x-1'
                      : 'bg-[#FFD700] text-slate-900 border-transparent hover:border-slate-900/20'
                  }`}
                >
                  {mode}
                  <ChevronRight size={14} strokeWidth={3} />
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
      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
        active
          ? 'bg-[#FFD700] border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
          : 'bg-white border-slate-200 opacity-60'
      }`}
    >
      <span className='text-[10px] font-black uppercase text-slate-900'>
        {label}
      </span>
      <div
        className={`w-8 h-4 rounded-full relative transition-colors border border-slate-900 ${active ? 'bg-slate-900' : 'bg-slate-200'}`}
      >
        <motion.div
          animate={{ x: active ? 16 : 2 }}
          className='absolute top-0.5 left-0 w-2.5 h-2.5 bg-white rounded-full'
        />
      </div>
    </button>
  )
}
