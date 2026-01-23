'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, GripHorizontal } from 'lucide-react'

export const ScientificCalculator = ({ onClose }: { onClose: () => void }) => {
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
            className='p-1 hover:bg-white/10 rounded-lg'
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
