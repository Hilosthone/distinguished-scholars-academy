'use client'

import { useState, useEffect, useRef } from 'react'
import 'aos/dist/aos.css'
import { motion, AnimatePresence } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Import Lucide icons
import {
  Eye,
  Trophy,
  LayoutGrid,
  CheckCircle2,
  RotateCcw,
  Home,
  GraduationCap,
  Info,
  Calculator,
  Flag,
  X,
  GripHorizontal,
  Download,
  AlertTriangle,
  Save,
  BarChart3,
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
        className='fixed top-24 left-1/2 -translate-x-1/2 z-101 bg-zinc-900 p-4 rounded-2xl text-white shadow-2xl border border-white/10 w-[280px] cursor-default touch-none'
      >
        <div className='flex justify-between items-center mb-3 cursor-grab active:cursor-grabbing p-1 bg-white/5 rounded-lg'>
          <div className='flex items-center gap-2 opacity-50'>
            <GripHorizontal size={14} />
            <span className='text-[10px] font-black uppercase tracking-widest'>
              Calculator
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
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
    'setup',
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
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [hasResumed, setHasResumed] = useState(false)

  // 1. Fixing the Client-Side Exception: Wait for Mount
  useEffect(() => {
    setMounted(true)

    // Dynamic import for AOS to avoid SSR errors
    const initAOS = async () => {
      const AOS = (await import('aos')).default
      AOS.init({ duration: 600, once: true })
    }
    initAOS()

    // Safe access to localStorage after mounting
    const saved = localStorage.getItem('quiz_session')
    if (saved) {
      const data = JSON.parse(saved)
      setQuizData(data.quizData)
      setAnswers(data.answers)
      setFlagged(data.flagged)
      setTimeLeft(data.timeLeft)
      setCurrentIdx(data.currentIdx)
      setStep('quiz')
      setHasResumed(true)
    }
  }, [])

  // 2. State Persistence
  useEffect(() => {
    if (mounted && step === 'quiz') {
      localStorage.setItem(
        'quiz_session',
        JSON.stringify({ quizData, answers, flagged, timeLeft, currentIdx }),
      )
    }
  }, [quizData, answers, flagged, timeLeft, currentIdx, step, mounted])

  const resetToHome = () => {
    localStorage.removeItem('quiz_session')
    setStep('setup')
    setSelectedSubs([])
    setQuizData([])
    setAnswers([])
    setFlagged([])
    setCurrentIdx(0)
    setShowExitConfirm(false)
    setHasResumed(false)
  }

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
    } else if (timeLeft === 0 && step === 'quiz') {
      localStorage.removeItem('quiz_session')
      setStep('result')
    }
  }, [timeLeft, step])

  // Stats Calculations
  const correctCount = answers.filter(
    (a, i) => a === quizData[i]?.correct,
  ).length
  const userScore = Math.round((correctCount / (quizData.length || 1)) * 100)
  const secondsUsed = totalMinutes * 60 - timeLeft

  const getSubjectStats = () => {
    const subs = Array.from(new Set(quizData.map((q) => q.subject)))
    return subs.map((sub) => {
      const qInSub = quizData.filter((q) => q.subject === sub)
      const correctInSub = qInSub.filter((q) => {
        const idx = quizData.indexOf(q)
        return answers[idx] === q.correct
      }).length
      return {
        name: sub,
        correct: correctInSub,
        total: qInSub.length,
        percent: Math.round((correctInSub / qInSub.length) * 100),
      }
    })
  }

  const downloadPDF = () => {
    const doc = new jsPDF()

    // 1. School Header
    doc.setFontSize(22)
    doc.setTextColor(0, 46, 255) // Theme Blue
    doc.setFont('helvetica', 'bold')
    doc.text('Distinguished Scholars Academy', 105, 20, { align: 'center' })

    // 2. Sub-heading
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.setFont('helvetica', 'normal')
    doc.text('Examination Result Report', 105, 28, { align: 'center' })

    // 3. Performance Table
    autoTable(doc, {
      startY: 35,
      head: [['Performance Metric', 'Value']],
      body: [
        ['Overall Average', `${userScore}%`],
        ['Questions Answered', quizData.length.toString()],
        ['Total Correct', correctCount.toString()],
        ['Time Spent', `${Math.floor(secondsUsed / 60)}m ${secondsUsed % 60}s`],
      ],
      // REMOVED fillStyle and fixed types
      headStyles: { fillColor: [0, 46, 255], textColor: [255, 255, 255] },
      theme: 'striped',
    })

    // 4. Subject Breakdown Table
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Subject', 'Score', 'Total', 'Percentage']],
      body: getSubjectStats().map((s) => [
        s.name,
        s.correct,
        s.total,
        `${s.percent}%`,
      ]),
      headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255] },
      theme: 'grid',
    })

    // 5. Footer
    const finalY = (doc as any).lastAutoTable.finalY + 15
    doc.setFontSize(9)
    doc.setTextColor(180, 180, 180)
    doc.text(
      'This is an automated result generated by the DSA Quiz Simulator.',
      105,
      finalY,
      { align: 'center' },
    )

    doc.save('DSA_Quiz_Result.pdf')
  }

  // Prevent "Hydration Mismatch" errors
  if (!mounted) return null

  if (step === 'setup')
    return (
      <div className='min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center p-4'>
        <button
          onClick={() => (window.location.href = '/')}
          className='mb-6 flex items-center gap-2 text-gray-500 hover:text-[#002EFF] font-black uppercase text-[10px] tracking-widest transition-all'
        >
          <Home size={16} /> Main Website
        </button>
        <div className='bg-white p-6 md:p-10 rounded-3xl shadow-xl max-w-md w-full'>
          <h2 className='text-2xl font-black text-[#002EFF] mb-6 text-center uppercase tracking-tight'>
            Simulator Setup
          </h2>
          <div className='grid grid-cols-3 gap-2 mb-4'>
            {['ENG', 'MATH', 'PHY', 'CHEM', 'BIO'].map((s) => (
              <button
                key={s}
                onClick={() =>
                  setSelectedSubs((p) =>
                    p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
                  )
                }
                className={`py-3 rounded-xl text-xs font-black border-2 transition-all ${selectedSubs.includes(s) ? 'bg-[#002EFF] border-[#002EFF] text-white shadow-lg' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-3 mb-6'>
            <div className='space-y-1'>
              <p className='text-[9px] font-bold text-gray-400 uppercase ml-1'>
                Quantity
              </p>
              <select
                value={qPerSubject}
                onChange={(e) => setQPerSubject(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none'
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
                Time
              </p>
              <select
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(Number(e.target.value))}
                className='w-full p-3 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none'
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
            className={`w-full mb-6 p-4 rounded-xl border-2 flex items-center justify-between transition-all ${isStudyMode ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-transparent'}`}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`p-2 rounded-lg ${isStudyMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                <GraduationCap size={18} />
              </div>
              <span
                className={`font-bold text-xs uppercase ${isStudyMode ? 'text-green-700' : 'text-gray-500'}`}
              >
                Study Mode
              </span>
            </div>
            <div
              className={`w-10 h-5 rounded-full relative ${isStudyMode ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <motion.div
                animate={{ x: isStudyMode ? 20 : 2 }}
                className='absolute top-1 w-3 h-3 bg-white rounded-full'
              />
            </div>
          </button>
          <button
            disabled={selectedSubs.length === 0}
            onClick={handleStart}
            className='w-full py-4 bg-[#FCB900] text-black font-black rounded-2xl shadow-lg disabled:opacity-30 text-sm uppercase tracking-widest'
          >
            Start Examination
          </button>
        </div>
      </div>
    )

  const currentQ = quizData[currentIdx]
  const isReview = step === 'review'

  return (
    <div className='min-h-screen bg-[#F8FAFF] pb-10'>
      <AnimatePresence>
        {showCalc && (
          <ScientificCalculator onClose={() => setShowCalc(false)} />
        )}
        {showExitConfirm && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-200 flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl'
            >
              <div className='w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <AlertTriangle size={32} />
              </div>
              <h3 className='text-xl font-black mb-2 text-zinc-900'>
                Exit Quiz?
              </h3>
              <p className='text-gray-500 text-sm mb-6'>
                Progress is saved. Choose to exit to the website or restart the
                setup.
              </p>
              <div className='flex flex-col gap-2'>
                <button
                  onClick={() => (window.location.href = '/')}
                  className='py-3 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase'
                >
                  Back to Website
                </button>
                <button
                  onClick={resetToHome}
                  className='py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase'
                >
                  New Quiz Setup
                </button>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className='py-3 bg-gray-100 text-zinc-400 rounded-xl font-black text-[10px] uppercase'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <nav className='bg-white border-b px-4 py-3 sticky top-0 z-40 flex justify-between items-center shadow-sm'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setShowExitConfirm(true)}
            className='p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors'
          >
            <Home size={18} />
          </button>
          {!isReview && (
            <button
              onClick={() => setShowCalc(!showCalc)}
              className={`p-2 rounded-lg border ml-2 ${showCalc ? 'bg-black text-white' : 'text-gray-400'}`}
            >
              <Calculator size={18} />
            </button>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {!isReview ? (
            <>
              <div
                className={`px-4 py-1.5 rounded-lg font-mono font-bold text-sm ${timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'}`}
              >
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('quiz_session')
                  setStep('result')
                }}
                className='bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase'
              >
                Submit
              </button>
            </>
          ) : (
            <button
              onClick={() => setStep('result')}
              className='bg-black text-white px-4 py-1.5 rounded-lg font-bold text-[10px] uppercase'
            >
              Summary
            </button>
          )}
        </div>
      </nav>

      <main className='max-w-5xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_300px] gap-6'>
        <div className='w-full'>
          <div className='bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative min-h-[400px]'>
            {currentQ && (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className='flex justify-between items-center mb-6'>
                  <span className='px-4 py-1.5 bg-blue-50 text-[#002EFF] rounded-full text-[10px] font-black uppercase'>
                    {currentQ.subject}
                  </span>
                  {!isReview && (
                    <button
                      onClick={() => {
                        const f = [...flagged]
                        f[currentIdx] = !f[currentIdx]
                        setFlagged(f)
                      }}
                      className={`p-2.5 rounded-xl border transition-all ${flagged[currentIdx] ? 'bg-orange-500 border-orange-500 text-white shadow-md' : 'text-gray-300 border-gray-100'}`}
                    >
                      <Flag
                        size={18}
                        fill={flagged[currentIdx] ? 'currentColor' : 'none'}
                      />
                    </button>
                  )}
                </div>
                <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-8'>
                  {currentQ.question}
                </h2>
                <div className='grid gap-3'>
                  {currentQ.options.map((opt: string, i: number) => {
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
                        style = 'border-green-500 bg-green-50 text-green-700'
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
                        className={`p-5 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex justify-between items-center ${style}`}
                      >
                        <span>
                          {String.fromCharCode(65 + i)}. {opt}
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
                {(isReview ||
                  (isStudyMode && answers[currentIdx] !== null)) && (
                  <div className='mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100'>
                    <p className='text-[10px] font-black text-[#002EFF] uppercase flex items-center gap-2 mb-2'>
                      <Info size={14} /> Explanation
                    </p>
                    <p className='text-sm text-blue-900 leading-relaxed font-medium'>
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
          <div className='flex justify-between items-center bg-white p-4 mt-4 rounded-2xl border border-gray-100 shadow-sm'>
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((p) => p - 1)}
              className='text-[10px] font-black uppercase text-gray-400 disabled:opacity-10 px-4'
            >
              Previous
            </button>
            <span className='text-[11px] font-black text-zinc-900 bg-gray-100 px-3 py-1 rounded-full uppercase'>
              {currentIdx + 1} / {quizData.length}
            </span>
            <button
              onClick={() =>
                currentIdx === quizData.length - 1
                  ? setStep('result')
                  : setCurrentIdx((p) => p + 1)
              }
              className='px-8 py-3 bg-black text-white rounded-xl font-black uppercase text-[10px] shadow-lg'
            >
              Next
            </button>
          </div>
        </div>
        <aside className='hidden lg:block'>
          <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24'>
            <p className='text-[10px] font-black text-gray-400 uppercase mb-5 flex items-center gap-2'>
              <LayoutGrid size={14} /> Question Grid
            </p>
            <div className='grid grid-cols-5 gap-2'>
              {quizData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`aspect-square rounded-xl text-[10px] font-black border-2 flex items-center justify-center ${currentIdx === i ? 'border-black' : 'border-transparent'} ${isReview ? (answers[i] === quizData[i].correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : flagged[i] ? 'bg-orange-500 text-white' : answers[i] !== null ? 'bg-[#002EFF] text-white' : 'bg-gray-100 text-gray-400'}`}
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
          <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-150 flex items-center justify-center p-8 overflow-y-auto'>
            {/* Narrower Modal: Changed to max-w-xs */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white p-6 rounded-[28px] max-w-xs w-full text-center shadow-2xl my-auto border border-gray-100'
            >
              {/* Scaled down icon and text */}
              <div className='w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-3'>
                <Trophy size={24} className='text-[#FCB900]' />
              </div>

              <h2 className='text-3xl font-black mb-0.5 tracking-tighter text-zinc-900'>
                {userScore}%
              </h2>
              <p className='text-gray-400 font-black uppercase text-[8px] tracking-widest mb-5'>
                Final Performance
              </p>

              {/* Compact Subject List */}
              <div className='space-y-2 mb-6 text-left max-h-[220px] overflow-y-auto pr-1'>
                {getSubjectStats().map((sub) => (
                  <div
                    key={sub.name}
                    className='p-3 bg-gray-50 rounded-xl border border-gray-100'
                  >
                    <div className='flex justify-between items-center mb-1'>
                      <span className='font-bold text-[9px] text-zinc-500 uppercase'>
                        {sub.name}
                      </span>
                      <span
                        className={`text-[10px] font-black ${sub.percent >= 50 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {sub.percent}%
                      </span>
                    </div>
                    <div className='w-full h-1 bg-gray-200 rounded-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.percent}%` }}
                        className={`h-full ${sub.percent >= 50 ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Smaller, slim buttons */}
              <div className='space-y-2'>
                <button
                  onClick={() => {
                    setCurrentIdx(0)
                    setStep('review')
                  }}
                  className='w-full py-2.5 bg-[#002EFF] text-white rounded-lg font-black flex items-center justify-center gap-2 text-[9px] uppercase hover:bg-blue-600 transition-all'
                >
                  <Eye size={14} /> Review Answers
                </button>

                <button
                  onClick={downloadPDF}
                  className='w-full py-2.5 bg-emerald-600 text-white rounded-lg font-black flex items-center justify-center gap-2 text-[9px] uppercase hover:bg-emerald-700 transition-all'
                >
                  <Download size={14} /> PDF Result
                </button>

                <div className='grid grid-cols-2 gap-2 pt-1'>
                  <button
                    onClick={() => setStep('setup')}
                    className='py-2 bg-gray-100 text-gray-500 rounded-lg font-black text-[8px] uppercase flex items-center justify-center gap-1.5 hover:bg-gray-200'
                  >
                    <RotateCcw size={12} /> Retake
                  </button>
                  <button
                    onClick={resetToHome}
                    className='py-2 bg-zinc-900 text-white rounded-lg font-black text-[8px] uppercase flex items-center justify-center gap-1.5 hover:bg-black'
                  >
                    <Home size={12} /> Home
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
