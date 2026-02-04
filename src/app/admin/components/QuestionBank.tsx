'use client'

import React, { useState, useRef } from 'react'
import {
  Plus,
  FileSpreadsheet,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Trash2,
  FileJson,
  Check,
  Loader2,
  Settings2,
  Table as TableIcon,
  Smartphone,
  Layers,
  Send,
  AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- TYPES ---
type Question = {
  id: string
  subject: string
  topic: string
  body: string
  options: { [key: string]: string }
  difficulty: string
  image: string | null
}

const SuccessOverlay = ({ onDone }: { onDone: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4'
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className='bg-white p-6 rounded-2xl text-center space-y-4 shadow-2xl max-w-[260px] border border-slate-100'
    >
      <div className='w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto'>
        <Check size={24} strokeWidth={3} />
      </div>
      <div>
        <h2 className='text-sm font-black text-slate-900 uppercase tracking-tight'>
          Sync Success
        </h2>
        <p className='text-[10px] text-slate-500 font-bold mt-1 leading-tight'>
          Data packets successfully ingested into the core database.
        </p>
      </div>
      <button
        onClick={onDone}
        className='w-full py-2 bg-slate-900 text-white rounded-lg font-black uppercase text-[9px] tracking-widest hover:bg-[#002EFF] transition-colors'
      >
        Continue Ingestion
      </button>
    </motion.div>
  </motion.div>
)

export default function QuestionBank() {
  const [mode, setMode] = useState<'individual' | 'bulk'>('individual')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [manualQueue, setManualQueue] = useState<Question[]>([])
  const [formData, setFormData] = useState<Partial<Question>>({
    subject: '',
    topic: '',
    body: '',
    options: { A: '', B: '', C: '', D: '' },
    difficulty: 'Standard',
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [bulkFiles, setBulkFiles] = useState<{ file: File; rows: number }[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const bulkInputRef = useRef<HTMLInputElement>(null)

  const isFormValid =
    formData.subject && formData.topic && formData.body && formData.options?.A

  const addToQueue = () => {
    const newQuestion = {
      ...formData,
      id: Date.now().toString(),
      image: selectedImage,
    } as Question
    setManualQueue([newQuestion, ...manualQueue])
    setFormData({
      ...formData,
      topic: '',
      body: '',
      options: { A: '', B: '', C: '', D: '' },
    })
    setSelectedImage(null)
  }

  const handleFinalPublish = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setIsSuccess(true)
      setManualQueue([])
      setBulkFiles([])
    }, 1200)
  }

  return (
    <div className='max-w-[1200px] mx-auto space-y-4 animate-in fade-in duration-500 pb-10 px-4'>
      <AnimatePresence>
        {isSuccess && <SuccessOverlay onDone={() => setIsSuccess(false)} />}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className='flex items-end justify-between border-b border-slate-100 pb-4'>
        <div>
          <h1 className='text-lg font-black text-slate-900 tracking-tighter leading-none flex items-center gap-2'>
            <Layers size={18} className='text-[#002EFF]' /> STUDIO{' '}
            <span className='text-[#002EFF]'>PACKET</span>
          </h1>
          <p className='text-[9px] text-[#FCB900] font-bold uppercase tracking-[0.2em] mt-1.5'>
            Content Engineering & Ingestion
          </p>
        </div>
        <div className='flex bg-slate-100 p-1 rounded-xl border border-slate-200'>
          {(['individual', 'bulk'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                mode === m
                  ? 'bg-white text-[#002EFF] shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {m === 'individual' ? 'Manual' : 'Bulk'}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* WORKSPACE */}
        <div className='lg:col-span-8 space-y-4'>
          <AnimatePresence mode='wait'>
            {mode === 'individual' ? (
              <motion.div
                key='ind'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='space-y-4'
              >
                <div className='bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-1'>
                      <label className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1'>
                        Classification
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-[#002EFF]'
                      >
                        <option value=''>Select Subject</option>
                        <option>Physics</option>
                        <option>Mathematics</option>
                        <option>Chemistry</option>
                      </select>
                    </div>
                    <div className='space-y-1'>
                      <label className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1'>
                        Knowledge Area
                      </label>
                      <input
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        placeholder='e.g. Thermodynamics'
                        className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-[#002EFF]'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1'>
                      Prompt Body
                    </label>
                    <textarea
                      value={formData.body}
                      onChange={(e) =>
                        setFormData({ ...formData, body: e.target.value })
                      }
                      rows={3}
                      className='w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-medium outline-none focus:border-[#002EFF]'
                      placeholder='Input question text here...'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    {['A', 'B', 'C', 'D'].map((char) => (
                      <div
                        key={char}
                        className='flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1'
                      >
                        <span className='text-[9px] font-black text-slate-400'>
                          {char}
                        </span>
                        <input
                          value={formData.options?.[char] || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              options: {
                                ...formData.options,
                                [char]: e.target.value,
                              },
                            })
                          }
                          className='w-full bg-transparent border-none text-[11px] font-bold outline-none'
                          placeholder='Option text'
                        />
                      </div>
                    ))}
                  </div>

                  <div className='flex gap-2 pt-2'>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex-1 py-2 border border-dashed rounded-lg text-[9px] font-black uppercase transition-all ${
                        selectedImage
                          ? 'bg-blue-50 border-blue-200 text-[#002EFF]'
                          : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      <input
                        type='file'
                        ref={fileInputRef}
                        hidden
                        accept='image/*'
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          setSelectedImage(
                            URL.createObjectURL(e.target.files[0]),
                          )
                        }
                      />
                      {selectedImage ? 'Image Attached' : 'Attach Visual'}
                    </button>
                    <button
                      onClick={addToQueue}
                      disabled={!isFormValid}
                      className='px-6 py-2 bg-slate-900 text-white rounded-lg font-black text-[9px] uppercase tracking-widest disabled:opacity-20 hover:bg-[#002EFF] transition-all'
                    >
                      Stage Question
                    </button>
                  </div>
                </div>

                {manualQueue.length > 0 && (
                  <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
                    <div className='px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center'>
                      <span className='text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]'>
                        Staged Queue ({manualQueue.length})
                      </span>
                      <button
                        onClick={handleFinalPublish}
                        className='text-[9px] font-black text-[#002EFF] uppercase flex items-center gap-2'
                      >
                        {isUploading ? (
                          <Loader2 className='animate-spin' size={10} />
                        ) : (
                          <>
                            <Send size={10} /> Publish Batch
                          </>
                        )}
                      </button>
                    </div>
                    <div className='max-h-32 overflow-y-auto divide-y divide-slate-50'>
                      {manualQueue.map((q) => (
                        <div
                          key={q.id}
                          className='px-4 py-2 flex items-center justify-between group hover:bg-slate-50'
                        >
                          <span className='text-[11px] font-bold text-slate-600 truncate max-w-md'>
                            {q.body}
                          </span>
                          <button
                            onClick={() =>
                              setManualQueue(
                                manualQueue.filter((i) => i.id !== q.id),
                              )
                            }
                            className='text-slate-300 hover:text-rose-500'
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className='bg-white rounded-2xl border-2 border-dashed border-slate-100 p-8 text-center space-y-4'>
                <div className='w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto'>
                  <UploadCloud size={24} />
                </div>
                <div>
                  <h3 className='text-sm font-black text-slate-900'>
                    Dataset Ingestion
                  </h3>
                  <p className='text-[10px] text-slate-400 font-bold uppercase tracking-tight'>
                    CSV • XLSX • JSON
                  </p>
                </div>
                <input
                  type='file'
                  ref={bulkInputRef}
                  hidden
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    setBulkFiles([{ file: e.target.files[0], rows: 42 }])
                  }
                />
                <button
                  onClick={() => bulkInputRef.current?.click()}
                  className='px-8 py-2 bg-slate-900 text-white rounded-lg font-black text-[9px] uppercase tracking-widest'
                >
                  Select Source
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* PREVIEW ASIDE */}
        <aside className='lg:col-span-4'>
          <div className='sticky top-4 space-y-3'>
            <div className='flex items-center gap-2 px-1'>
              <Smartphone size={12} className='text-slate-400' />
              <span className='text-[8px] font-black uppercase text-slate-400 tracking-widest'>
                Candidate Viewport
              </span>
            </div>
            <div className='bg-slate-950 rounded-4xl p-2 border-[6px] border-slate-900 shadow-2xl'>
              <div className='bg-white rounded-[1.4rem] h-[440px] overflow-hidden flex flex-col relative'>
                {/* Simulated Notch */}
                <div className='absolute top-0 inset-x-0 h-4 flex justify-center'>
                  <div className='w-16 h-3 bg-slate-950 rounded-b-lg' />
                </div>

                <div className='p-4 pt-6 flex-1 overflow-y-auto space-y-4'>
                  <div>
                    <span className='text-[8px] font-black text-[#002EFF] uppercase tracking-tighter bg-blue-50 px-1.5 py-0.5 rounded'>
                      {formData.subject || 'Category'}
                    </span>
                    <h4 className='text-[11px] font-black text-slate-900 mt-1 leading-tight'>
                      {formData.topic || 'Awaiting Topic...'}
                    </h4>
                  </div>

                  <div className='bg-slate-50 p-3 rounded-xl border border-slate-100'>
                    <p className='text-[11px] font-bold text-slate-800 leading-relaxed'>
                      {formData.body || 'Waiting for question input...'}
                    </p>
                  </div>

                  {selectedImage && (
                    <img
                      src={selectedImage}
                      className='w-full h-24 object-cover rounded-lg border'
                      alt='visual content'
                    />
                  )}

                  <div className='space-y-1.5'>
                    {['A', 'B', 'C', 'D'].map((k) => (
                      <div
                        key={k}
                        className='p-2 rounded-lg border border-slate-100 flex items-center gap-3 bg-white hover:border-[#002EFF] transition-colors'
                      >
                        <span className='w-5 h-5 rounded-md bg-slate-50 border text-[9px] font-black flex items-center justify-center shrink-0'>
                          {k}
                        </span>
                        <span className='text-[10px] font-bold text-slate-600 truncate'>
                          {formData.options?.[k] || '---'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='p-3 bg-slate-50 border-t'>
                  <div className='w-full py-2.5 bg-[#002EFF] text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-center shadow-lg shadow-blue-100'>
                    Submit Assessment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
