'use client'
import { motion } from 'framer-motion'
import { Flag, Info, CheckCircle2, LayoutGrid } from 'lucide-react'

interface QuizViewProps {
  currentQ: any
  currentIdx: number
  quizData: any[]
  answers: (number | null)[]
  flagged: boolean[]
  isReview: boolean
  isStudyMode: boolean
  setAnswers: (a: any) => void
  setFlagged: (f: any) => void
  setCurrentIdx: (i: any) => void
  onSubmit: () => void
}

export const QuizView = ({
  currentQ,
  currentIdx,
  quizData,
  answers,
  flagged,
  isReview,
  isStudyMode,
  setAnswers,
  setFlagged,
  setCurrentIdx,
  onSubmit,
}: QuizViewProps) => {
  if (!currentQ) return null

  return (
    <main className='max-w-5xl mx-auto p-4 md:p-6 grid lg:grid-cols-[1fr_300px] gap-6'>
      <div className='w-full'>
        <div className='bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative min-h-[400px]'>
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
                  className={`p-2.5 rounded-xl border transition-all ${
                    flagged[currentIdx]
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                      : 'text-gray-300 border-gray-100'
                  }`}
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
                    className={`p-5 rounded-2xl border-2 text-left text-sm font-semibold transition-all flex justify-between items-center ${style}`}
                  >
                    <span>
                      {String.fromCharCode(65 + i)}. {opt}
                    </span>
                    {(isReview ||
                      (isStudyMode && answers[currentIdx] !== null)) &&
                      isCorrect && (
                        <CheckCircle2 size={18} className='text-green-500' />
                      )}
                  </button>
                )
              })}
            </div>

            {(isReview || (isStudyMode && answers[currentIdx] !== null)) && (
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
        </div>

        <div className='flex justify-between items-center bg-white p-4 mt-4 rounded-2xl border border-gray-100 shadow-sm'>
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((p: number) => p - 1)}
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
                ? onSubmit()
                : setCurrentIdx((p: number) => p + 1)
            }
            className='px-8 py-3 bg-black text-white rounded-xl font-black uppercase text-[10px] shadow-lg'
          >
            {currentIdx === quizData.length - 1 ? 'Finish' : 'Next'}
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
                className={`aspect-square rounded-xl text-[10px] font-black border-2 flex items-center justify-center transition-all ${
                  currentIdx === i ? 'border-black' : 'border-transparent'
                } ${
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
  )
}
