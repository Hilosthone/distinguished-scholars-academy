'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  LayoutGrid,
  CheckCircle2,
  RotateCcw,
  Home,
  Printer,
  GraduationCap,
  Info,
  Calculator,
  Flag,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react'
import { questionBank } from './questions'

// --- Calculator Component ---
const ScientificCalculator = ({ onClose }: { onClose: () => void }) => {
  const [display, setDisplay] = useState('0')
  const handleBtn = (val: string) => {
    if (val === 'C') setDisplay('0')
    else if (val === '=') {
      try {
        setDisplay(eval(display).toString())
      } catch {
        setDisplay('Error')
      }
    } else {
      setDisplay(display === '0' ? val : display + val)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='fixed top-20 left-1/2 -translate-x-1/2 z-60 bg-zinc-900 p-4 rounded-2xl text-white shadow-2xl border border-white/10 w-[280px]'
    >
      <div className='flex justify-between items-center mb-3'>
        <span className='text-[10px] font-black uppercase tracking-widest opacity-50'>
          Calculator
        </span>
        <button onClick={onClose} className='p-1 hover:bg-white/10 rounded-lg'>
          <X size={16} />
        </button>
      </div>
      <div className='text-right mb-3 bg-black/40 p-3 rounded-xl font-mono text-lg truncate border border-white/5'>
        {display}
      </div>
      <div className='grid grid-cols-4 gap-1.5'>
        {[
          'C',
          '/',
          '*',
          '-',
          '7',
          '8',
          '9',
          '+',
          '4',
          '5',
          '6',
          '.',
          '1',
          '2',
          '3',
          '0',
        ].map((k) => (
          <button
            key={k}
            onClick={() => handleBtn(k)}
            className='h-10 bg-white/10 rounded-lg hover:bg-white/20 text-sm font-bold transition-all'
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => handleBtn('=')}
          className='col-span-4 h-10 bg-[#002EFF] rounded-lg text-xs font-black mt-1 uppercase'
        >
          Calculate
        </button>
      </div>
    </motion.div>
  )
}

export default function RapidQuizPortal() {
  const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
    'setup'
  )
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])
  const [qPerSubject, setQPerSubject] = useState(10)
  const [totalMinutes, setTotalMinutes] = useState(15)
  const [isStudyMode, setIsStudyMode] = useState(false)
  const [quizData, setQuizData] = useState<any[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [flagged, setFlagged] = useState<boolean[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [showCalc, setShowCalc] = useState(false)

  const handleStart = () => {
    if (selectedSubs.length === 0) return
    let pool: any[] = []
    selectedSubs.forEach((sub) => {
      const filtered = questionBank
        .filter((q) => q.subject === sub)
        .sort(() => 0.5 - Math.random())
        .slice(0, qPerSubject)
      pool = [...pool, ...filtered]
    })
    const shuffled = pool.sort(() => 0.5 - Math.random())
    setQuizData(shuffled)
    setAnswers(new Array(shuffled.length).fill(null))
    setFlagged(new Array(shuffled.length).fill(false))
    setTimeLeft(totalMinutes * 60)
    setCurrentIdx(0)
    setStep('quiz')
  }

  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft((p) => p - 1), 1000)
      return () => clearInterval(t)
    } else if (timeLeft === 0 && step === 'quiz') setStep('result')
  }, [timeLeft, step])

  const userScore = Math.round(
    (answers.filter((a, i) => a === quizData[i]?.correct).length /
      quizData.length) *
      100
  )

  if (step === 'setup')
    return (
      <div className='min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4 md:p-6'>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className='bg-white p-6 md:p-10 rounded-4xl shadow-xl max-w-md w-full'
        >
          <h2 className='text-2xl md:text-3xl font-black text-[#002EFF] mb-6 text-center tracking-tight uppercase'>
            Exam Setup
          </h2>

          <div className='grid grid-cols-3 gap-2 mb-4'>
            {['ENG', 'MATH', 'PHY', 'CHEM', 'BIO'].map((s) => (
              <button
                key={s}
                onClick={() =>
                  setSelectedSubs((p) =>
                    p.includes(s) ? p.filter((x) => x !== s) : [...p, s]
                  )
                }
                className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                  selectedSubs.includes(s)
                    ? 'bg-[#002EFF] border-[#002EFF] text-white'
                    : 'bg-gray-50 text-gray-400 border-transparent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-3 mb-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>
                Questions
              </label>
              <select
                value={qPerSubject}
                onChange={(e) => setQPerSubject(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold outline-none border border-gray-100'
              >
                {[5, 10, 20, 40].map((n) => (
                  <option key={n} value={n}>
                    {n} Per Sub
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-bold text-gray-400 uppercase ml-1'>
                Time
              </label>
              <select
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold outline-none border border-gray-100'
              >
                {[15, 30, 60, 120].map((n) => (
                  <option key={n} value={n}>
                    {n} Mins
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsStudyMode(!isStudyMode)}
            className={`w-full mb-6 p-3.5 rounded-xl border-2 flex items-center justify-between transition-all ${
              isStudyMode
                ? 'bg-green-50 border-green-500'
                : 'bg-gray-50 border-transparent'
            }`}
          >
            <div className='flex items-center gap-2'>
              <GraduationCap
                size={18}
                className={isStudyMode ? 'text-green-500' : 'text-gray-300'}
              />
              <span className='font-bold text-[11px] uppercase'>
                Instant Feedback
              </span>
            </div>
            <div
              className={`w-8 h-4 rounded-full relative ${
                isStudyMode ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <motion.div
                animate={{ x: isStudyMode ? 16 : 0 }}
                className='absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full'
              />
            </div>
          </button>

          <button
            disabled={selectedSubs.length === 0}
            onClick={handleStart}
            className='w-full py-4 bg-[#FCB900] text-black font-black rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-30 text-sm uppercase'
          >
            Start Examination
          </button>
        </motion.div>
      </div>
    )

  const isReview = step === 'review'
  const currentQ = quizData[currentIdx]

  return (
    <div className='min-h-screen bg-[#F8FAFF] pb-10'>
      <AnimatePresence>
        {showCalc && (
          <ScientificCalculator onClose={() => setShowCalc(false)} />
        )}
      </AnimatePresence>

      <nav className='bg-white border-b px-4 py-3 sticky top-0 z-40 flex justify-between items-center shadow-sm'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setStep('setup')}
            className='p-2 hover:bg-gray-100 rounded-lg'
          >
            <Home size={18} />
          </button>
          {!isReview && (
            <button
              onClick={() => setShowCalc(!showCalc)}
              className={`p-2 rounded-lg border transition-all ${
                showCalc ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'
              }`}
            >
              <Calculator size={18} />
            </button>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {!isReview ? (
            <>
              <div
                className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
                  timeLeft < 60
                    ? 'bg-red-50 text-red-600 animate-pulse'
                    : 'bg-gray-100'
                }`}
              >
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => setStep('result')}
                className='bg-red-600 text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase'
              >
                Finish
              </button>
            </>
          ) : (
            <button
              onClick={() => setStep('result')}
              className='bg-black text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase'
            >
              Results
            </button>
          )}
        </div>
      </nav>

      <main className='max-w-5xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_280px] gap-6'>
        <div className='space-y-4'>
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative'
          >
            {!isReview && (
              <button
                onClick={() => {
                  const f = [...flagged]
                  f[currentIdx] = !f[currentIdx]
                  setFlagged(f)
                }}
                className={`absolute top-6 right-6 p-2 rounded-xl border transition-all ${
                  flagged[currentIdx]
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'text-gray-200 border-gray-100'
                }`}
              >
                <Flag size={16} fill={flagged[currentIdx] ? 'white' : 'none'} />
              </button>
            )}
            <div className='mb-4'>
              <span className='px-3 py-0.5 bg-blue-50 text-[#002EFF] rounded-full text-[9px] font-black uppercase'>
                {currentQ?.subject}
              </span>
            </div>
            <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-6 leading-snug'>
              {currentQ?.question}
            </h2>
            <div className='grid gap-2.5'>
              {currentQ?.options.map((opt: string, i: number) => {
                const isSelected = answers[currentIdx] === i
                const isCorrect = i === currentQ.correct
                let style = 'bg-gray-50 border-transparent text-gray-600'
                if (isSelected)
                  style = 'border-[#002EFF] bg-blue-50 text-[#002EFF]'
                if (isReview || (isStudyMode && answers[currentIdx] !== null)) {
                  if (isCorrect)
                    style = 'border-green-500 bg-green-50 text-green-700'
                  else if (isSelected)
                    style = 'border-red-500 bg-red-50 text-red-700'
                }
                return (
                  <button
                    key={i}
                    disabled={
                      isReview || (isStudyMode && answers[currentIdx] !== null)
                    }
                    onClick={() => {
                      const a = [...answers]
                      a[currentIdx] = i
                      setAnswers(a)
                    }}
                    className={`p-4 rounded-xl border-2 text-left text-sm font-semibold transition-all flex justify-between items-center ${style}`}
                  >
                    <span>
                      {String.fromCharCode(65 + i)}. {opt}
                    </span>
                    {(isReview ||
                      (isStudyMode && answers[currentIdx] !== null)) &&
                      isCorrect && (
                        <CheckCircle2 size={16} className='text-green-500' />
                      )}
                  </button>
                )
              })}
            </div>
            {(isReview || (isStudyMode && answers[currentIdx] !== null)) && (
              <div className='mt-6 p-5 bg-blue-50/50 rounded-2xl border border-blue-100'>
                <p className='text-[9px] font-black text-[#002EFF] uppercase mb-1 flex items-center gap-1'>
                  <Info size={12} /> Explanation
                </p>
                <p className='text-xs text-blue-900 leading-relaxed'>
                  {currentQ?.explanation}
                </p>
              </div>
            )}
          </motion.div>

          <div className='flex justify-between items-center bg-white p-3 rounded-2xl border border-gray-100'>
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((p) => p - 1)}
              className='p-2 font-bold text-gray-400 uppercase text-[10px] flex items-center gap-1 disabled:opacity-20'
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
              {currentIdx + 1} / {quizData.length}
            </span>
            <button
              onClick={() =>
                currentIdx === quizData.length - 1
                  ? setStep('result')
                  : setCurrentIdx((p) => p + 1)
              }
              className='px-6 py-2.5 bg-black text-white rounded-xl font-bold uppercase text-[10px] transition-all'
            >
              {currentIdx === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        <aside className='space-y-4'>
          <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm'>
            <p className='text-[10px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-2'>
              <LayoutGrid size={12} /> Navigation
            </p>
            <div className='grid grid-cols-5 gap-1.5'>
              {quizData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`aspect-square rounded-lg text-[10px] font-bold transition-all border-2 
                  ${currentIdx === i ? 'border-black' : 'border-transparent'}
                  ${
                    isReview
                      ? answers[i] === quizData[i].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : flagged[i]
                      ? 'bg-orange-500 text-white'
                      : answers[i] !== null
                      ? 'bg-[#002EFF] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {step === 'result' && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white p-8 rounded-4xl max-w-sm w-full text-center shadow-2xl'
            >
              <Trophy size={48} className='mx-auto mb-3 text-[#FCB900]' />
              <h2 className='text-5xl font-black mb-1 tracking-tighter'>
                {userScore}%
              </h2>
              <p className='text-gray-400 font-bold uppercase text-[10px] mb-8'>
                Exam Complete
              </p>
              <div className='space-y-2'>
                <button
                  onClick={() => {
                    setCurrentIdx(0)
                    setStep('review')
                  }}
                  className='w-full py-3.5 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm'
                >
                  <Eye size={16} /> Review Errors
                </button>
                <div className='grid grid-cols-2 gap-2'>
                  <button
                    onClick={() => setStep('setup')}
                    className='py-3 bg-gray-100 rounded-xl font-bold text-[10px] uppercase flex items-center justify-center gap-1'
                  >
                    <RotateCcw size={14} /> Retake
                  </button>
                  <button
                    onClick={() => window.print()}
                    className='py-3 bg-gray-100 rounded-xl font-bold text-[10px] uppercase flex items-center justify-center gap-1'
                  >
                    <Printer size={14} /> Print
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
