'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  Clock,
  Zap,
  Plus,
  Trash2,
  LayoutGrid,
  Eye,
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCcw,
  ListChecks,
  Target,
  Download,
  AlertCircle,
  FileJson,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Types ---
interface SubjectConfig {
  id: string
  name: string
  quantity: number
  poolSize: number
}

interface StagedData {
  config?: {
    subject?: string
    timeLimit?: number
  }
  questions?: any[]
}

export default function ExamBuilder() {
  const [subjects, setSubjects] = useState<SubjectConfig[]>([
    { id: '1', name: 'General English', quantity: 40, poolSize: 1240 },
    { id: '2', name: 'Logic & Maths', quantity: 40, poolSize: 850 },
  ])
  const [stagedData, setStagedData] = useState<StagedData | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<{
    id: string
    url: string
  } | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [timeLimit, setTimeLimit] = useState(60)

  // Listen for data from the QuestionBank
  useEffect(() => {
    const raw = localStorage.getItem('staged_exam_data')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setStagedData(parsed)
        if (parsed.config?.timeLimit) setTimeLimit(parsed.config.timeLimit)
      } catch (error) {
        console.error('Failed to parse staged data:', error)
      }
    }
  }, [])

  const totalQuestions = useMemo(
    () => subjects.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0),
    [subjects],
  )

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => {
      const examId = `EXM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      setDeploymentResult({
        id: examId,
        url: `https://exam-portal.io/start/${examId}`,
      })
      setIsDeploying(false)
    }, 2000)
  }

  // --- NEW: Download Quiz Function ---
  const downloadQuizData = () => {
    if (!stagedData) return

    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        examTitle: stagedData.config?.subject || 'Exported Exam',
        timeLimit: timeLimit,
        totalQuestions: stagedData.questions?.length || 0,
      },
      ...stagedData,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${stagedData.config?.subject || 'exam'}-export.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportMatrix = () => {
    if (!stagedData) return
    const subjectName = stagedData.config?.subject || 'Imported Subject'
    const exists = subjects.find((s) => s.name === subjectName)

    if (exists) {
      alert('This subject matrix is already in your curriculum.')
      return
    }

    const newSubject: SubjectConfig = {
      id: crypto.randomUUID(),
      name: subjectName,
      quantity: stagedData.questions?.length || 0,
      poolSize: stagedData.questions?.length || 0,
    }
    setSubjects((prev) => [...prev, newSubject])
  }

  const updateSubject = (id: string, updates: Partial<SubjectConfig>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    )
  }

  return (
    <div className='max-w-6xl mx-auto p-6 md:p-10 font-sans text-slate-900 bg-[#F8FAFC] min-h-screen'>
      {/* HEADER */}
      <header className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6'>
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <div className='w-8 h-8 bg-[#002EFF] rounded-lg flex items-center justify-center'>
              <ShieldCheck className='text-white' size={18} />
            </div>
            <h1 className='text-2xl font-black tracking-tighter'>
              EXAM <span className='text-[#002EFF]'>ARCHITECT</span>
            </h1>
          </div>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]'>
            Pro-Level Assessment Engine • v2.6.0
          </p>
        </div>

        <div className='flex items-center gap-3 w-full md:w-auto'>
          {/* Download Button */}
          {stagedData && (
            <button
              onClick={downloadQuizData}
              className='flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 text-[10px] font-black uppercase text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm'
            >
              <Download size={16} /> Export JSON
            </button>
          )}

          <button
            onClick={() => setShowPreview(true)}
            className='flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 text-[10px] font-black uppercase text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm'
          >
            <Eye size={16} /> Preview Pool
          </button>

          <button
            onClick={handleDeploy}
            disabled={isDeploying || subjects.length === 0}
            className='flex-1 md:flex-none flex items-center justify-center gap-2 px-7 py-3 text-[10px] font-black uppercase bg-[#002EFF] text-white rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none'
          >
            {isDeploying ? (
              <RefreshCcw size={16} className='animate-spin' />
            ) : (
              <Zap size={16} fill='#FFD700' color='#FFD700' />
            )}
            {isDeploying ? 'Deploying...' : 'Deploy Quiz'}
          </button>
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <div className='lg:col-span-8 space-y-6'>
          {/* IMPORT BANNER */}
          {stagedData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white border-2 border-dashed border-[#002EFF]/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4'
            >
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#002EFF]/10 rounded-2xl flex items-center justify-center text-[#002EFF]'>
                  <LayoutGrid size={24} />
                </div>
                <div>
                  <p className='text-[10px] font-black text-[#002EFF] uppercase tracking-wider'>
                    Matrix Detected in Cache
                  </p>
                  <p className='text-sm font-bold text-slate-600'>
                    {stagedData.questions?.length || 0} items for{' '}
                    <span className='text-slate-900'>
                      {stagedData.config?.subject}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex gap-2 w-full sm:w-auto'>
                <button
                  onClick={handleImportMatrix}
                  className='flex-1 sm:flex-none px-6 py-3 bg-slate-900 text-[#FFD700] rounded-xl text-[10px] font-black uppercase hover:bg-[#002EFF] hover:text-white transition-all shadow-lg shadow-slate-200'
                >
                  Inject into Curriculum
                </button>
              </div>
            </motion.div>
          )}

          {/* CURRICULUM UI */}
          <section className='bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-sm'>
            <div className='px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white'>
              <div>
                <h3 className='text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1'>
                  Active Curriculum
                </h3>
                <p className='text-xs text-slate-500 font-medium'>
                  Define subjects and question distribution
                </p>
              </div>
              <button
                onClick={() =>
                  setSubjects([
                    ...subjects,
                    {
                      id: crypto.randomUUID(),
                      name: 'New Subject Stream',
                      quantity: 10,
                      poolSize: 100,
                    },
                  ])
                }
                className='group w-10 h-10 flex items-center justify-center bg-slate-50 text-[#002EFF] rounded-xl hover:bg-[#002EFF] hover:text-white transition-all'
              >
                <Plus
                  size={20}
                  strokeWidth={3}
                  className='group-hover:rotate-90 transition-transform'
                />
              </button>
            </div>

            <div className='divide-y divide-slate-50'>
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className='px-8 py-6 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 transition-colors group'
                >
                  <div className='col-span-12 md:col-span-7'>
                    <input
                      value={sub.name}
                      onChange={(e) =>
                        updateSubject(sub.id, { name: e.target.value })
                      }
                      className='bg-transparent font-bold text-base outline-none focus:text-[#002EFF] w-full transition-colors'
                      placeholder='Subject Name...'
                    />
                    <div className='flex items-center gap-2 mt-1.5'>
                      <p className='text-[10px] text-slate-400 font-bold uppercase tracking-tight'>
                        Available Pool:{' '}
                        <span className='text-slate-600'>
                          {sub.poolSize} Questions
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='col-span-8 md:col-span-3 flex items-center gap-3'>
                    <span className='text-[10px] font-black text-slate-300 uppercase'>
                      Draw
                    </span>
                    <div className='relative flex-1'>
                      <input
                        type='number'
                        min='0'
                        max={sub.poolSize}
                        value={sub.quantity}
                        onChange={(e) =>
                          updateSubject(sub.id, {
                            quantity: Math.min(
                              parseInt(e.target.value) || 0,
                              sub.poolSize,
                            ),
                          })
                        }
                        className='w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm outline-none focus:border-[#002EFF] focus:ring-4 focus:ring-blue-50 transition-all'
                      />
                    </div>
                  </div>
                  <div className='col-span-4 md:col-span-2 text-right'>
                    <button
                      onClick={() =>
                        setSubjects(subjects.filter((s) => s.id !== sub.id))
                      }
                      className='p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SUMMARY ASIDE */}
        <aside className='lg:col-span-4 space-y-6'>
          <div className='bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl'>
            <div className='absolute -right-4 -top-4 w-32 h-32 bg-[#002EFF] rounded-full blur-[80px] opacity-40' />
            <div className='relative z-10'>
              <p className='text-[10px] font-black text-[#FFD700] uppercase tracking-[0.3em] mb-8'>
                Configuration Summary
              </p>

              <div className='space-y-8'>
                <div className='flex justify-between items-end border-b border-white/10 pb-4'>
                  <div>
                    <span className='text-[10px] font-bold text-slate-400 uppercase block mb-1'>
                      Total Questions
                    </span>
                    <span className='text-4xl font-black leading-none italic'>
                      {totalQuestions}
                    </span>
                  </div>
                  <Target size={32} className='text-white/10' />
                </div>

                <div className='space-y-3'>
                  <span className='text-[10px] font-bold text-slate-400 uppercase block'>
                    Time Allocation (Min)
                  </span>
                  <div className='flex items-center gap-4'>
                    <Clock className='text-[#002EFF]' size={24} />
                    <input
                      type='range'
                      min='10'
                      max='180'
                      step='5'
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                      className='flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#002EFF]'
                    />
                    <span className='text-xl font-black text-white w-12'>
                      {timeLimit}'
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <div className='fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-slate-950/40 backdrop-blur-md'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className='bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col'
            >
              <div className='p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-[#FFD700]'>
                    <ListChecks size={24} />
                  </div>
                  <div>
                    <h2 className='font-black text-xl uppercase tracking-tighter'>
                      Assessment Audit
                    </h2>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                      Reviewing {stagedData?.questions?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={downloadQuizData}
                    className='hidden md:flex items-center gap-2 px-6 py-3 bg-blue-50 text-[#002EFF] rounded-xl text-[10px] font-black uppercase hover:bg-[#002EFF] hover:text-white transition-all'
                  >
                    <FileJson size={16} /> Download Source
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className='w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all'
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className='flex-1 overflow-y-auto p-8 md:p-12 space-y-12 bg-[#FBFBFE]'>
                {stagedData?.questions && stagedData.questions.length > 0 ? (
                  stagedData.questions.map((q: any, idx: number) => (
                    <div key={q.id || idx} className='relative pl-16 group'>
                      <div className='absolute left-0 top-0 w-10 h-10 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl flex items-center justify-center text-xs font-black shadow-sm group-hover:border-[#002EFF] group-hover:text-[#002EFF] transition-colors'>
                        {idx + 1}
                      </div>
                      <div className='space-y-6'>
                        <div>
                          <span className='px-3 py-1 bg-[#002EFF]/10 text-[#002EFF] text-[10px] font-black uppercase rounded-lg mb-3 inline-block'>
                            {q.topic || 'General Knowledge'}
                          </span>
                          <h4 className='text-lg font-bold text-slate-800 leading-snug'>
                            {q.body}
                          </h4>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          {q.options &&
                            Object.entries(q.options).map(([key, val]) => {
                              const isCorrect = q.correctOption === key
                              if (!val) return null
                              return (
                                <div
                                  key={key}
                                  className={`flex items-center gap-4 p-4 rounded-3xl border-2 transition-all ${isCorrect ? 'bg-blue-50/50 border-[#002EFF]' : 'bg-white border-slate-100'}`}
                                >
                                  <span
                                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-black ${isCorrect ? 'bg-[#002EFF] text-white' : 'bg-slate-100 text-slate-400'}`}
                                  >
                                    {key}
                                  </span>
                                  <span
                                    className={`text-sm font-bold ${isCorrect ? 'text-slate-900' : 'text-slate-500'}`}
                                  >
                                    {val as string}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='h-full flex flex-col items-center justify-center py-20 opacity-40'>
                    <LayoutGrid size={64} className='text-slate-300 mb-6' />
                    <p className='text-xl font-black text-slate-400 uppercase tracking-tighter'>
                      Bank is Empty
                    </p>
                  </div>
                )}
              </div>

              <div className='p-8 bg-white border-t border-slate-100 flex justify-end'>
                <button
                  onClick={() => setShowPreview(false)}
                  className='px-10 py-4 bg-slate-900 text-[#FFD700] text-[11px] font-black uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200'
                >
                  Return to Architect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
