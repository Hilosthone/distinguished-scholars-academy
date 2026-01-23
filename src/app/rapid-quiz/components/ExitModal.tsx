'use client'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface ExitModalProps {
  onClose: () => void
  onReset: () => void
}

export const ExitModal = ({ onClose, onReset }: ExitModalProps) => {
  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-200 flex items-center justify-center p-4'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl'
      >
        <div className='w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
          <AlertTriangle size={32} />
        </div>
        <h3 className='text-xl font-black mb-2 text-zinc-900 uppercase tracking-tight'>
          Exit Quiz?
        </h3>
        <p className='text-gray-500 text-sm mb-6'>
          Progress is saved. Choose to exit to the website or restart the setup.
        </p>
        <div className='flex flex-col gap-2'>
          <button
            onClick={() => (window.location.href = '/')}
            className='py-3 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase hover:bg-black transition-colors'
          >
            Back to Website
          </button>
          <button
            onClick={onReset}
            className='py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase hover:bg-red-700 transition-colors'
          >
            New Quiz Setup
          </button>
          <button
            onClick={onClose}
            className='py-3 bg-gray-100 text-zinc-400 rounded-xl font-black text-[10px] uppercase hover:bg-gray-200 transition-colors'
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}
