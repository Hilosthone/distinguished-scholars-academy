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

// --- SMART MAPPING MODAL ---
const MappingModal = ({
  file,
  onConfirm,
  onCancel,
}: {
  file: File
  onConfirm: () => void
  onCancel: () => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='fixed inset-0 z-60 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4'
  >
    <motion.div
      initial={{ scale: 0.95, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      className='bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200'
    >
      <div className='p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50'>
        <div>
          <h3 className='text-base font-bold text-slate-900'>Field Mapping</h3>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-tight'>
            Source: {file.name}
          </p>
        </div>
        <button
          onClick={onCancel}
          className='p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-400'
        >
          <X size={18} />
        </button>
      </div>
      <div className='p-6 space-y-4'>
        <div className='bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3'>
          <TableIcon className='text-blue-600 mt-0.5' size={16} />
          <p className='text-[12px] font-medium text-blue-900 leading-snug'>
            System detected columns. Confirm mapping for ingestion.
          </p>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {[
            'Question_Text',
            'Correct_Choice',
            'Difficulty_Level',
            'Subject_Tag',
          ].map((field) => (
            <div key={field} className='space-y-1.5'>
              <label className='text-[9px] font-black uppercase text-slate-500 ml-1'>
                {field.replace('_', ' ')}
              </label>
              <select className='w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:border-blue-500'>
                <option>Matched: {field}</option>
                <option>Column_A</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      <div className='p-5 bg-slate-50 border-t border-slate-100'>
        <button
          onClick={onConfirm}
          className='w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-blue-500/20'
        >
          Confirm & Import
        </button>
      </div>
    </motion.div>
  </motion.div>
)

const SuccessOverlay = ({ onDone }: { onDone: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='fixed inset-0 z-70 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4'
  >
    <motion.div
      initial={{ scale: 0.9, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      className='bg-white p-8 rounded-2xl text-center space-y-4 shadow-2xl max-w-xs border border-slate-100'
    >
      <div className='w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto'>
        <Check size={28} strokeWidth={3} />
      </div>
      <div>
        <h2 className='text-lg font-bold text-slate-900'>Sync Complete</h2>
        <p className='text-xs text-slate-500 font-medium mt-1'>
          Content successfully pushed to database.
        </p>
      </div>
      <button
        onClick={onDone}
        className='w-full py-2.5 bg-slate-900 text-white rounded-lg font-bold uppercase text-[10px] tracking-widest'
      >
        Continue
      </button>
    </motion.div>
  </motion.div>
)

export default function QuestionBank() {
  const [mode, setMode] = useState<'individual' | 'bulk'>('individual')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [mappingFile, setMappingFile] = useState<File | null>(null)
  const [manualQueue, setManualQueue] = useState<Question[]>([])
  const [formData, setFormData] = useState<Partial<Question>>({
    subject: '',
    topic: '',
    body: '',
    options: { A: '', B: '', C: '', D: '' },
    difficulty: 'Standard',
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [bulkFiles, setBulkFiles] = useState<
    { file: File; status: 'ready' | 'mapped'; rows: number }[]
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const bulkInputRef = useRef<HTMLInputElement>(null)

  const isFormValid =
    formData.subject &&
    formData.topic &&
    formData.body &&
    formData.options?.A &&
    formData.options?.B

  const handleBulkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setMappingFile(e.target.files[0])
  }

  const finalizeMapping = () => {
    if (mappingFile) {
      setBulkFiles([
        ...bulkFiles,
        {
          file: mappingFile,
          status: 'mapped',
          rows: Math.floor(Math.random() * 50) + 10,
        },
      ])
      setMappingFile(null)
    }
  }

  const addToQueue = () => {
    const newQuestion = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
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
    }, 1500)
  }

  return (
    <div className='max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10'>
      <AnimatePresence>
        {isSuccess && <SuccessOverlay onDone={() => setIsSuccess(false)} />}
        {mappingFile && (
          <MappingModal
            file={mappingFile}
            onConfirm={finalizeMapping}
            onCancel={() => setMappingFile(null)}
          />
        )}
      </AnimatePresence>

      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>
            Question Studio
          </h1>
          <p className='text-[11px] text-slate-500 font-semibold uppercase tracking-wider'>
            Create and manage your question bank
          </p>
        </div>
        <div className='flex bg-slate-200/50 p-1 rounded-xl border border-slate-200 self-start'>
          {(['individual', 'bulk'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {m === 'individual' ? 'Manual Builder' : 'Bulk Import'}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* LEFT WORKSPACE */}
        <div className='lg:col-span-8 space-y-6'>
          <AnimatePresence mode='wait'>
            {mode === 'individual' ? (
              <motion.div
                key='ind'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='space-y-4'
              >
                <section className='bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold outline-none'
                    >
                      <option value=''>Subject...</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>English Language</option>
                      <option>Government</option>
                    </select>
                    <input
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      placeholder='Topic...'
                      className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold outline-none'
                    />
                  </div>
                  <textarea
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    rows={3}
                    className='w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium outline-none'
                    placeholder='Enter question prompt...'
                  />
                  <div className='grid grid-cols-2 gap-3'>
                    {['A', 'B', 'C', 'D'].map((char) => (
                      <input
                        key={char}
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
                        className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold'
                        placeholder={`Option ${char}`}
                      />
                    ))}
                  </div>
                  <div className='flex gap-3 pt-2'>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex-1 py-2.5 border-2 border-dashed rounded-lg text-[10px] font-bold uppercase transition-colors ${selectedImage ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-400'}`}
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
                      {selectedImage ? 'Image Set' : 'Add Image'}
                    </button>
                    <button
                      onClick={addToQueue}
                      disabled={!isFormValid}
                      className='flex-2 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest disabled:opacity-30 shadow-md shadow-blue-500/10'
                    >
                      Stage Question
                    </button>
                  </div>
                </section>

                {manualQueue.length > 0 && (
                  <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
                    <div className='p-3.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center'>
                      <h3 className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>
                        Staged ({manualQueue.length})
                      </h3>
                      <button
                        onClick={handleFinalPublish}
                        className='text-[10px] font-black text-blue-600 uppercase flex items-center gap-1.5'
                      >
                        {isUploading ? (
                          <Loader2 className='animate-spin' size={12} />
                        ) : (
                          <>
                            <Send size={12} /> Publish
                          </>
                        )}
                      </button>
                    </div>
                    <div className='max-h-48 overflow-y-auto divide-y divide-slate-50'>
                      {manualQueue.map((q) => (
                        <div
                          key={q.id}
                          className='p-3 flex items-center justify-between group hover:bg-slate-50 transition-colors'
                        >
                          <span className='text-[12px] font-bold text-slate-700 truncate max-w-sm'>
                            {q.body}
                          </span>
                          <button
                            onClick={() =>
                              setManualQueue(
                                manualQueue.filter((i) => i.id !== q.id),
                              )
                            }
                            className='text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key='bulk'
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className='space-y-4'
              >
                <div className='bg-white rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center'>
                  <div className='w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <UploadCloud size={28} />
                  </div>
                  <h2 className='text-lg font-bold text-slate-900'>
                    Dataset Ingestion
                  </h2>
                  <p className='text-[12px] text-slate-500 font-medium mb-6'>
                    CSV, Excel, or JSON formats supported.
                  </p>
                  <input
                    type='file'
                    ref={bulkInputRef}
                    hidden
                    onChange={handleBulkChange}
                    accept='.csv,.xlsx,.json'
                  />
                  <button
                    onClick={() => bulkInputRef.current?.click()}
                    className='px-8 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest'
                  >
                    Upload Dataset
                  </button>
                </div>

                {bulkFiles.length > 0 && (
                  <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
                    {bulkFiles.map((item, idx) => (
                      <div
                        key={idx}
                        className='p-4 flex items-center justify-between border-b border-slate-50 last:border-0'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                            <FileSpreadsheet size={16} />
                          </div>
                          <div>
                            <p className='font-bold text-slate-800 text-[12px]'>
                              {item.file.name}
                            </p>
                            <p className='text-[9px] font-bold text-slate-400 uppercase'>
                              {item.rows} Rows
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setBulkFiles(bulkFiles.filter((_, i) => i !== idx))
                          }
                          className='text-slate-300 hover:text-rose-500'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <div className='p-4 bg-slate-50 border-t border-slate-100'>
                      <button
                        onClick={handleFinalPublish}
                        className='w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20'
                      >
                        Process {bulkFiles.length} File(s)
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PREVIEW - Scaled Down */}
        <aside className='lg:col-span-4'>
          <div className='sticky top-6 space-y-4'>
            <div className='flex items-center gap-2 px-1 text-slate-400'>
              <Smartphone size={14} />
              <span className='text-[9px] font-black uppercase tracking-widest'>
                Preview Mode
              </span>
            </div>
            <div className='w-full max-w-[280px] mx-auto bg-slate-900 rounded-[2.5rem] p-2 border-4 border-slate-800 shadow-xl'>
              <div className='bg-white rounded-[1.8rem] h-[480px] overflow-hidden flex flex-col'>
                <div className='p-5 pt-6 space-y-1'>
                  <p className='text-[9px] font-black text-blue-600 uppercase tracking-tighter'>
                    {formData.subject || 'Subject'}
                  </p>
                  <h4 className='text-[12px] font-bold text-slate-900 truncate'>
                    {formData.topic || 'Topic Title'}
                  </h4>
                </div>
                <div className='px-5 flex-1 space-y-4 overflow-y-auto custom-scrollbar'>
                  <div className='bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] font-bold text-slate-800 leading-relaxed'>
                    {formData.body || 'Question text preview...'}
                  </div>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt='preview'
                      className='w-full h-24 object-contain rounded-lg border bg-white'
                    />
                  )}
                  <div className='space-y-1.5 pb-4'>
                    {['A', 'B', 'C', 'D'].map((k) => (
                      <div
                        key={k}
                        className='p-2 rounded-lg border border-slate-100 flex items-center gap-2 text-[10px] font-bold text-slate-600 bg-white'
                      >
                        <span className='w-5 h-5 rounded bg-slate-50 border flex items-center justify-center text-[8px] font-black shrink-0'>
                          {k}
                        </span>
                        <span className='truncate'>
                          {formData.options?.[k] || '...'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='p-4 border-t bg-slate-50/50'>
                  <div className='w-full py-2 bg-blue-600 text-white rounded-lg text-center text-[9px] font-black uppercase tracking-widest'>
                    Submit Answer
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
