'use client'
import React from 'react'
import {
  Search,
  Zap,
  UploadCloud,
  Edit3,
  Trash2,
  CheckCircle2,
  ListOrdered,
} from 'lucide-react'

export const QuestionPool = ({
  questions,
  setQuestions,
  searchQuery,
  setSearchQuery,
  globalMark,
  setGlobalMark,
  applyGlobalMark,
  onEdit,
}: any) => {
  const filteredQuestions = questions.filter(
    (q: any) =>
      q.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className='lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-right-4 duration-500'>
      {/* TOOLBAR */}
      <div className='bg-white p-5 rounded-3xl border border-slate-200 shadow-sm'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='relative w-full md:w-64'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
              size={14}
            />
            <input
              placeholder='Search questions...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold outline-none focus:border-indigo-300 transition-all'
            />
          </div>

          <div className='flex items-center gap-2 bg-indigo-50/50 p-1.5 rounded-2xl border border-indigo-100 w-full md:w-auto'>
            <div className='flex items-center gap-2 px-3 border-r border-indigo-100'>
              <Zap size={14} className='text-amber-500' />
              <span className='text-[10px] font-black text-indigo-900 uppercase'>
                Apply Marks:
              </span>
              <input
                type='number'
                value={globalMark}
                onChange={(e) => setGlobalMark(Number(e.target.value))}
                className='w-8 bg-transparent text-[11px] font-black text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              />
            </div>
            <button
              onClick={applyGlobalMark}
              className='px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase hover:bg-indigo-700 transition-all active:scale-95'
            >
              Update All
            </button>
          </div>
        </div>
      </div>

      {/* QUESTION LIST */}
      <div className='space-y-4'>
        {filteredQuestions.length === 0 ? (
          <div className='bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-20 flex flex-col items-center text-slate-400'>
            <div className='bg-slate-50 p-6 rounded-full mb-4'>
              <UploadCloud size={48} className='opacity-20' />
            </div>
            <p className='text-[12px] font-black uppercase tracking-widest text-slate-500'>
              No Questions Found
            </p>
            <p className='text-[10px] font-medium mt-1'>
              Add your first question or import from Excel
            </p>
          </div>
        ) : (
          filteredQuestions.map((q: any, idx: number) => (
            <div
              key={q.id}
              className='bg-white p-6 rounded-[32px] border border-slate-200 hover:border-indigo-400 transition-all group relative shadow-sm hover:shadow-xl hover:shadow-indigo-50/50'
            >
              <div className='flex justify-between items-start mb-4'>
                <div className='flex flex-wrap gap-2'>
                  <span className='bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1'>
                    <ListOrdered size={10} /> {idx + 1}
                  </span>
                  <span className='px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tight'>
                    {q.subject}
                  </span>
                  {q.topic && (
                    <span className='px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tight'>
                      {q.topic}
                    </span>
                  )}
                  <span className='px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-tight'>
                    {q.mark} pts
                  </span>
                </div>

                <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0'>
                  <button
                    onClick={() => onEdit(q)}
                    className='p-2 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm'
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() =>
                      setQuestions(questions.filter((i: any) => i.id !== q.id))
                    }
                    className='p-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm'
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className='flex gap-4'>
                {q.image && (
                  <div className='w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50'>
                    <img
                      src={q.image}
                      alt='Question'
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}
                <div className='flex-1'>
                  <p className='text-[14px] font-bold text-slate-800 leading-snug mb-4'>
                    {q.body}
                  </p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    {Object.entries(q.options).map(
                      ([k, v]: any) =>
                        v && (
                          <div
                            key={k}
                            className={`text-[11px] p-3 rounded-2xl border-2 flex items-center gap-2 transition-colors ${
                              q.correctOption === k
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 font-bold'
                                : 'border-slate-50 bg-slate-50/50 text-slate-500'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] ${
                                q.correctOption === k
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                            >
                              {k}
                            </span>
                            <span className='truncate'>{v}</span>
                            {q.correctOption === k && (
                              <CheckCircle2
                                size={12}
                                className='ml-auto text-emerald-500'
                              />
                            )}
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
