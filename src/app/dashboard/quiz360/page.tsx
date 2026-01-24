// 'use client'

// import { useState, useEffect, useRef, useCallback } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import {
//   Calculator as CalcIcon,
//   Home,
//   Zap,
//   Rocket,
//   Target,
//   Trophy,
//   CheckCircle2,
//   Timer,
//   ArrowLeft,
//   Star,
//   Crown,
//   LayoutDashboard,
//   Settings,
//   History,
//   StopCircle,
//   ShieldCheck,
// } from 'lucide-react'

// import { Card } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'

// import { ScientificCalculator } from '../../rapid-quiz/components/Calculator'
// import { SetupView } from '../../rapid-quiz/components/SetupView'
// import { QuizView } from '../../rapid-quiz/components/QuizView'
// import { ResultModal } from '../../rapid-quiz/components/ResultModal'
// import { ExitModal } from '../../rapid-quiz/components/ExitModal'

// import { questionBank } from '../../rapid-quiz/questions'
// import { downloadPDF } from '../../rapid-quiz/utils/pdfGenerator'
// import {
//   calculateScore,
//   getSubjectStats,
// } from '../../rapid-quiz/utils/quizHelpers'

// export default function RapidQuizPortal() {
//   const [view, setView] = useState<'portal' | 'engine-selector' | 'quiz-flow'>(
//     'portal',
//   )
//   const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
//     'setup',
//   )
//   const [mounted, setMounted] = useState(false)
//   const [selectedSubs, setSelectedSubs] = useState<string[]>([])
//   const [qPerSubject, setQPerSubject] = useState(10)
//   const [totalMinutes, setTotalMinutes] = useState(15)
//   const [isStudyMode, setIsStudyMode] = useState(false)
//   const [quizData, setQuizData] = useState<any[]>([])
//   const [currentIdx, setCurrentIdx] = useState(0)
//   const [answers, setAnswers] = useState<(number | null)[]>([])
//   const [flagged, setFlagged] = useState<boolean[]>([])
//   const [timeLeft, setTimeLeft] = useState(0)

//   const [isConfirming, setIsConfirming] = useState(false)
//   const [abortCountdown, setAbortCountdown] = useState<number | null>(null)
//   const [showCalc, setShowCalc] = useState(false)
//   const [showExitConfirm, setShowExitConfirm] = useState(false)
//   const timerRef = useRef<NodeJS.Timeout | null>(null)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const handleFinishQuiz = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current)
//     setAbortCountdown(null)
//     setIsConfirming(false)
//     setStep('result')
//   }, [])

//   // Main Quiz Timer
//   useEffect(() => {
//     let interval: NodeJS.Timeout
//     if (
//       view === 'quiz-flow' &&
//       step === 'quiz' &&
//       timeLeft > 0 &&
//       !isConfirming &&
//       abortCountdown === null
//     ) {
//       interval = setInterval(() => setTimeLeft((p) => p - 1), 1000)
//     } else if (timeLeft === 0 && step === 'quiz') {
//       handleFinishQuiz()
//     }
//     return () => clearInterval(interval)
//   }, [timeLeft, step, view, isConfirming, abortCountdown, handleFinishQuiz])

//   // Submission Countdown Logic (The 3, 2, 1 after submit)
//   useEffect(() => {
//     if (abortCountdown !== null && abortCountdown > 0) {
//       const t = setTimeout(() => setAbortCountdown(abortCountdown - 1), 1000)
//       return () => clearTimeout(t)
//     } else if (abortCountdown === 0) {
//       handleFinishQuiz()
//     }
//   }, [abortCountdown, handleFinishQuiz])

//   const handleStart = () => {
//     let pool: any[] = []
//     selectedSubs.forEach((sub) => {
//       const filtered = questionBank
//         .filter((q) => q.subject === sub)
//         .sort(() => 0.5 - Math.random())
//         .slice(0, qPerSubject)
//       pool = [...pool, ...filtered]
//     })
//     setQuizData(pool.sort(() => 0.5 - Math.random()))
//     setAnswers(new Array(pool.length).fill(null))
//     setFlagged(new Array(pool.length).fill(false))
//     setTimeLeft(totalMinutes * 60)
//     setCurrentIdx(0)
//     setStep('quiz')
//   }

//   // PDF Generation Trigger
//   const generatePDFReport = async () => {
//     const scoreData = calculateScore(answers, quizData)
//     const stats = getSubjectStats(quizData, answers)
//     const secondsUsed = totalMinutes * 60 - timeLeft
//     const correctCount = answers.filter(
//       (ans, idx) => ans === quizData[idx].correct,
//     ).length

//     await downloadPDF(
//       scoreData.percent,
//       quizData,
//       correctCount,
//       secondsUsed,
//       stats,
//     )
//   }

//   if (!mounted) return null

//   // Portal View Render...
//   const renderPortal = () => (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.99 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className='max-w-6xl mx-auto space-y-5'
//     >
//       <div className='flex justify-between items-end px-2'>
//         <div>
//           <h2 className='text-xl font-black text-slate-900 tracking-tight uppercase'>
//             Intelligence Core
//           </h2>
//           <p className='text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]'>
//             Standardized Testing Environment
//           </p>
//         </div>
//         <Button
//           size='sm'
//           variant='outline'
//           className='rounded-xl font-black text-[9px] h-8 border-slate-200'
//         >
//           <History size={12} className='mr-1.5' /> RECORDS
//         </Button>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
//         <section className='lg:col-span-8 relative rounded-4xl bg-zinc-950 p-8 overflow-hidden text-white shadow-2xl min-h-[280px] flex items-center border border-white/5'>
//           <div className='relative z-10 space-y-4'>
//             <Badge className='bg-blue-600 text-white font-black px-2 py-0.5 rounded-md text-[9px] border-none tracking-widest'>
//               PRO VERSION
//             </Badge>
//             <h1 className='text-4xl md:text-5xl font-black uppercase italic leading-[0.85] tracking-tighter'>
//               PERFORMANCE <br />{' '}
//               <span className='text-blue-500'>OPTIMIZED.</span>
//             </h1>
//             <Button
//               onClick={() => setView('engine-selector')}
//               className='bg-white hover:bg-zinc-200 text-black font-black rounded-xl px-6 h-10 text-[10px] uppercase mt-4'
//             >
//               INITIALIZE ENGINE <Rocket className='ml-2' size={14} />
//             </Button>
//           </div>
//           <Zap
//             className='absolute -bottom-10 -right-10 text-white/5 rotate-12'
//             size={240}
//           />
//         </section>

//         <div className='lg:col-span-4 flex flex-col gap-3'>
//           {[
//             {
//               label: 'Avg Accuracy',
//               val: '88.4%',
//               icon: Target,
//               col: 'text-emerald-500',
//               bg: 'bg-emerald-500/5',
//             },
//             {
//               label: 'Time / Question',
//               val: '42s',
//               icon: Timer,
//               col: 'text-blue-500',
//               bg: 'bg-blue-500/5',
//             },
//             {
//               label: 'Global Percentile',
//               val: '94th',
//               icon: Crown,
//               col: 'text-amber-500',
//               bg: 'bg-amber-500/5',
//             },
//           ].map((stat, i) => (
//             <Card
//               key={i}
//               className='p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center gap-4'
//             >
//               <div
//                 className={`h-9 w-9 rounded-xl ${stat.bg} ${stat.col} flex items-center justify-center shrink-0`}
//               >
//                 <stat.icon size={18} />
//               </div>
//               <div>
//                 <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest'>
//                   {stat.label}
//                 </p>
//                 <p className={`text-base font-black ${stat.col}`}>{stat.val}</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   )

//   return (
//     <div className='min-h-screen bg-[#F9FBFF] font-sans antialiased pb-24'>
//       {/* Floating Bottom Navigation */}
//       <nav className='fixed bottom-6 left-1/2 -translate-x-1/2 z-100 bg-zinc-950/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2'>
//         <Button
//           variant='ghost'
//           onClick={() => setView('portal')}
//           className={`rounded-xl h-9 w-9 p-0 ${view === 'portal' ? 'text-blue-500' : 'text-zinc-500'}`}
//         >
//           <LayoutDashboard size={18} />
//         </Button>
//         <Button
//           variant='ghost'
//           onClick={() => setView('engine-selector')}
//           className={`rounded-xl h-9 w-9 p-0 ${view === 'engine-selector' ? 'text-blue-500' : 'text-zinc-500'}`}
//         >
//           <Zap size={18} />
//         </Button>
//         <div className='w-px h-4 bg-zinc-800 mx-1' />
//         <Button
//           variant='ghost'
//           onClick={() => setShowCalc(true)}
//           className='rounded-xl h-9 w-9 p-0 text-zinc-500 hover:text-white'
//         >
//           <CalcIcon size={18} />
//         </Button>
//       </nav>

//       <div className='p-4 md:p-6 lg:p-10'>
//         <AnimatePresence mode='wait'>
//           {view === 'portal' && renderPortal()}
//           {view === 'engine-selector' && (
//             <motion.div
//               key='selector'
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className='max-w-5xl mx-auto space-y-6'
//             >
//               <div className='flex items-center gap-3 mb-6'>
//                 <Button
//                   variant='ghost'
//                   onClick={() => setView('portal')}
//                   className='rounded-xl h-9 w-9 p-0 bg-white border border-slate-100 shadow-sm'
//                 >
//                   <ArrowLeft size={16} />
//                 </Button>
//                 <h2 className='text-sm font-black uppercase tracking-widest'>
//                   Select Drill Module
//                 </h2>
//               </div>
//               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
//                 {['Speed Drill', 'Standard', 'Accuracy', 'Sprint'].map(
//                   (title, i) => (
//                     <Card
//                       key={i}
//                       className='p-5 rounded-4xl border-none shadow-sm hover:shadow-xl transition-all bg-white'
//                     >
//                       <div className='h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4'>
//                         <Zap size={20} />
//                       </div>
//                       <h3 className='font-black text-[11px] text-zinc-900 uppercase mb-4 tracking-tighter'>
//                         {title}
//                       </h3>
//                       <Button
//                         onClick={() => setView('quiz-flow')}
//                         className='w-full rounded-xl bg-zinc-950 text-white h-9 text-[9px] font-black tracking-widest'
//                       >
//                         INITIALIZE
//                       </Button>
//                     </Card>
//                   ),
//                 )}
//               </div>
//             </motion.div>
//           )}

//           {view === 'quiz-flow' && (
//             <motion.div
//               key='flow'
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className='max-w-5xl mx-auto'
//             >
//               {step === 'setup' ? (
//                 <SetupView
//                   selectedSubs={selectedSubs}
//                   setSelectedSubs={setSelectedSubs}
//                   qPerSubject={qPerSubject}
//                   setQPerSubject={setQPerSubject}
//                   totalMinutes={totalMinutes}
//                   setTotalMinutes={setTotalMinutes}
//                   isStudyMode={isStudyMode}
//                   setIsStudyMode={setIsStudyMode}
//                   handleStart={handleStart}
//                 />
//               ) : (
//                 <div className='flex flex-col gap-4'>
//                   <nav className='bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-5 py-2.5 flex justify-between items-center shadow-sm sticky top-4 z-60'>
//                     <Button
//                       variant='ghost'
//                       onClick={() => setShowExitConfirm(true)}
//                       className='rounded-lg h-8 w-8 p-0'
//                     >
//                       <Home size={16} />
//                     </Button>
//                     <div className='flex items-center gap-2'>
//                       <div
//                         className={`px-3 py-1 rounded-lg font-mono font-black text-[11px] ${timeLeft < 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-100 text-zinc-900'}`}
//                       >
//                         {Math.floor(timeLeft / 60)}:
//                         {(timeLeft % 60).toString().padStart(2, '0')}
//                       </div>
//                       <Button
//                         onClick={() => setIsConfirming(true)}
//                         className='bg-blue-600 text-white h-8 px-4 rounded-lg font-black text-[10px] uppercase tracking-widest'
//                       >
//                         Submit
//                       </Button>
//                     </div>
//                   </nav>
//                   <QuizView
//                     currentQ={quizData[currentIdx]}
//                     currentIdx={currentIdx}
//                     quizData={quizData}
//                     answers={answers}
//                     flagged={flagged}
//                     isReview={step === 'review'}
//                     isStudyMode={isStudyMode}
//                     setAnswers={setAnswers}
//                     setFlagged={setFlagged}
//                     setCurrentIdx={setCurrentIdx}
//                     onSubmit={() => setIsConfirming(true)}
//                   />
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Modals & Overlays */}
//       <AnimatePresence>
//         {isConfirming && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className='fixed inset-0 z-300 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4'
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               className='max-w-[320px] w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100'
//             >
//               <AnimatePresence mode='wait'>
//                 {abortCountdown !== null ? (
//                   <motion.div
//                     key='cd'
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className='p-8 flex flex-col items-center text-center'
//                   >
//                     <div className='relative w-20 h-20 mb-6'>
//                       <svg className='w-full h-full -rotate-90'>
//                         <circle
//                           cx='40'
//                           cy='40'
//                           r='36'
//                           stroke='#f4f4f5'
//                           strokeWidth='4'
//                           fill='none'
//                         />
//                         <motion.circle
//                           cx='40'
//                           cy='40'
//                           r='36'
//                           stroke='#ef4444'
//                           strokeWidth='4'
//                           fill='none'
//                           strokeDasharray='226.2'
//                           initial={{ strokeDashoffset: 0 }}
//                           animate={{ strokeDashoffset: 226.2 }}
//                           transition={{ duration: 3, ease: 'linear' }}
//                         />
//                       </svg>
//                       <span className='absolute inset-0 flex items-center justify-center text-2xl font-black'>
//                         {abortCountdown}
//                       </span>
//                     </div>
//                     <Button
//                       onClick={() => setAbortCountdown(null)}
//                       className='w-full h-12 bg-zinc-950 text-white rounded-xl font-black text-[10px] uppercase'
//                     >
//                       <StopCircle className='mr-2' size={16} /> ABORT
//                     </Button>
//                   </motion.div>
//                 ) : (
//                   <motion.div key='ask' exit={{ opacity: 0 }}>
//                     <div className='bg-blue-50 p-6 flex flex-col items-center border-b border-blue-100'>
//                       <ShieldCheck className='text-blue-600 mb-2' size={24} />
//                       <h3 className='text-[11px] font-black uppercase tracking-widest'>
//                         Finish Attempt?
//                       </h3>
//                     </div>
//                     <div className='p-6 space-y-2'>
//                       <Button
//                         onClick={() => setAbortCountdown(3)}
//                         className='w-full py-6 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest'
//                       >
//                         FINAL SUBMIT
//                       </Button>
//                       <Button
//                         variant='ghost'
//                         onClick={() => setIsConfirming(false)}
//                         className='w-full text-zinc-400 font-black text-[9px] uppercase'
//                       >
//                         CANCEL
//                       </Button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         )}

//         {showCalc && (
//           <div className='fixed inset-0 z-400 flex items-center justify-center pointer-events-none p-4'>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className='pointer-events-auto'
//             >
//               <ScientificCalculator onClose={() => setShowCalc(false)} />
//             </motion.div>
//           </div>
//         )}

//         {step === 'result' && (
//           <ResultModal
//             userScore={calculateScore(answers, quizData).percent}
//             subjectStats={getSubjectStats(quizData, answers)}
//             onReview={() => {
//               setCurrentIdx(0)
//               setStep('review')
//             }}
//             onDownload={generatePDFReport} // TRIGGERING THE PDF UTILITY
//             onRetake={() => {
//               setStep('setup')
//               setAnswers(new Array(quizData.length).fill(null))
//             }}
//             onHome={() => {
//               setView('portal')
//               setStep('setup')
//             }}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Calculator as CalcIcon,
  Home,
  Zap,
  Rocket,
  Target,
  Trophy,
  CheckCircle2,
  Timer,
  ArrowLeft,
  Star,
  Crown,
  LayoutDashboard,
  Settings,
  History,
  StopCircle,
  ShieldCheck,
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { ScientificCalculator } from '../../rapid-quiz/components/Calculator'
import { SetupView } from '../../rapid-quiz/components/SetupView'
import { QuizView } from '../../rapid-quiz/components/QuizView'
import { ResultModal } from '../../rapid-quiz/components/ResultModal'
import { ExitModal } from '../../rapid-quiz/components/ExitModal'

import { questionBank } from '../../rapid-quiz/questions'
import { downloadPDF } from '../../rapid-quiz/utils/pdfGenerator'
import {
  calculateScore,
  getSubjectStats,
} from '../../rapid-quiz/utils/quizHelpers'

export default function RapidQuizPortal() {
  const [view, setView] = useState<'portal' | 'engine-selector' | 'quiz-flow'>(
    'portal',
  )
  const [step, setStep] = useState<'setup' | 'quiz' | 'result' | 'review'>(
    'setup',
  )
  const [mounted, setMounted] = useState(false)
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])
  const [qPerSubject, setQPerSubject] = useState(10)
  const [totalMinutes, setTotalMinutes] = useState(15)
  const [isStudyMode, setIsStudyMode] = useState(false)
  const [quizData, setQuizData] = useState<any[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [flagged, setFlagged] = useState<boolean[]>([])
  const [timeLeft, setTimeLeft] = useState(0)

  const [isConfirming, setIsConfirming] = useState(false)
  const [abortCountdown, setAbortCountdown] = useState<number | null>(null)
  const [showCalc, setShowCalc] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFinishQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setAbortCountdown(null)
    setIsConfirming(false)
    setStep('result')
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (
      view === 'quiz-flow' &&
      step === 'quiz' &&
      timeLeft > 0 &&
      !isConfirming &&
      abortCountdown === null
    ) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000)
    } else if (timeLeft === 0 && step === 'quiz') {
      handleFinishQuiz()
    }
    return () => clearInterval(interval)
  }, [timeLeft, step, view, isConfirming, abortCountdown, handleFinishQuiz])

  useEffect(() => {
    if (abortCountdown !== null && abortCountdown > 0) {
      const t = setTimeout(() => setAbortCountdown(abortCountdown - 1), 1000)
      return () => clearTimeout(t)
    } else if (abortCountdown === 0) {
      handleFinishQuiz()
    }
  }, [abortCountdown, handleFinishQuiz])

  const handleStart = () => {
    let pool: any[] = []
    selectedSubs.forEach((sub) => {
      const filtered = questionBank
        .filter((q) => q.subject === sub)
        .sort(() => 0.5 - Math.random())
        .slice(0, qPerSubject)
      pool = [...pool, ...filtered]
    })
    setQuizData(pool.sort(() => 0.5 - Math.random()))
    setAnswers(new Array(pool.length).fill(null))
    setFlagged(new Array(pool.length).fill(false))
    setTimeLeft(totalMinutes * 60)
    setCurrentIdx(0)
    setStep('quiz')
  }

  const generatePDFReport = async () => {
    const scoreData = calculateScore(answers, quizData)
    const stats = getSubjectStats(quizData, answers)
    const secondsUsed = totalMinutes * 60 - timeLeft
    const correctCount = answers.filter(
      (ans, idx) => ans === quizData[idx].correct,
    ).length
    await downloadPDF(
      scoreData.percent,
      quizData,
      correctCount,
      secondsUsed,
      stats,
    )
  }

  if (!mounted) return null

  const renderPortal = () => (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-5xl mx-auto space-y-4'
    >
      <div className='flex justify-between items-center px-1'>
        <div className='flex items-center gap-2'>
          <div className='bg-blue-600 p-1.5 rounded-lg text-white'>
            <Trophy size={16} />
          </div>
          <div>
            <h2 className='text-sm font-black text-slate-900 uppercase leading-none'>
              Intelligence Core
            </h2>
            <p className='text-[8px] font-bold text-slate-400 uppercase tracking-tighter'>
              v3.2 Protocol Active
            </p>
          </div>
        </div>
        <div className='flex gap-1.5'>
          <Button
            size='sm'
            variant='ghost'
            className='h-8 w-8 p-0 rounded-full'
          >
            <Settings size={14} />
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='rounded-xl font-black text-[9px] h-8 border-slate-200 px-3'
          >
            <History size={12} className='mr-1' /> RECORDS
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        <section className='md:col-span-2 relative rounded-3xl bg-zinc-950 p-6 overflow-hidden text-white shadow-xl min-h-[180px] flex items-center border border-white/5'>
          <div className='relative z-10 space-y-3'>
            <div className='flex items-center gap-2'>
              <Badge className='bg-blue-600/20 text-blue-400 hover:bg-blue-600/20 font-black px-2 py-0.5 rounded text-[8px] border border-blue-500/30'>
                PRO
              </Badge>
              <div className='flex gap-0.5'>
                <Star size={10} className='text-amber-400 fill-amber-400' />
                <Star size={10} className='text-amber-400 fill-amber-400' />
                <Star size={10} className='text-amber-400 fill-amber-400' />
              </div>
            </div>
            <h1 className='text-3xl font-black uppercase italic leading-none tracking-tighter'>
              SYSTEM <span className='text-blue-500'>READY.</span>
            </h1>
            <Button
              onClick={() => setView('engine-selector')}
              className='bg-white hover:bg-zinc-200 text-black font-black rounded-lg px-4 h-8 text-[9px] uppercase transition-all active:scale-95'
            >
              INITIALIZE <Rocket className='ml-1.5' size={12} />
            </Button>
          </div>
          <Zap
            className='absolute -bottom-8 -right-8 text-white/5 rotate-12'
            size={160}
          />
        </section>

        <div className='flex flex-col gap-2'>
          {[
            {
              label: 'Accuracy',
              val: '88.4%',
              icon: Target,
              col: 'text-emerald-500',
              bg: 'bg-emerald-500/5',
            },
            {
              label: 'Latency',
              val: '42s/q',
              icon: Timer,
              col: 'text-blue-500',
              bg: 'bg-blue-500/5',
            },
            {
              label: 'Rank',
              val: 'TOP 5%',
              icon: Crown,
              col: 'text-amber-500',
              bg: 'bg-amber-500/5',
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className='p-3 rounded-xl border border-slate-100 bg-white flex items-center gap-3'
            >
              <div
                className={`h-8 w-8 rounded-lg ${stat.bg} ${stat.col} flex items-center justify-center shrink-0`}
              >
                <stat.icon size={16} />
              </div>
              <div>
                <p className='text-[7px] font-black text-slate-400 uppercase'>
                  {stat.label}
                </p>
                <p className={`text-xs font-black ${stat.col}`}>{stat.val}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className='min-h-screen bg-[#F9FBFF] font-sans antialiased pb-20'>
      <nav className='fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-950/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-2xl shadow-2xl flex items-center gap-1'>
        <Button
          variant='ghost'
          onClick={() => setView('portal')}
          className={`rounded-xl h-8 w-8 p-0 ${view === 'portal' ? 'text-blue-500 bg-white/5' : 'text-zinc-500'}`}
        >
          <LayoutDashboard size={16} />
        </Button>
        <Button
          variant='ghost'
          onClick={() => setView('engine-selector')}
          className={`rounded-xl h-8 w-8 p-0 ${view === 'engine-selector' ? 'text-blue-500 bg-white/5' : 'text-zinc-500'}`}
        >
          <Zap size={16} />
        </Button>
        <div className='w-px h-3 bg-zinc-800 mx-1' />
        <Button
          variant='ghost'
          onClick={() => setShowCalc(true)}
          className='rounded-xl h-8 w-8 p-0 text-zinc-500 hover:text-white'
        >
          <CalcIcon size={16} />
        </Button>
      </nav>

      <div className='p-4 md:p-6'>
        <AnimatePresence mode='wait'>
          {view === 'portal' && renderPortal()}

          {view === 'engine-selector' && (
            <motion.div
              key='selector'
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className='max-w-4xl mx-auto'
            >
              <div className='flex items-center gap-2 mb-4'>
                <Button
                  variant='ghost'
                  onClick={() => setView('portal')}
                  className='h-8 w-8 p-0 bg-white border border-slate-100 rounded-lg'
                >
                  <ArrowLeft size={14} />
                </Button>
                <h2 className='text-[10px] font-black uppercase tracking-widest'>
                  Select Module
                </h2>
              </div>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
                {['Speed Drill', 'Standard', 'Accuracy', 'Sprint'].map(
                  (title, i) => (
                    <Card
                      key={i}
                      className='p-4 rounded-2xl border-none shadow-sm hover:shadow-md transition-all bg-white text-center'
                    >
                      <div className='h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2'>
                        <Zap size={16} />
                      </div>
                      <h3 className='font-black text-[9px] uppercase mb-3 tracking-tighter'>
                        {title}
                      </h3>
                      <Button
                        onClick={() => setView('quiz-flow')}
                        className='w-full rounded-lg bg-zinc-950 text-white h-7 text-[8px] font-black'
                      >
                        INITIALIZE
                      </Button>
                    </Card>
                  ),
                )}
              </div>
            </motion.div>
          )}

          {view === 'quiz-flow' && (
            <motion.div
              key='flow'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='max-w-4xl mx-auto'
            >
              {step === 'setup' ? (
                <SetupView
                  selectedSubs={selectedSubs}
                  setSelectedSubs={setSelectedSubs}
                  qPerSubject={qPerSubject}
                  setQPerSubject={setQPerSubject}
                  totalMinutes={totalMinutes}
                  setTotalMinutes={setTotalMinutes}
                  isStudyMode={isStudyMode}
                  setIsStudyMode={setIsStudyMode}
                  handleStart={handleStart}
                />
              ) : (
                <div className='space-y-3'>
                  <nav className='bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-2 flex justify-between items-center shadow-sm sticky top-2 z-40'>
                    <Button
                      variant='ghost'
                      onClick={() => setShowExitConfirm(true)}
                      className='h-7 w-7 p-0'
                    >
                      <Home size={14} />
                    </Button>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`px-2 py-0.5 rounded-md font-mono font-black text-[10px] ${timeLeft < 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-100 text-zinc-900'}`}
                      >
                        {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, '0')}
                      </div>
                      <Button
                        onClick={() => setIsConfirming(true)}
                        className='bg-blue-600 text-white h-7 px-3 rounded-md font-black text-[9px] uppercase'
                      >
                        Submit
                      </Button>
                    </div>
                  </nav>
                  <QuizView
                    currentQ={quizData[currentIdx]}
                    currentIdx={currentIdx}
                    quizData={quizData}
                    answers={answers}
                    flagged={flagged}
                    isReview={step === 'review'}
                    isStudyMode={isStudyMode}
                    setAnswers={setAnswers}
                    setFlagged={setFlagged}
                    setCurrentIdx={setCurrentIdx}
                    onSubmit={() => setIsConfirming(true)}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation & Submission Flow */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-100 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4'
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className='max-w-[280px] w-full bg-white rounded-3xl overflow-hidden shadow-2xl'
            >
              <AnimatePresence mode='wait'>
                {abortCountdown !== null ? (
                  <motion.div
                    key='cd'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='p-6 flex flex-col items-center text-center'
                  >
                    <div className='relative w-16 h-16 mb-4'>
                      <svg className='w-full h-full -rotate-90'>
                        <circle
                          cx='32'
                          cy='32'
                          r='28'
                          stroke='#f4f4f5'
                          strokeWidth='3'
                          fill='none'
                        />
                        <motion.circle
                          cx='32'
                          cy='32'
                          r='28'
                          stroke='#ef4444'
                          strokeWidth='3'
                          fill='none'
                          strokeDasharray='175.9'
                          initial={{ strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: 175.9 }}
                          transition={{ duration: 3, ease: 'linear' }}
                        />
                      </svg>
                      <span className='absolute inset-0 flex items-center justify-center text-xl font-black'>
                        {abortCountdown}
                      </span>
                    </div>
                    <Button
                      onClick={() => setAbortCountdown(null)}
                      className='w-full h-10 bg-zinc-950 text-white rounded-xl font-black text-[9px] uppercase'
                    >
                      <StopCircle className='mr-1.5' size={14} /> ABORT SYNC
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key='ask'>
                    <div className='bg-blue-50 p-4 flex flex-col items-center border-b border-blue-100'>
                      <ShieldCheck className='text-blue-600 mb-1' size={20} />
                      <h3 className='text-[9px] font-black uppercase tracking-widest'>
                        Final Check
                      </h3>
                    </div>
                    <div className='p-4 space-y-2'>
                      <Button
                        onClick={() => setAbortCountdown(3)}
                        className='w-full py-5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase'
                      >
                        <CheckCircle2 className='mr-1.5' size={14} /> COMPLETE
                      </Button>
                      <Button
                        variant='ghost'
                        onClick={() => setIsConfirming(false)}
                        className='w-full text-zinc-400 font-black text-[8px] uppercase'
                      >
                        BACK
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {showExitConfirm && (
          <ExitModal
            onClose={() => setShowExitConfirm(false)}
            onReset={() => {
              setView('portal')
              setStep('setup')
              setShowExitConfirm(false)
            }}
          />
        )}

        {showCalc && (
          <div className='fixed inset-0 z-110 flex items-center justify-center pointer-events-none p-4'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className='pointer-events-auto shadow-2xl'
            >
              <ScientificCalculator onClose={() => setShowCalc(false)} />
            </motion.div>
          </div>
        )}

        {step === 'result' && (
          <ResultModal
            userScore={calculateScore(answers, quizData).percent}
            subjectStats={getSubjectStats(quizData, answers)}
            onReview={() => {
              setCurrentIdx(0)
              setStep('review')
            }}
            onDownload={generatePDFReport}
            onRetake={() => {
              setStep('setup')
              setAnswers(new Array(quizData.length).fill(null))
            }}
            onHome={() => {
              setView('portal')
              setStep('setup')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}