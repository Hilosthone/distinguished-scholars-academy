'use client'

import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Trash2,
  Download,
  Plus,
  FolderOpen,
  HardDrive,
  X,
  CheckCircle2,
  ShieldCheck,
  CheckSquare,
  Square,
  Layers,
  Archive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// --- TYPES ---
interface Material {
  id: string
  title: string
  category: string
  size: string
  uploadDate: string
  type: string
}

const CATEGORIES = [
  'Textbook',
  'Handout',
  'Syllabus',
  'Reference',
  'Exam Paper',
]

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Batch Upload States
  const [stagedFiles, setStagedFiles] = useState<File[]>([])
  const [stagedCategory, setStagedCategory] = useState(CATEGORIES[0])
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success'
  >('idle')
  const [uploadProgress, setUploadProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Advanced Mathematics Vol 1',
      category: 'Textbook',
      size: '4.2 MB',
      uploadDate: '2026-02-05',
      type: 'PDF',
    },
    {
      id: '2',
      title: 'Q4 Physics Lab Manual',
      category: 'Handout',
      size: '1.8 MB',
      uploadDate: '2026-01-12',
      type: 'PDF',
    },
  ])

  // --- DYNAMIC ANALYTICS ---
  const totalBandwidth = useMemo(() => {
    const totalMB = materials.reduce(
      (acc, curr) => acc + parseFloat(curr.size),
      0,
    )
    return totalMB >= 1000
      ? `${(totalMB / 1024).toFixed(2)} GB`
      : `${totalMB.toFixed(2)} MB`
  }, [materials])

  // --- FILTER LOGIC ---
  const filteredMaterials = useMemo(() => {
    return materials.filter((file) => {
      const matchesSearch = file.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || file.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, materials])

  // --- BULK HANDLERS ---
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const selectAll = () => {
    if (selectedIds.length === filteredMaterials.length) setSelectedIds([])
    else setSelectedIds(filteredMaterials.map((m) => m.id))
  }

  const bulkDelete = () => {
    setMaterials((prev) => prev.filter((m) => !selectedIds.includes(m.id)))
    setSelectedIds([])
  }

  const bulkDownload = () => {
    // In a real app, this would hit an endpoint that streams a ZIP
    console.log('Downloading batch:', selectedIds)
    alert(`Generating ZIP for ${selectedIds.length} assets...`)
  }

  // --- BATCH UPLOAD LOGIC ---
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStagedFiles(Array.from(e.target.files))
      setIsUploadModalOpen(true)
    }
  }

  const startBatchUpload = () => {
    setUploadStatus('uploading')
    let prog = 0
    const interval = setInterval(() => {
      prog += Math.random() * 20
      if (prog >= 100) {
        setUploadProgress(100)
        clearInterval(interval)
        setTimeout(finalizeBatchUpload, 600)
      } else {
        setUploadProgress(prog)
      }
    }, 200)
  }

  const finalizeBatchUpload = () => {
    const newItems: Material[] = stagedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace('.pdf', ''),
      category: stagedCategory,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      type: 'PDF',
    }))
    setMaterials((prev) => [...newItems, ...prev])
    setUploadStatus('success')
    setTimeout(() => {
      setIsUploadModalOpen(false)
      setUploadStatus('idle')
      setStagedFiles([])
      setUploadProgress(0)
    }, 1200)
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6 pb-20'>
      {/* 1. ANALYTICS STRIP */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <StatCard
          label='Vault Assets'
          value={materials.length}
          icon={ShieldCheck}
          color='text-blue-600'
          bg='bg-blue-50'
        />
        <StatCard
          label='Total Size'
          value={totalBandwidth}
          icon={HardDrive}
          color='text-indigo-600'
          bg='bg-indigo-50'
        />
        <StatCard
          label='Selected'
          value={selectedIds.length}
          icon={CheckSquare}
          color='text-emerald-600'
          bg='bg-emerald-50'
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className='h-full py-4 bg-[#002EFF] hover:bg-blue-700 rounded-3xl flex items-center justify-between group shadow-lg shadow-blue-200 border-none transition-all'
        >
          <div className='text-left'>
            <p className='text-[9px] font-black text-blue-200 uppercase tracking-widest'>
              Batch Operations
            </p>
            <p className='text-sm font-black text-white uppercase'>
              Upload Files
            </p>
          </div>
          <Plus
            className='text-white group-hover:rotate-90 transition-transform'
            size={24}
          />
        </Button>
      </div>

      {/* 2. PERSISTENT BULK ACTIONS BAR */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className='sticky top-4 z-40 bg-slate-900 p-4 rounded-3xl flex items-center justify-between shadow-2xl border border-slate-800'
          >
            <div className='flex items-center gap-4 pl-4'>
              <div className='bg-blue-500/20 p-2 rounded-xl'>
                <Layers className='text-blue-400' size={18} />
              </div>
              <p className='text-xs font-black text-white uppercase tracking-widest'>
                {selectedIds.length} Assets Selected
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                onClick={bulkDownload}
                className='bg-blue-600 hover:bg-blue-500 text-white rounded-2xl h-11 px-6 font-black text-[10px] uppercase tracking-widest'
              >
                <Download size={14} className='mr-2' /> Download .ZIP
              </Button>
              <Button
                onClick={bulkDelete}
                className='bg-rose-600 hover:bg-rose-500 text-white rounded-2xl h-11 px-6 font-black text-[10px] uppercase tracking-widest'
              >
                <Trash2 size={14} className='mr-2' /> Delete All
              </Button>
              <Button
                onClick={() => setSelectedIds([])}
                variant='ghost'
                className='text-slate-400 hover:text-white rounded-xl'
              >
                <X size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex flex-col xl:flex-row gap-8'>
        <div className='flex-1 space-y-6'>
          {/* 3. SEARCH & GLOBAL SELECT */}
          <div className='flex gap-4'>
            <div className='relative flex-1'>
              <Search
                className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-300'
                size={18}
              />
              <Input
                placeholder='Search storage vault...'
                className='pl-14 bg-white border-none shadow-sm rounded-3xl h-16 text-xs font-bold uppercase tracking-widest focus-visible:ring-1 focus-visible:ring-blue-200'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={selectAll}
              className='h-16 px-8 bg-white rounded-3xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-[#002EFF] shadow-sm border-none transition-colors'
            >
              {selectedIds.length === filteredMaterials.length
                ? 'Deselect'
                : 'Select All'}
            </Button>
          </div>

          {/* 4. DATA LIST */}
          <div className='flex flex-col gap-3'>
            <AnimatePresence mode='popLayout'>
              {filteredMaterials.map((file) => (
                <MaterialRow
                  key={file.id}
                  file={file}
                  isSelected={selectedIds.includes(file.id)}
                  onSelect={() => toggleSelect(file.id)}
                  onDelete={() =>
                    setMaterials((m) => m.filter((x) => x.id !== file.id))
                  }
                />
              ))}
            </AnimatePresence>
            {filteredMaterials.length === 0 && (
              <div className='py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200'>
                <Archive size={40} className='mx-auto text-slate-300 mb-4' />
                <p className='text-xs font-black text-slate-400 uppercase tracking-widest'>
                  No resources found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 5. SIDEBAR NAVIGATION */}
        <div className='xl:w-72 space-y-6'>
          <div className='bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 sticky top-6'>
            <h3 className='px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center justify-between'>
              Folders <FolderOpen size={12} />
            </h3>
            <div className='space-y-1'>
              {['All', ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center justify-between px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all w-full group ${selectedCategory === cat ? 'bg-[#002EFF] text-white shadow-xl shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className='flex items-center gap-3'>{cat}</span>
                  <span
                    className={`text-[9px] ${selectedCategory === cat ? 'text-white/40' : 'text-slate-300'}`}
                  >
                    {cat === 'All'
                      ? materials.length
                      : materials.filter((m) => m.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <input
        type='file'
        ref={fileInputRef}
        multiple
        onChange={handleFileSelection}
        className='hidden'
        accept='.pdf'
      />

      {/* 6. BATCH UPLOAD MODAL */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-6'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
              onClick={() => setIsUploadModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className='relative bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl p-10 overflow-hidden'
            >
              {uploadStatus === 'idle' && (
                <div className='space-y-8'>
                  <div className='flex justify-between items-center'>
                    <Badge className='bg-blue-50 text-blue-600 border-none px-4 py-2 font-black text-[9px] uppercase tracking-widest'>
                      {stagedFiles.length} Files Queued
                    </Badge>
                    <button
                      onClick={() => setIsUploadModalOpen(false)}
                      className='p-2 hover:bg-slate-100 rounded-full transition-colors'
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className='max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar'>
                    {stagedFiles.map((f, i) => (
                      <div
                        key={i}
                        className='p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100'
                      >
                        <div className='bg-white p-2 rounded-lg'>
                          <FileText size={14} className='text-rose-500' />
                        </div>
                        <span className='text-[10px] font-black text-slate-600 truncate uppercase tracking-tight'>
                          {f.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className='space-y-4'>
                    <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1'>
                      Batch Category
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setStagedCategory(cat)}
                          className={`px-4 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${stagedCategory === cat ? 'bg-[#002EFF] border-[#002EFF] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={startBatchUpload}
                    className='w-full bg-slate-900 hover:bg-[#002EFF] text-white h-16 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition-all'
                  >
                    Deploy to Vault
                  </Button>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className='py-12 flex flex-col items-center text-center'>
                  <div className='w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-8 p-0.5'>
                    <motion.div
                      className='bg-[#002EFF] h-full rounded-full shadow-[0_0_15px_rgba(0,46,255,0.4)]'
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <h2 className='text-lg font-black text-slate-900 uppercase tracking-tighter'>
                    Syncing Batch Assets...
                  </h2>
                  <p className='text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest'>
                    {Math.round(uploadProgress)}% Complete
                  </p>
                </div>
              )}

              {uploadStatus === 'success' && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className='py-12 flex flex-col items-center text-center'
                >
                  <div className='bg-emerald-50 p-6 rounded-[2.5rem] mb-6'>
                    <CheckCircle2 size={48} className='text-emerald-500' />
                  </div>
                  <h2 className='text-lg font-black text-slate-900 uppercase tracking-tighter'>
                    Vault Updated
                  </h2>
                  <p className='text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest'>
                    Encryption and Indexing Complete
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className='bg-white p-5 rounded-4xl border border-slate-50 shadow-sm flex items-center gap-4'>
      <div className={`p-4 rounded-2xl ${bg} ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className='text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5'>
          {label}
        </p>
        <p className='text-xl font-black text-slate-900 leading-none'>
          {value}
        </p>
      </div>
    </div>
  )
}

function MaterialRow({ file, isSelected, onSelect, onDelete }: any) {
  return (
    <motion.div
      layout
      className={`bg-white p-3 pr-6 rounded-3xl border transition-all flex items-center gap-6 group ${isSelected ? 'border-[#002EFF] bg-blue-50/20' : 'border-slate-100'}`}
    >
      <button
        onClick={onSelect}
        className={`transition-all ${isSelected ? 'text-[#002EFF] scale-110' : 'text-slate-200 hover:text-slate-400'}`}
      >
        {isSelected ? (
          <CheckSquare size={22} fill='currentColor' className='text-white' />
        ) : (
          <Square size={22} />
        )}
      </button>

      <div className='p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all'>
        <FileText size={20} />
      </div>

      <div className='flex flex-1 items-center justify-between min-w-0'>
        <div className='min-w-0 flex-1'>
          <h4 className='font-black text-slate-800 text-xs uppercase tracking-tight truncate'>
            {file.title}
          </h4>
          <p className='text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-0.5'>
            REF: {file.id} • {file.uploadDate}
          </p>
        </div>
        <div className='hidden md:flex items-center gap-4 px-6'>
          <Badge className='bg-slate-50 text-slate-500 border-slate-100 text-[8px] font-black px-3 py-1 uppercase tracking-widest'>
            {file.category}
          </Badge>
          <span className='text-[9px] font-black text-slate-300 uppercase tracking-widest'>
            {file.size}
          </span>
        </div>
      </div>

      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
        <Button
          variant='ghost'
          size='icon'
          className='h-10 w-10 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50'
        >
          <Download size={16} />
        </Button>
        <Button
          onClick={onDelete}
          variant='ghost'
          size='icon'
          className='h-10 w-10 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50'
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </motion.div>
  )
}
