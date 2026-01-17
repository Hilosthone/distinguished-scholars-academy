'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
  GripHorizontal,
} from 'lucide-react'
import { questionBank } from './questions'

// --- Draggable Scientific Calculator Component ---
const ScientificCalculator = ({ onClose }: { onClose: () => void }) => {
  const [display, setDisplay] = useState('0')
  const constraintsRef = useRef(null)

  const handleBtn = (val: string) => {
    if (val === 'C') setDisplay('0')
    else if (val === '=') {
      try {
        const result = new Function(`return ${display}`)()
        setDisplay(result.toString())
      } catch {
        setDisplay('Error')
      }
    } else {
      setDisplay(display === '0' ? val : display + val)
    }
  }

  return (
    <>
      <div
        ref={constraintsRef}
        className='fixed inset-0 pointer-events-none z-50'
      />
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className='fixed top-24 left-1/2 -translate-x-1/2 z-100 bg-zinc-900 p-4 rounded-2xl text-white shadow-2xl border border-white/10 w-[280px] cursor-default touch-none'
      >
        <div className='flex justify-between items-center mb-3 cursor-grab active:cursor-grabbing p-1 bg-white/5 rounded-lg'>
          <div className='flex items-center gap-2 opacity-50'>
            <GripHorizontal size={14} />
            <span className='text-[10px] font-black uppercase tracking-widest'>
              Move Me
            </span>
          </div>
          <button
            onClick={onClose}
            className='p-1 hover:bg-white/10 rounded-lg transition-colors'
          >
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
              className='h-10 bg-white/10 rounded-lg hover:bg-white/20 text-sm font-bold transition-all active:scale-95'
            >
              {k}
            </button>
          ))}
          <button
            onClick={() => handleBtn('=')}
            className='col-span-4 h-10 bg-[#002EFF] rounded-lg text-xs font-black mt-1 uppercase hover:bg-blue-600'
          >
            Calculate
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default function RapidQuizPortal() {
  useEffect(() => {
    // Only run AOS once on mount to prevent "flying" elements during state updates
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out',
    })
  }, [])

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
      (quizData.length || 1)) *
      100
  )
  const isReview = step === 'review'
  const currentQ = quizData[currentIdx]

  if (step === 'setup')
    return (
      <div className='min-h-screen bg-[#F0F4FF] flex items-center justify-center p-4'>
        {/* AOS only on the main container to prevent individual items from flying away on click */}
        <div
          data-aos='zoom-in'
          className='bg-white p-6 md:p-10 rounded-4xl shadow-xl max-w-md w-full relative overflow-hidden'
        >
          <h2 className='text-2xl font-black text-[#002EFF] mb-6 text-center uppercase tracking-tight'>
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
                className={`py-3 rounded-xl text-xs font-black border-2 transition-all duration-200 transform active:scale-95 ${
                  selectedSubs.includes(s)
                    ? 'bg-[#002EFF] border-[#002EFF] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-3 mb-4'>
            <div className='space-y-1'>
              <p className='text-[9px] font-bold text-gray-400 uppercase ml-1'>
                Quantity
              </p>
              <select
                value={qPerSubject}
                onChange={(e) => setQPerSubject(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold border border-gray-100 outline-none focus:border-blue-300 transition-colors'
              >
                {[5, 10, 20, 40].map((n) => (
                  <option key={n} value={n}>
                    {n} Qs
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-1'>
              <p className='text-[9px] font-bold text-gray-400 uppercase ml-1'>
                Duration
              </p>
              <select
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold border border-gray-100 outline-none focus:border-blue-300 transition-colors'
              >
                {[15, 30, 60, 120].map((n) => (
                  <option key={n} value={n}>
                    {n} Mins
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Instant Feedback Toggle - Locked in place */}
          <button
            onClick={() => setIsStudyMode(!isStudyMode)}
            className={`w-full mb-6 p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
              isStudyMode
                ? 'bg-green-50 border-green-500'
                : 'bg-gray-50 border-transparent'
            }`}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`p-2 rounded-lg ${
                  isStudyMode
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <GraduationCap size={18} />
              </div>
              <span
                className={`font-bold text-xs uppercase tracking-tight ${
                  isStudyMode ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                Instant Feedback
              </span>
            </div>
            <div
              className={`w-10 h-5 rounded-full relative transition-colors ${
                isStudyMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: isStudyMode ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className='absolute top-1 w-3 h-3 bg-white rounded-full'
              />
            </div>
          </button>

          <button
            disabled={selectedSubs.length === 0}
            onClick={handleStart}
            className='w-full py-4 bg-[#FCB900] text-black font-black rounded-2xl shadow-lg active:scale-[0.98] disabled:opacity-30 disabled:grayscale text-sm uppercase tracking-widest transition-all'
          >
            Start Examination
          </button>
        </div>
      </div>
    )

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
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
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
                className={`px-4 py-1.5 rounded-lg font-mono font-bold text-sm ${
                  timeLeft < 60
                    ? 'bg-red-50 text-red-600 animate-pulse'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => setStep('result')}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-colors'
              >
                Finish
              </button>
            </>
          ) : (
            <button
              onClick={() => setStep('result')}
              className='bg-black text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase'
            >
              View Results
            </button>
          )}
        </div>
      </nav>

      <main className='max-w-5xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_300px] gap-6'>
        <div data-aos='fade-up'>
          <div className='bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative min-h-[400px]'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className='flex justify-between items-center mb-6'>
                  <span className='px-4 py-1.5 bg-blue-50 text-[#002EFF] rounded-full text-[10px] font-black uppercase tracking-wider'>
                    {currentQ?.subject}
                  </span>
                  {!isReview && (
                    <button
                      onClick={() => {
                        const f = [...flagged]
                        f[currentIdx] = !f[currentIdx]
                        setFlagged(f)
                      }}
                      className={`p-2.5 rounded-xl border transition-all ${
                        flagged[currentIdx]
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                          : 'text-gray-300 border-gray-100 hover:border-orange-200'
                      }`}
                    >
                      <Flag
                        size={18}
                        fill={flagged[currentIdx] ? 'currentColor' : 'none'}
                      />
                    </button>
                  )}
                </div>

                <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-8 leading-relaxed'>
                  {currentQ?.question}
                </h2>

                <div className='grid gap-3'>
                  {currentQ?.options.map((opt: string, i: number) => {
                    const isSelected = answers[currentIdx] === i
                    const isCorrect = i === currentQ.correct
                    let style =
                      'bg-gray-50 border-gray-100 text-gray-600 hover:border-blue-200'

                    if (isSelected)
                      style = 'border-[#002EFF] bg-blue-50/50 text-[#002EFF]'

                    if (
                      isReview ||
                      (isStudyMode && answers[currentIdx] !== null)
                    ) {
                      if (isCorrect)
                        style =
                          'border-green-500 bg-green-50 text-green-700 shadow-sm'
                      else if (isSelected)
                        style = 'border-red-500 bg-red-50 text-red-700'
                    }

                    return (
                      <button
                        key={i}
                        disabled={
                          isReview ||
                          (isStudyMode && answers[currentIdx] !== null)
                        }
                        onClick={() => {
                          const a = [...answers]
                          a[currentIdx] = i
                          setAnswers(a)
                        }}
                        className={`p-5 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex justify-between items-center active:scale-[0.99] ${style}`}
                      >
                        <span className='flex gap-3'>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                              isSelected
                                ? 'bg-[#002EFF] border-[#002EFF] text-white'
                                : 'border-gray-300 text-gray-400'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                        {(isReview ||
                          (isStudyMode && answers[currentIdx] !== null)) &&
                          isCorrect && (
                            <CheckCircle2
                              size={18}
                              className='text-green-500'
                            />
                          )}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {(isReview ||
                    (isStudyMode && answers[currentIdx] !== null)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className='mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100'
                    >
                      <p className='text-[10px] font-black text-[#002EFF] uppercase flex items-center gap-2 mb-2'>
                        <Info size={14} /> Explanation
                      </p>
                      <p className='text-sm text-blue-900 leading-relaxed font-medium'>
                        {currentQ?.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='flex justify-between items-center bg-white p-4 mt-4 rounded-2xl border border-gray-100 shadow-sm'>
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((p) => p - 1)}
              className='p-3 font-black text-gray-400 uppercase text-[10px] flex items-center gap-2 disabled:opacity-10 hover:text-black transition-colors'
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className='flex gap-1.5'>
              {/* Optional: Simple dot indicators or just the text */}
              <span className='text-[11px] font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-full uppercase'>
                Q. {currentIdx + 1} of {quizData.length}
              </span>
            </div>

            <button
              onClick={() =>
                currentIdx === quizData.length - 1
                  ? setStep('result')
                  : setCurrentIdx((p) => p + 1)
              }
              className='px-8 py-3 bg-black text-white rounded-xl font-black uppercase text-[10px] hover:bg-zinc-800 transition-all shadow-lg flex items-center gap-2'
            >
              {currentIdx === quizData.length - 1 ? 'Finish' : 'Next'}{' '}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <aside data-aos='fade-left' className='space-y-4'>
          <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24'>
            <p className='text-[10px] font-black text-gray-400 uppercase mb-5 flex items-center gap-2 tracking-widest'>
              <LayoutGrid size={14} /> Question Map
            </p>
            <div className='grid grid-cols-5 gap-2'>
              {quizData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`aspect-square rounded-xl text-[10px] font-black transition-all border-2 flex items-center justify-center ${
                    currentIdx === i
                      ? 'border-black scale-110 shadow-md z-10'
                      : 'border-transparent'
                  } ${
                    isReview
                      ? answers[i] === quizData[i].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : flagged[i]
                      ? 'bg-orange-500 text-white'
                      : answers[i] !== null
                      ? 'bg-[#002EFF] text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className='mt-8 pt-6 border-t border-gray-50 space-y-3'>
              <div className='flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase'>
                <div className='w-2 h-2 rounded-full bg-[#002EFF]' /> Answered
              </div>
              <div className='flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase'>
                <div className='w-2 h-2 rounded-full bg-orange-500' /> Flagged
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Results Modal */}
      <AnimatePresence>
        {step === 'result' && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-200 flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white p-10 rounded-[40px] max-w-sm w-full text-center shadow-2xl border border-white/20'
            >
              <div className='w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Trophy size={40} className='text-[#FCB900]' />
              </div>
              <h2 className='text-6xl font-black mb-2 tracking-tighter text-zinc-900'>
                {userScore}%
              </h2>
              <p className='text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mb-10'>
                Examination Results
              </p>

              <div className='space-y-3'>
                <button
                  onClick={() => {
                    setCurrentIdx(0)
                    setStep('review')
                  }}
                  className='w-full py-4 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl active:scale-95'
                >
                  <Eye size={18} /> Review Correction
                </button>
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    onClick={() => setStep('setup')}
                    className='py-4 bg-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors'
                  >
                    <RotateCcw size={16} /> Retake
                  </button>
                  <button
                    onClick={() => window.print()}
                    className='py-4 bg-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors'
                  >
                    <Printer size={16} /> Print
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
