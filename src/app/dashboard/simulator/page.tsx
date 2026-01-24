'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Monitor,
  Calculator,
  Flag,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  AlertCircle,
  CheckCircle2,
  Crown,
} from 'lucide-react'

export default function ExamSimulator() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [marked, setMarked] = useState<number[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({})

  // Mock Timer Logic (scaled to 2 hours)
  const [timeLeft, setTimeLeft] = useState(7200)
  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000,
    )
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleSelect = (index: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: index })
  }

  const toggleMark = () => {
    setMarked((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion],
    )
  }

  return (
    <div className='flex flex-col gap-3 animate-in fade-in duration-500 max-w-6xl mx-auto scale-[0.98] origin-top'>
      {/* --- COMPACT STATUS BAR --- */}
      <div className='flex items-center justify-between bg-[#002EFF] p-3 px-5 rounded-2xl shadow-lg border border-white/10 text-white'>
        <div className='flex items-center gap-3'>
          <div className='p-1.5 bg-white/10 rounded-lg'>
            <Monitor size={16} className='text-[#FCB900]' />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p className='text-[8px] font-black text-blue-200 uppercase tracking-[0.2em]'>
                UTME Simulation
              </p>
              <Badge className='bg-[#FCB900] text-[#002EFF] h-3.5 px-1 text-[7px] font-black border-none'>
                PRO MODE
              </Badge>
            </div>
            <h3 className='text-[11px] font-black italic uppercase'>
              Biology & Chemistry <span className='text-blue-300 mx-1'>•</span>{' '}
              2026 Session
            </h3>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-right border-r border-white/10 pr-4'>
            <p className='text-[8px] font-black text-blue-200 uppercase'>
              Time Remaining
            </p>
            <p
              className={`text-lg font-mono font-black leading-none ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-[#FCB900]'}`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-black text-[9px] gap-2'
          >
            <Calculator size={14} />{' '}
            <span className='hidden sm:inline'>CALCULATOR</span>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        {/* --- MAIN QUESTION AREA --- */}
        <div className='lg:col-span-3 space-y-3'>
          <Card className='p-6 md:p-10 rounded-3xl border-none shadow-sm bg-white min-h-[420px] flex flex-col justify-between relative overflow-hidden'>
            <div className='absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none'>
              <Crown size={240} />
            </div>

            <div className='relative z-10'>
              <div className='flex justify-between items-center mb-6'>
                <Badge className='bg-blue-50 text-[#002EFF] border-none px-3 py-1 rounded-lg font-black text-[9px] uppercase'>
                  Question {currentQuestion + 1} of 40
                </Badge>
                <button
                  onClick={toggleMark}
                  className={`flex items-center gap-1.5 text-[9px] font-black transition-colors ${marked.includes(currentQuestion) ? 'text-orange-500' : 'text-gray-300 hover:text-gray-500'}`}
                >
                  <Flag
                    size={12}
                    className={
                      marked.includes(currentQuestion) ? 'fill-orange-500' : ''
                    }
                  />
                  {marked.includes(currentQuestion)
                    ? 'REVIEW FLAG SET'
                    : 'MARK FOR REVIEW'}
                </button>
              </div>

              <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-8 leading-snug max-w-2xl'>
                Which of the following describes the function of the{' '}
                <span className='text-[#002EFF] border-b-2 border-[#FCB900]/40'>
                  Smooth Endoplasmic Reticulum
                </span>
                ?
              </h2>

              <div className='grid grid-cols-1 gap-2'>
                {[
                  'Protein synthesis and transport',
                  'Lipid synthesis and detoxification',
                  'ATP production via respiration',
                  'Genetic material storage',
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`flex items-center gap-3 p-3 px-4 rounded-xl border-2 transition-all text-left group
                      ${
                        selectedAnswers[currentQuestion] === i
                          ? 'border-[#002EFF] bg-blue-50/30 shadow-sm'
                          : 'border-gray-50 hover:border-blue-100 hover:bg-gray-50/50'
                      }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors
                      ${selectedAnswers[currentQuestion] === i ? 'bg-[#002EFF] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100'}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span
                      className={`text-[12px] font-bold ${selectedAnswers[currentQuestion] === i ? 'text-blue-700' : 'text-gray-600'}`}
                    >
                      {opt}
                    </span>
                    {selectedAnswers[currentQuestion] === i && (
                      <CheckCircle2
                        size={14}
                        className='ml-auto text-[#002EFF]'
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className='flex justify-between items-center mt-8 pt-5 border-t border-gray-100 relative z-10'>
              <Button
                variant='ghost'
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((q) => q - 1)}
                className='h-8 text-[10px] font-black text-gray-400 hover:text-[#002EFF] gap-1'
              >
                <ChevronLeft size={14} /> PREV
              </Button>

              <div className='flex gap-2'>
                <Button
                  variant='ghost'
                  className='h-8 text-[10px] font-black text-red-400 hover:bg-red-50 rounded-xl px-3'
                >
                  <XCircle size={14} className='mr-1.5' /> TERMINATE
                </Button>
                <Button
                  onClick={() =>
                    currentQuestion < 39 && setCurrentQuestion((q) => q + 1)
                  }
                  className='h-8 bg-[#FCB900] hover:bg-[#eab000] text-[#002EFF] rounded-xl text-[10px] font-black px-6 shadow-md'
                >
                  {currentQuestion === 39
                    ? 'FINALIZE SUBMISSION'
                    : 'SAVE & NEXT'}
                  <ChevronRight size={14} className='ml-1' />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* --- COMPACT SIDEBAR --- */}
        <div className='space-y-3'>
          <Card className='p-4 rounded-3xl border-none shadow-sm bg-white'>
            <h3 className='text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 mb-4'>
              <Info size={14} className='text-[#002EFF]' /> Progress Matrix
            </h3>

            <div className='grid grid-cols-5 gap-1.5'>
              {Array.from({ length: 40 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`aspect-square rounded-lg text-[9px] font-black flex items-center justify-center border transition-all
                    ${
                      i === currentQuestion
                        ? 'bg-[#002EFF] text-white ring-2 ring-blue-100 ring-offset-1 z-10'
                        : marked.includes(i)
                          ? 'bg-orange-500 text-white'
                          : selectedAnswers[i] !== undefined
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className='mt-6 grid grid-cols-2 gap-y-2 border-t pt-4'>
              <div className='flex items-center gap-1.5 text-[8px] font-black text-gray-500 uppercase'>
                <div className='w-2 h-2 rounded-full bg-[#002EFF]' /> Active
              </div>
              <div className='flex items-center gap-1.5 text-[8px] font-black text-gray-500 uppercase'>
                <div className='w-2 h-2 rounded-full bg-emerald-500' /> Done
              </div>
              <div className='flex items-center gap-1.5 text-[8px] font-black text-gray-500 uppercase'>
                <div className='w-2 h-2 rounded-full bg-orange-500' /> Review
              </div>
              <div className='flex items-center gap-1.5 text-[8px] font-black text-gray-500 uppercase'>
                <div className='w-2 h-2 rounded-full bg-gray-200' /> Empty
              </div>
            </div>
          </Card>

          <div className='p-3 bg-[#002EFF]/5 rounded-2xl border border-blue-100/50'>
            <div className='flex gap-2 items-start'>
              <AlertCircle size={14} className='text-[#002EFF] shrink-0' />
              <p className='text-[9px] font-bold text-blue-800 leading-tight'>
                Anti-Cheat active. Tab switching is logged for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}