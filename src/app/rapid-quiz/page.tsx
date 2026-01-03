'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Clock,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpenText,
  ChevronRight,
  Zap,
  Home,
} from 'lucide-react'
import { questionBank } from './questions'

export default function RapidQuizPortal() {
  const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
    'setup'
  )
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])
  const [qPerSubject, setQPerSubject] = useState(10)
  const [totalMinutes, setTotalMinutes] = useState(15)
  const [quizData, setQuizData] = useState<typeof questionBank>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)

  // Redirect to Main Site
  const exitToMainSite = () => {
    window.location.href = 'http://localhost:3000'
  }

  const playDing = useCallback(() => {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const context = new AudioContextClass()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(523.25, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(
      1046.5,
      context.currentTime + 0.1
    )

    gainNode.gain.setValueAtTime(0.1, context.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + 0.5
    )

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.start()
    oscillator.stop(context.currentTime + 0.5)
  }, [])

  const goHome = () => {
    setStep('setup')
    setCurrentIdx(0)
    setAnswers([])
    setSelectedSubs([])
  }

  const slideIn = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  }

  const handleStart = () => {
    if (selectedSubs.length === 0) return

    let finalPool: typeof questionBank = []

    selectedSubs.forEach((sub: string) => {
      const subQuestions = questionBank
        .filter((q) => q.subject === sub)
        .sort(() => 0.5 - Math.random())
        .slice(0, qPerSubject)
      finalPool = [...finalPool, ...subQuestions]
    })

    // Mix subjects randomly so they don't appear in blocks
    finalPool.sort(() => 0.5 - Math.random())

    setQuizData(finalPool)
    setAnswers(new Array(finalPool.length).fill(null))
    setTimeLeft(totalMinutes * 60)
    setStep('quiz')
  }

  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0) {
      const t = setInterval(() => setTimeLeft((p) => p - 1), 1000)
      return () => clearInterval(t)
    } else if (timeLeft === 0 && step === 'quiz') {
      setStep('result')
    }
  }, [timeLeft, step])

  if (step === 'review')
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='min-h-screen bg-[#F8FAFF] pb-20'
      >
        <div className='bg-white border-b px-6 py-4 sticky top-0 z-30 flex justify-between items-center shadow-sm'>
          <button
            onClick={goHome}
            className='flex items-center gap-2 hover:opacity-70 transition-opacity'
          >
            <BookOpenText className='text-[#002EFF]' />
            <h2 className='font-black text-gray-800 tracking-tight uppercase'>
              Correction Portal
            </h2>
          </button>
          <div className='flex gap-3'>
            <button
              onClick={exitToMainSite}
              className='flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold text-sm'
            >
              <Home size={16} /> HOME
            </button>
            <button
              onClick={() => window.location.reload()}
              className='flex items-center gap-2 bg-[#002EFF] text-white px-6 py-2 rounded-xl font-bold text-sm'
            >
              <RotateCcw size={16} /> RESTART
            </button>
          </div>
        </div>

        <div className='max-w-3xl mx-auto p-6 space-y-8 mt-4'>
          {quizData.map((q, i) => {
            const isCorrect = answers[i] === q.correct
            return (
              <div
                key={i}
                className={`bg-white p-8 rounded-3xl border-2 ${
                  isCorrect ? 'border-green-100' : 'border-red-100'
                }`}
              >
                <div className='flex justify-between mb-4'>
                  <span className='text-[10px] font-black px-3 py-1 bg-gray-100 rounded-full text-gray-500'>
                    {q.subject} • Q{i + 1}
                  </span>
                  {isCorrect ? (
                    <span className='text-green-600 font-bold text-sm'>
                      Correct
                    </span>
                  ) : (
                    <span className='text-red-600 font-bold text-sm'>
                      Incorrect
                    </span>
                  )}
                </div>
                <h3 className='text-lg font-bold mb-6'>{q.question}</h3>
                <div className='grid gap-3 mb-6'>
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-4 rounded-xl border-2 font-bold ${
                        q.correct === optIdx
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : answers[i] === optIdx
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </div>
                  ))}
                </div>
                <div className='bg-blue-50 p-5 rounded-2xl text-blue-800 text-sm font-medium'>
                  <p className='text-[10px] font-black uppercase mb-1'>
                    Explanation
                  </p>
                  {q.explanation}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    )

  if (step === 'setup')
    return (
      <div className='min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center p-6'>
        <button
          onClick={exitToMainSite}
          className='mb-6 flex items-center gap-2 text-gray-400 hover:text-[#002EFF] font-bold text-sm transition-colors'
        >
          <XCircle size={18} /> BACK TO MAIN SITE
        </button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full'
        >
          <div className='flex justify-center mb-4'>
            <Zap className='text-[#002EFF]' size={32} />
          </div>
          <h2 className='text-3xl font-black text-[#002EFF] mb-8 text-center uppercase tracking-tighter'>
            Exam Portal
          </h2>

          <div className='mb-8'>
            <p className='text-[10px] font-black uppercase text-gray-400 mb-3'>
              1. Select Subjects
            </p>
            <div className='grid grid-cols-3 gap-2'>
              {['ENG', 'MATH', 'PHY', 'CHEM', 'BIO'].map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setSelectedSubs((p) =>
                      p.includes(s) ? p.filter((x) => x !== s) : [...p, s]
                    )
                  }
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${
                    selectedSubs.includes(s)
                      ? 'bg-[#002EFF] border-[#002EFF] text-white'
                      : 'bg-gray-50 border-gray-100 text-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className='space-y-6 mb-8'>
            <div className='flex justify-between items-center'>
              <p className='text-[10px] font-black uppercase text-gray-400'>
                Questions / Subject: {qPerSubject}
              </p>
              <input
                type='range'
                min='1'
                max='20'
                value={qPerSubject}
                onChange={(e) => setQPerSubject(parseInt(e.target.value))}
                className='accent-[#002EFF]'
              />
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-[10px] font-black uppercase text-gray-400'>
                Duration: {totalMinutes}m
              </p>
              <input
                type='range'
                min='5'
                max='120'
                step='5'
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(parseInt(e.target.value))}
                className='accent-[#FCB900]'
              />
            </div>

            <div className='p-4 bg-blue-50 rounded-2xl flex justify-between items-center'>
              <span className='text-xs font-bold text-blue-900'>
                Total Exam Questions:
              </span>
              <span className='text-lg font-black text-[#002EFF]'>
                {selectedSubs.length * qPerSubject}
              </span>
            </div>
          </div>

          <button
            disabled={selectedSubs.length === 0}
            onClick={handleStart}
            className='w-full py-5 bg-[#FCB900] text-black font-black rounded-3xl disabled:opacity-30 shadow-xl hover:scale-[1.02] transition-transform'
          >
            START ASSESSMENT
          </button>
        </motion.div>
      </div>
    )

  const currentQ = quizData[currentIdx]

  return (
    <div className='min-h-screen bg-[#F8FAFF] pb-12'>
      <div className='bg-white border-b px-6 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm'>
        <button
          onClick={goHome}
          className='font-black text-xl text-[#002EFF] hover:opacity-70 transition-all'
        >
          DSA CBT
        </button>
        <div className='flex items-center gap-4'>
          <div
            className={`text-xl font-mono font-black px-4 py-2 rounded-2xl border ${
              timeLeft < 60
                ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                : 'bg-gray-50'
            }`}
          >
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to end this mock?'))
                setStep('result')
            }}
            className='bg-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm'
          >
            FINISH
          </button>
        </div>
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIdx}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={slideIn}
            className='bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100'
          >
            <div className='flex justify-between items-center mb-8'>
              <span className='bg-blue-50 text-[#002EFF] px-4 py-1.5 rounded-full font-black text-[10px] uppercase'>
                {currentQ?.subject}
              </span>
              <span className='text-gray-400 font-bold text-sm'>
                Question {currentIdx + 1} of {quizData.length}
              </span>
            </div>

            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-8'>
              {currentQ?.question}
            </h2>
            <div className='grid gap-3'>
              {currentQ?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playDing()
                    const a = [...answers]
                    a[currentIdx] = i
                    setAnswers(a)
                  }}
                  className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${
                    answers[currentIdx] === i
                      ? 'border-[#002EFF] bg-blue-50 text-[#002EFF]'
                      : 'border-gray-50 bg-gray-50 hover:bg-white'
                  }`}
                >
                  <span>
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      answers[currentIdx] === i
                        ? 'bg-[#002EFF] border-[#002EFF]'
                        : 'border-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className='flex justify-between mt-10 pt-8 border-t border-gray-100'>
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((p) => p - 1)}
                className='px-6 py-3 rounded-xl font-black text-sm bg-gray-100 disabled:opacity-30'
              >
                PREVIOUS
              </button>
              <button
                onClick={() =>
                  currentIdx === quizData.length - 1
                    ? setStep('result')
                    : setCurrentIdx((p) => p + 1)
                }
                className='px-8 py-3 rounded-xl font-black text-sm bg-black text-white'
              >
                {currentIdx === quizData.length - 1
                  ? 'SUBMIT'
                  : 'NEXT QUESTION'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className='mt-8 bg-white p-8 rounded-[40px] flex flex-wrap justify-center gap-2'>
          {quizData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-10 h-10 rounded-xl font-black text-xs border-b-4 transition-all ${
                currentIdx === i
                  ? 'bg-[#002EFF] text-white border-blue-900 -translate-y-1'
                  : answers[i] !== null
                  ? 'bg-green-500 border-green-700 text-white'
                  : 'bg-gray-100 text-gray-400 border-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {step === 'result' && (
          <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='bg-white p-12 rounded-[50px] max-w-md w-full text-center'
            >
              <Trophy size={48} className='text-[#FCB900] mx-auto mb-6' />
              <h2 className='text-3xl font-black mb-2'>MOCK COMPLETED</h2>
              <div className='text-7xl font-black text-[#002EFF] my-6'>
                {Math.round(
                  (answers.filter((a, i) => a === quizData[i].correct).length /
                    quizData.length) *
                    100
                )}
                %
              </div>
              <p className='mb-6 text-gray-500 font-bold'>
                You scored{' '}
                {answers.filter((a, i) => a === quizData[i].correct).length} out
                of {quizData.length}
              </p>
              <div className='grid gap-3'>
                <button
                  onClick={() => setStep('review')}
                  className='w-full py-4 bg-black text-white font-black rounded-2xl'
                >
                  VIEW CORRECTIONS
                </button>
                <button
                  onClick={exitToMainSite}
                  className='w-full py-4 bg-[#002EFF] text-white font-black rounded-2xl shadow-lg shadow-blue-200'
                >
                  RETURN TO HOME PAGE
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className='w-full py-4 border-2 border-gray-100 text-gray-400 font-black rounded-2xl'
                >
                  RETRY MOCK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}