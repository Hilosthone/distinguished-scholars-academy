'use client'
import React from 'react'
import { ArrowRight, BookOpen, ScrollText } from 'lucide-react'

interface SetupStepProps {
  config: {
    title: string
    description: string
  }
  setConfig: (config: any) => void
  onNext: () => void
}

export const SetupStep = ({ config, setConfig, onNext }: SetupStepProps) => {
  // Simple validation to ensure Title is present before proceeding
  const canProceed = config.title.trim().length > 3

  return (
    <div className='max-w-2xl mx-auto mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden'>
        {/* HEADER SECTION */}
        <div className='bg-slate-900 p-10 text-white relative overflow-hidden'>
          <div className='relative z-10'>
            <div className='w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20'>
              <BookOpen className='text-indigo-400' size={24} />
            </div>
            <h2 className='text-2xl font-black uppercase tracking-tighter italic'>
              Create New Examination
            </h2>
            <p className='text-slate-400 text-[10px] uppercase font-bold tracking-[0.3em] mt-1'>
              Phase 01: Identity & Instructions
            </p>
          </div>
          {/* Subtle Decorative Element */}
          <div className='absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl' />
        </div>

        {/* FORM SECTION */}
        <div className='p-10 space-y-8'>
          {/* Exam Name Input */}
          <div className='space-y-2'>
            <label className='block text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest'>
              Exam Name / Title
            </label>
            <div className='relative group'>
              <input
                value={config.title}
                onChange={(e) =>
                  setConfig({ ...config, title: e.target.value })
                }
                className='w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[24px] font-bold text-slate-800 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-300'
                placeholder='e.g. 2026 Unified Tertiary Matriculation'
              />
              <div className='absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-200 transition-colors'>
                <ScrollText size={20} />
              </div>
            </div>
          </div>

          {/* Instructions Textarea */}
          <div className='space-y-2'>
            <label className='block text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest'>
              Candidate Instructions
            </label>
            <textarea
              value={config.description}
              onChange={(e) =>
                setConfig({ ...config, description: e.target.value })
              }
              rows={5}
              className='w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[32px] focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none font-medium text-slate-600 leading-relaxed placeholder:text-slate-300'
              placeholder="Provide clear instructions for students (e.g. 'Ensure you have a stable connection', 'No calculators allowed')..."
            />
          </div>

          {/* Action Button */}
          <div className='pt-4'>
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`w-full py-5 rounded-[24px] font-black uppercase text-[12px] tracking-widest transition-all flex justify-center items-center gap-3 shadow-xl 
                ${
                  canProceed
                    ? 'bg-slate-900 text-white hover:bg-indigo-600 hover:-translate-y-1 shadow-indigo-200'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                }`}
            >
              Start Building Questions
              <ArrowRight
                size={18}
                className={`${canProceed ? 'animate-pulse' : ''}`}
              />
            </button>
            {!canProceed && (
              <p className='text-center text-[9px] font-bold text-slate-400 uppercase mt-4 tracking-tighter'>
                Please enter a valid exam title to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER HINT */}
      <p className='text-center mt-8 text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em]'>
        Your progress is saved locally as you build
      </p>
    </div>
  )
}
