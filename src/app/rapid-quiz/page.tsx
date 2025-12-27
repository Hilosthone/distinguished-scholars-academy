'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Timer,
  Trophy,
  Clock,
  LayoutGrid,
  AlertCircle,
  Settings2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpenText,
} from 'lucide-react'
import { questionBank } from './questions'

export default function RapidQuizPortal() {
  // Added 'review' to the step types
  const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
    'setup'
  )
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])
  const [qPerSubject, setQPerSubject] = useState(5)
  const [totalMinutes, setTotalMinutes] = useState(15)

  const [quizData, setQuizData] = useState<typeof questionBank>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)

  const handleStart = () => {
    if (selectedSubs.length === 0) return
    let finalPool: typeof questionBank = []
    selectedSubs.forEach((sub) => {
      const subQuestions = questionBank
        .filter((q) => q.subject === sub)
        .sort(() => 0.5 - Math.random())
        .slice(0, qPerSubject)
      finalPool = [...finalPool, ...subQuestions]
    })
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

  // --- NEW: REVIEW VIEW ---
  if (step === 'review')
    return (
      <div className='min-h-screen bg-[#F8FAFF] pb-20'>
        <div className='bg-white border-b px-6 py-4 sticky top-0 z-30 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <BookOpenText className='text-[#002EFF]' />
            <h2 className='font-black text-gray-800'>CORRECTION PORTAL</h2>
          </div>
          <button
            onClick={() => window.location.reload()}
            className='flex items-center gap-2 bg-[#002EFF] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-100'
          >
            <RotateCcw size={16} /> RESTART MOCK
          </button>
        </div>

        <div className='max-w-3xl mx-auto p-6 space-y-8 mt-4'>
          {quizData.map((q, i) => {
            const isCorrect = answers[i] === q.correct
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                key={i}
                className={`bg-white p-8 rounded-4xl shadow-sm border-2 ${
                  isCorrect ? 'border-green-100' : 'border-red-100'
                }`}
              >
                <div className='flex justify-between items-start mb-4'>
                  <span className='text-[10px] font-black px-3 py-1 bg-gray-100 rounded-full text-gray-500 uppercase'>
                    {q.subject} • QUESTION {i + 1}
                  </span>
                  {isCorrect ? (
                    <span className='flex items-center gap-1 text-green-600 font-bold text-sm'>
                      <CheckCircle2 size={16} /> Correct
                    </span>
                  ) : (
                    <span className='flex items-center gap-1 text-red-600 font-bold text-sm'>
                      <XCircle size={16} /> Incorrect
                    </span>
                  )}
                </div>

                <h3 className='text-lg font-bold text-gray-800 mb-6'>
                  {q.question}
                </h3>

                <div className='grid gap-3 mb-6'>
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = answers[i] === optIdx
                    const isCorrectOption = q.correct === optIdx

                    let cardStyle = 'bg-gray-50 border-gray-50 text-gray-500'
                    if (isCorrectOption)
                      cardStyle = 'bg-green-50 border-green-500 text-green-700'
                    else if (isUserPick && !isCorrect)
                      cardStyle = 'bg-red-50 border-red-500 text-red-700'

                    return (
                      <div
                        key={optIdx}
                        className={`p-4 rounded-xl border-2 font-bold flex justify-between items-center ${cardStyle}`}
                      >
                        <span>
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </span>
                        {isCorrectOption && <CheckCircle2 size={18} />}
                        {isUserPick && !isCorrect && <XCircle size={18} />}
                      </div>
                    )
                  })}
                </div>

                <div className='bg-blue-50 p-5 rounded-2xl border border-blue-100'>
                  <p className='text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1'>
                    Explanation
                  </p>
                  <p className='text-sm text-blue-800 leading-relaxed font-medium'>
                    {q.explanation}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )

  // --- SETUP VIEW ---
  if (step === 'setup')
    return (
      <div className='min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6'>
        <div className='bg-white p-10 rounded-[40px] shadow-xl max-w-lg w-full border border-gray-100'>
          <h2 className='text-3xl font-black text-[#002EFF] mb-2 text-center'>
            DSA RAPID QUIZ
          </h2>
          <p className='text-gray-500 mb-8 text-center text-sm font-medium'>
            Configure your custom mock examination.
          </p>
          <div className='mb-8'>
            <p className='text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest'>
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
            <div>
              <div className='flex justify-between mb-2'>
                <p className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>
                  2. Questions per Subject
                </p>
                <span className='text-[#002EFF] font-black'>{qPerSubject}</span>
              </div>
              <input
                type='range'
                min='1'
                max='10'
                value={qPerSubject}
                onChange={(e) => setQPerSubject(parseInt(e.target.value))}
                className='w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#002EFF]'
              />
            </div>
            <div>
              <div className='flex justify-between mb-2'>
                <p className='text-[10px] font-black uppercase text-gray-400 tracking-widest'>
                  3. Total Duration (Mins)
                </p>
                <span className='text-[#002EFF] font-black'>
                  {totalMinutes}m
                </span>
              </div>
              <input
                type='range'
                min='5'
                max='60'
                step='5'
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(parseInt(e.target.value))}
                className='w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FCB900]'
              />
            </div>
          </div>
          <button
            disabled={selectedSubs.length === 0}
            onClick={handleStart}
            className='w-full py-5 bg-[#FCB900] text-black font-black rounded-3xl hover:bg-black hover:text-white transition-all shadow-lg shadow-yellow-100 disabled:opacity-30'
          >
            START {selectedSubs.length * qPerSubject} QUESTIONS
          </button>
        </div>
      </div>
    )

  const currentQ = quizData[currentIdx]

  // --- QUIZ VIEW ---
  return (
    <div className='min-h-screen bg-[#F8FAFF] pb-12'>
      <div className='bg-white border-b px-6 py-4 sticky top-0 z-20 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <span className='font-black text-xl text-[#002EFF] hidden md:block'>
            DSA CBT
          </span>
          <div className='flex gap-1'>
            {Array.from(new Set(quizData.map((q) => q.subject))).map((s) => (
              <span
                key={s}
                className={`px-2 py-1 rounded-md text-[9px] font-black ${
                  currentQ?.subject === s
                    ? 'bg-[#002EFF] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-xl font-mono font-black bg-gray-50 px-4 py-2 rounded-2xl border text-gray-700'>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <button
            onClick={() => setStep('result')}
            className='bg-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm'
          >
            FINISH
          </button>
        </div>
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        <div className='bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100'>
          <div className='flex items-center gap-2 mb-8'>
            <span className='bg-blue-50 text-[#002EFF] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest'>
              {currentQ?.subject}
            </span>
            <span className='text-gray-300 font-bold text-xs'>
              Q{currentIdx + 1} / {quizData.length}
            </span>
          </div>
          <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-10 leading-relaxed'>
            {currentQ?.question}
          </h2>
          <div className='grid gap-3'>
            {currentQ?.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const a = [...answers]
                  a[currentIdx] = i
                  setAnswers(a)
                }}
                className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${
                  answers[currentIdx] === i
                    ? 'border-[#002EFF] bg-blue-50 text-[#002EFF]'
                    : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'
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
        </div>

        <div className='mt-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100'>
          <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center'>
            Question Navigator
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            {quizData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-10 h-10 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center border-b-2 ${
                  currentIdx === i
                    ? 'bg-[#002EFF] text-white border-blue-900 scale-110 shadow-lg shadow-blue-100'
                    : answers[i] !== null
                    ? 'bg-green-500 border-green-700 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULT OVERLAY */}
      {step === 'result' && (
        <div className='fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='bg-white p-12 rounded-[50px] max-w-md w-full text-center'
          >
            <div className='w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Trophy size={48} className='text-[#FCB900]' />
            </div>
            <h2 className='text-3xl font-black mb-2'>EXAM FINISHED</h2>
            <div className='text-6xl font-black text-[#002EFF] my-6'>
              {Math.round(
                (answers.filter((a, i) => a === quizData[i].correct).length /
                  quizData.length) *
                  100
              )}
              %
            </div>
            <p className='text-gray-500 font-bold mb-8'>
              You scored{' '}
              {answers.filter((a, i) => a === quizData[i].correct).length} /{' '}
              {quizData.length}
            </p>

            <div className='grid gap-3'>
              <button
                onClick={() => setStep('review')}
                className='w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2'
              >
                <BookOpenText size={18} /> REVIEW CORRECTIONS
              </button>
              <button
                onClick={() => window.location.reload()}
                className='w-full py-4 border-2 border-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-50 transition-all'
              >
                RETRY MOCK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
