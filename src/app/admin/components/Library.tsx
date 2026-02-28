// 'use client'

// import React, { useState, useMemo, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   FileText,
//   Search,
//   Trash2,
//   Download,
//   Plus,
//   FolderOpen,
//   HardDrive,
//   X,
//   CheckCircle2,
//   ShieldCheck,
//   CheckSquare,
//   Square,
//   Layers,
//   Archive,
//   CloudUpload,
//   MoreVertical,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'

// // --- TYPES ---
// interface Material {
//   id: string
//   title: string
//   category: string
//   size: string
//   uploadDate: string
//   type: string
// }

// const CATEGORIES = [
//   'Textbook',
//   'Handout',
//   'Syllabus',
//   'Reference',
//   'Exam Paper',
// ]

// export default function Library() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
//   const [selectedIds, setSelectedIds] = useState<string[]>([])
//   const [stagedFiles, setStagedFiles] = useState<File[]>([])
//   const [stagedCategory, setStagedCategory] = useState(CATEGORIES[0])
//   const [uploadStatus, setUploadStatus] = useState<
//     'idle' | 'uploading' | 'success'
//   >('idle')
//   const [uploadProgress, setUploadProgress] = useState(0)

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const [materials, setMaterials] = useState<Material[]>([
//     {
//       id: '1',
//       title: 'Advanced Mathematics Vol 1',
//       category: 'Textbook',
//       size: '4.2 MB',
//       uploadDate: '2026-02-05',
//       type: 'PDF',
//     },
//     {
//       id: '2',
//       title: 'Q4 Physics Lab Manual',
//       category: 'Handout',
//       size: '1.8 MB',
//       uploadDate: '2026-01-12',
//       type: 'PDF',
//     },
//   ])

//   // --- ANALYTICS ---
//   const stats = useMemo(() => {
//     const totalMB = materials.reduce(
//       (acc, curr) => acc + parseFloat(curr.size),
//       0,
//     )
//     return {
//       size:
//         totalMB >= 1000
//           ? `${(totalMB / 1024).toFixed(2)} GB`
//           : `${totalMB.toFixed(2)} MB`,
//       count: materials.length,
//       selected: selectedIds.length,
//     }
//   }, [materials, selectedIds])

//   const filteredMaterials = useMemo(() => {
//     return materials.filter((file) => {
//       const matchesSearch = file.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//       const matchesCategory =
//         selectedCategory === 'All' || file.category === selectedCategory
//       return matchesSearch && matchesCategory
//     })
//   }, [searchTerm, selectedCategory, materials])

//   // --- HANDLERS ---
//   const toggleSelect = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
//     )
//   }

//   const selectAll = () => {
//     if (selectedIds.length === filteredMaterials.length) setSelectedIds([])
//     else setSelectedIds(filteredMaterials.map((m) => m.id))
//   }

//   const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setStagedFiles(Array.from(e.target.files))
//       setIsUploadModalOpen(true)
//     }
//   }

//   const startBatchUpload = () => {
//     setUploadStatus('uploading')
//     let prog = 0
//     const interval = setInterval(() => {
//       prog += Math.random() * 15
//       if (prog >= 100) {
//         setUploadProgress(100)
//         clearInterval(interval)
//         setTimeout(() => {
//           const newItems = stagedFiles.map((file) => ({
//             id: Math.random().toString(36).substr(2, 9),
//             title: file.name.replace('.pdf', ''),
//             category: stagedCategory,
//             size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//             uploadDate: new Date().toISOString().split('T')[0],
//             type: 'PDF',
//           }))
//           setMaterials((prev) => [...newItems, ...prev])
//           setUploadStatus('success')
//           setTimeout(() => {
//             setIsUploadModalOpen(false)
//             setUploadStatus('idle')
//             setStagedFiles([])
//           }, 1000)
//         }, 500)
//       } else setUploadProgress(prog)
//     }, 150)
//   }

//   return (
//     <div className='max-w-7xl mx-auto p-6 space-y-8 pb-32 font-sans'>
//       {/* HEADER SECTION */}
//       <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
//         <div>
//           <h1 className='text-3xl font-black text-slate-900 tracking-tighter uppercase'>
//             Resource Vault
//           </h1>
//           <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1'>
//             Centralized Academic Asset Management
//           </p>
//         </div>
//         <div className='flex gap-3'>
//           <Button
//             variant='outline'
//             className='rounded-2xl border-slate-200 text-[10px] font-black uppercase tracking-widest h-12 px-6'
//           >
//             <Download size={14} className='mr-2' /> Export Audit
//           </Button>
//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             className='h-12 px-6 bg-[#002EFF] hover:bg-blue-700 text-white rounded-2xl flex items-center gap-3 shadow-lg shadow-blue-100 border-none transition-all active:scale-95'
//           >
//             <Plus size={18} strokeWidth={3} />
//             <span className='text-[10px] font-black uppercase tracking-widest'>
//               Upload Assets
//             </span>
//           </Button>
//         </div>
//       </div>

//       {/* 1. ANALYTICS STRIP */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
//         <StatCard
//           label='Vault Assets'
//           value={stats.count}
//           icon={ShieldCheck}
//           color='text-blue-600'
//           bg='bg-blue-50'
//         />
//         <StatCard
//           label='Total Size'
//           value={stats.size}
//           icon={HardDrive}
//           color='text-indigo-600'
//           bg='bg-indigo-50'
//         />
//         <StatCard
//           label='Batch Ready'
//           value={stagedFiles.length}
//           icon={CloudUpload}
//           color='text-amber-600'
//           bg='bg-amber-50'
//         />
//         <StatCard
//           label='Selection'
//           value={stats.selected}
//           icon={CheckSquare}
//           color='text-emerald-600'
//           bg='bg-emerald-50'
//         />
//       </div>

//       {/* 2. PERSISTENT BULK ACTIONS BAR */}
//       <AnimatePresence>
//         {selectedIds.length > 0 && (
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-xl px-6 py-4 rounded-[2.5rem] flex items-center gap-8 shadow-2xl border border-white/10 min-w-[500px]'
//           >
//             <div className='flex items-center gap-3 border-r border-slate-700 pr-8'>
//               <div className='bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/20'>
//                 <Layers className='text-white' size={16} />
//               </div>
//               <p className='text-[10px] font-black text-white uppercase tracking-widest'>
//                 {selectedIds.length} Selected
//               </p>
//             </div>
//             <div className='flex gap-3'>
//               <button
//                 onClick={() => console.log('Batch Download')}
//                 className='text-[9px] font-black text-white uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center gap-2'
//               >
//                 <Download size={14} /> ZIP Archive
//               </button>
//               <button
//                 onClick={() =>
//                   setMaterials((m) =>
//                     m.filter((x) => !selectedIds.includes(x.id)),
//                   )
//                 }
//                 className='text-[9px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-300 transition-colors flex items-center gap-2'
//               >
//                 <Trash2 size={14} /> Delete Batch
//               </button>
//               <button
//                 onClick={() => setSelectedIds([])}
//                 className='ml-4 text-slate-500 hover:text-white transition-colors'
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className='flex flex-col xl:flex-row gap-8'>
//         <div className='flex-1 space-y-6'>
//           {/* 3. SEARCH & GLOBAL SELECT */}
//           <div className='flex flex-col sm:flex-row gap-4'>
//             <div className='relative flex-1'>
//               <Search
//                 className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400'
//                 size={18}
//               />
//               <Input
//                 placeholder='Query storage by filename or ID...'
//                 className='pl-14 bg-white border-slate-200 shadow-sm rounded-2xl h-14 text-[11px] font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-blue-100'
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Button
//               onClick={selectAll}
//               variant='outline'
//               className='h-14 px-8 rounded-2xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 border-slate-200 transition-all'
//             >
//               {selectedIds.length === filteredMaterials.length
//                 ? 'Deselect All'
//                 : 'Select Page'}
//             </Button>
//           </div>

//           {/* 4. DATA LIST */}
//           <div className='grid grid-cols-1 gap-2'>
//             <AnimatePresence mode='popLayout'>
//               {filteredMaterials.map((file) => (
//                 <MaterialRow
//                   key={file.id}
//                   file={file}
//                   isSelected={selectedIds.includes(file.id)}
//                   onSelect={() => toggleSelect(file.id)}
//                   onDelete={() =>
//                     setMaterials((m) => m.filter((x) => x.id !== file.id))
//                   }
//                 />
//               ))}
//             </AnimatePresence>
//             {filteredMaterials.length === 0 && (
//               <div className='py-24 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200'>
//                 <Archive
//                   size={48}
//                   strokeWidth={1.5}
//                   className='mx-auto text-slate-300 mb-4'
//                 />
//                 <h3 className='text-sm font-black text-slate-900 uppercase tracking-tight'>
//                   No matching records
//                 </h3>
//                 <p className='text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest'>
//                   Try adjusting your search filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 5. SIDEBAR NAVIGATION */}
//         <div className='xl:w-80'>
//           <div className='bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 sticky top-6'>
//             <div className='flex items-center justify-between mb-8 px-2'>
//               <h3 className='text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]'>
//                 Directories
//               </h3>
//               <FolderOpen size={16} className='text-slate-300' />
//             </div>
//             <div className='space-y-1.5'>
//               {['All', ...CATEGORIES].map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all w-full group ${
//                     selectedCategory === cat
//                       ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
//                       : 'text-slate-500 hover:bg-slate-50'
//                   }`}
//                 >
//                   <span className='flex items-center gap-3'>{cat}</span>
//                   <Badge
//                     className={`rounded-lg px-2 py-0.5 text-[9px] ${selectedCategory === cat ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'}`}
//                   >
//                     {cat === 'All'
//                       ? materials.length
//                       : materials.filter((m) => m.category === cat).length}
//                   </Badge>
//                 </button>
//               ))}
//             </div>

//             <div className='mt-12 p-6 bg-blue-50/50 rounded-3xl border border-blue-100'>
//               <p className='text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2'>
//                 Storage Status
//               </p>
//               <div className='w-full bg-blue-100 h-1.5 rounded-full overflow-hidden mb-3'>
//                 <div className='bg-blue-600 h-full w-[45%] rounded-full' />
//               </div>
//               <p className='text-[9px] font-bold text-slate-400 uppercase tracking-tighter'>
//                 4.2GB of 10GB Used
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <input
//         type='file'
//         ref={fileInputRef}
//         multiple
//         onChange={handleFileSelection}
//         className='hidden'
//         accept='.pdf'
//       />

//       {/* 6. BATCH UPLOAD MODAL */}
//       <AnimatePresence>
//         {isUploadModalOpen && (
//           <div className='fixed inset-0 z-[100] flex items-center justify-center p-6'>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
//               onClick={() => setIsUploadModalOpen(false)}
//             />
//             <motion.div
//               initial={{ scale: 0.95, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 20 }}
//               className='relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl p-12 overflow-hidden border border-slate-100'
//             >
//               {uploadStatus === 'idle' && (
//                 <div className='space-y-10'>
//                   <div className='flex justify-between items-start'>
//                     <div>
//                       <h2 className='text-2xl font-black text-slate-900 uppercase tracking-tighter'>
//                         Batch Ingestion
//                       </h2>
//                       <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1'>
//                         {stagedFiles.length} items ready for sync
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => setIsUploadModalOpen(false)}
//                       className='p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors'
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>

//                   <div className='max-h-56 overflow-y-auto space-y-2 pr-2 custom-scrollbar border-y border-slate-50 py-4'>
//                     {stagedFiles.map((f, i) => (
//                       <div
//                         key={i}
//                         className='p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100'
//                       >
//                         <div className='flex items-center gap-4 min-w-0'>
//                           <FileText
//                             size={18}
//                             className='text-blue-600 shrink-0'
//                           />
//                           <span className='text-[10px] font-black text-slate-700 truncate uppercase tracking-tight'>
//                             {f.name}
//                           </span>
//                         </div>
//                         <span className='text-[9px] font-bold text-slate-400 shrink-0 uppercase'>
//                           {(f.size / 1024 / 1024).toFixed(1)}MB
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className='space-y-4'>
//                     <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1'>
//                       Target Directory
//                     </label>
//                     <div className='grid grid-cols-3 gap-2'>
//                       {CATEGORIES.map((cat) => (
//                         <button
//                           key={cat}
//                           onClick={() => setStagedCategory(cat)}
//                           className={`px-3 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border ${
//                             stagedCategory === cat
//                               ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100'
//                               : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
//                           }`}
//                         >
//                           {cat}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <Button
//                     onClick={startBatchUpload}
//                     className='w-full bg-slate-900 hover:bg-[#002EFF] text-white h-16 rounded-3xl font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl shadow-slate-200'
//                   >
//                     Commit to Vault
//                   </Button>
//                 </div>
//               )}

//               {uploadStatus === 'uploading' && (
//                 <div className='py-20 flex flex-col items-center text-center'>
//                   <div className='w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-10'>
//                     <CloudUpload
//                       size={32}
//                       className='text-blue-600 animate-pulse'
//                     />
//                   </div>
//                   <div className='w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4'>
//                     <motion.div
//                       className='bg-blue-600 h-full'
//                       initial={{ width: 0 }}
//                       animate={{ width: `${uploadProgress}%` }}
//                     />
//                   </div>
//                   <h2 className='text-xl font-black text-slate-900 uppercase tracking-tighter'>
//                     Indexing Data
//                   </h2>
//                   <p className='text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-[0.2em]'>
//                     {Math.round(uploadProgress)}% Processed
//                   </p>
//                 </div>
//               )}

//               {uploadStatus === 'success' && (
//                 <motion.div
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: 1 }}
//                   className='py-20 flex flex-col items-center text-center'
//                 >
//                   <div className='bg-emerald-50 p-8 rounded-[3rem] mb-8'>
//                     <CheckCircle2 size={56} className='text-emerald-500' />
//                   </div>
//                   <h2 className='text-xl font-black text-slate-900 uppercase tracking-tighter'>
//                     Synchronization Complete
//                   </h2>
//                   <p className='text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-[0.2em]'>
//                     All assets are now live in the repository
//                   </p>
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// function StatCard({ label, value, icon: Icon, color, bg }: any) {
//   return (
//     <div className='bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02] cursor-default'>
//       <div className={`p-4 rounded-2xl ${bg} ${color}`}>
//         <Icon size={22} strokeWidth={2.5} />
//       </div>
//       <div>
//         <p className='text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1'>
//           {label}
//         </p>
//         <p className='text-2xl font-black text-slate-900 tracking-tight'>
//           {value}
//         </p>
//       </div>
//     </div>
//   )
// }

// function MaterialRow({ file, isSelected, onSelect, onDelete }: any) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       className={`group bg-white p-3 pr-8 rounded-[2rem] border transition-all flex items-center gap-6 ${
//         isSelected
//           ? 'border-blue-600 bg-blue-50/20'
//           : 'border-slate-100 hover:border-slate-300'
//       }`}
//     >
//       <button
//         onClick={onSelect}
//         className={`transition-all shrink-0 ml-4 ${isSelected ? 'text-blue-600 scale-110' : 'text-slate-200 hover:text-slate-400'}`}
//       >
//         {isSelected ? (
//           <CheckSquare size={24} fill='currentColor' />
//         ) : (
//           <Square size={24} />
//         )}
//       </button>

//       <div className='p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0'>
//         <FileText size={22} />
//       </div>

//       <div className='flex flex-1 items-center justify-between min-w-0'>
//         <div className='min-w-0 flex-1'>
//           <h4 className='font-black text-slate-800 text-xs uppercase tracking-tight truncate mb-0.5 group-hover:text-blue-600 transition-colors'>
//             {file.title}
//           </h4>
//           <p className='text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2'>
//             ID: {file.id} <span className='opacity-30'>•</span>{' '}
//             {file.uploadDate}
//           </p>
//         </div>

//         <div className='hidden lg:flex items-center gap-8 mr-8 shrink-0'>
//           <Badge className='bg-slate-50 text-slate-500 border-slate-100 text-[8px] font-black px-4 py-1.5 uppercase tracking-widest rounded-lg'>
//             {file.category}
//           </Badge>
//           <span className='text-[10px] font-black text-slate-400 uppercase tracking-tighter w-16 text-right'>
//             {file.size}
//           </span>
//         </div>
//       </div>

//       <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 shrink-0'>
//         <Button
//           variant='ghost'
//           size='icon'
//           className='h-11 w-11 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50'
//         >
//           <Download size={18} />
//         </Button>
//         <Button
//           onClick={onDelete}
//           variant='ghost'
//           size='icon'
//           className='h-11 w-11 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50'
//         >
//           <Trash2 size={18} />
//         </Button>
//         <Button
//           variant='ghost'
//           size='icon'
//           className='h-11 w-11 rounded-xl text-slate-300'
//         >
//           <MoreVertical size={18} />
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

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
  CloudUpload,
  Filter,
  MoreHorizontal,
  ChevronRight,
  Activity,
  UploadCloud,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

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
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [ingestCategory, setIngestCategory] = useState(CATEGORIES[0])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 'MAT-2026-001',
      title: 'Calculus: Multi-Variable Analysis',
      category: 'Textbook',
      size: '12.4 MB',
      uploadDate: '2026-02-15',
      type: 'PDF',
    },
    {
      id: 'PHY-2026-042',
      title: 'Thermodynamics Lab Protocols',
      category: 'Handout',
      size: '2.1 MB',
      uploadDate: '2026-01-20',
      type: 'PDF',
    },
    {
      id: 'LIT-2026-009',
      title: 'Modern Prose Syllabus v2',
      category: 'Syllabus',
      size: '0.8 MB',
      uploadDate: '2026-02-28',
      type: 'PDF',
    },
    {
      id: 'ENG-2026-112',
      title: 'Structural Mechanics Ref',
      category: 'Reference',
      size: '45.2 MB',
      uploadDate: '2026-02-10',
      type: 'PDF',
    },
  ])

  // Logic to handle the file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPendingFile(e.target.files[0])
      setIsUploading(true)
    }
  }

  // Logic to finalize ingestion
  const finalizeIngest = () => {
    if (!pendingFile) return

    const newEntry: Material = {
      id: `SYS-${Math.floor(Math.random() * 9000) + 1000}`,
      title: pendingFile.name.replace(/\.[^/.]+$/, ''),
      category: ingestCategory,
      size: `${(pendingFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      type: 'PDF',
    }

    setMaterials([newEntry, ...materials])
    setIsUploading(false)
    setPendingFile(null)
  }

  const stats = useMemo(() => {
    const totalMB = materials.reduce(
      (acc, curr) => acc + parseFloat(curr.size),
      0,
    )
    const limitGB = 2 // System Limit
    const currentGB = totalMB / 1024
    return {
      size:
        totalMB >= 1000
          ? `${currentGB.toFixed(2)} GB`
          : `${totalMB.toFixed(2)} MB`,
      count: materials.length,
      percent: Math.min((currentGB / limitGB) * 100, 100).toFixed(1),
    }
  }, [materials])

  const filteredMaterials = useMemo(() => {
    return materials.filter((file) => {
      const matchesSearch =
        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || file.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, materials])

  return (
    <div className='flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-sans text-slate-900 antialiased selection:bg-[#FCB900]/30'>
      {/* SIDEBAR */}
      <aside className='w-[230px] bg-white border-r border-slate-200 flex flex-col shrink-0'>
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='w-5 h-5 bg-[#002EFF] rounded flex items-center justify-center text-white font-bold text-[10px] shadow-sm'>
              L
            </div>
            <h1 className='text-sm font-black tracking-tight uppercase'>
              Library<span className='text-[#002EFF]'>Pro</span>
            </h1>
          </div>

          {/* STORAGE MOVED UP */}
          <div className='bg-slate-950 rounded-xl p-3 text-white relative overflow-hidden border border-white/5 shadow-xl mb-6'>
            <div className='relative z-10'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-1.5'>
                  <HardDrive size={10} className='text-[#FCB900]' />
                  <span className='text-[7px] font-black uppercase tracking-[0.1em] text-slate-400'>
                    Vault Capacity
                  </span>
                </div>
                <div className='w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]' />
              </div>

              <div className='flex justify-between items-baseline mb-1'>
                <span className='text-[11px] font-black tracking-tighter italic'>
                  {stats.size}
                </span>
                <span className='text-[8px] text-[#FCB900] font-black'>
                  {stats.percent}%
                </span>
              </div>

              <div className='h-1 w-full bg-white/10 rounded-full overflow-hidden'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.percent}%` }}
                  className='h-full bg-gradient-to-r from-[#002EFF] to-[#FCB900]'
                />
              </div>
            </div>
          </div>

          <nav className='space-y-0.5'>
            <p className='px-2 py-2 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]'>
              Data Segments
            </p>
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all group ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <FolderOpen
                    size={12}
                    className={
                      selectedCategory === cat
                        ? 'text-[#FCB900]'
                        : 'text-slate-300 group-hover:text-slate-500'
                    }
                  />
                  {cat}
                </div>
                {selectedCategory === cat && (
                  <ChevronRight size={10} className='text-[#FCB900]' />
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className='flex-1 flex flex-col min-w-0'>
        <header className='h-12 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0'>
          <div className='relative w-full max-w-xs'>
            <Search
              className='absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300'
              size={12}
            />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Filter master manifest...'
              className='pl-8 bg-slate-50 border-none rounded-md h-7 text-[10px] focus-visible:ring-1 focus-visible:ring-[#002EFF]/20'
            />
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              className='h-7 rounded-md text-slate-400 text-[9px] font-black px-2 hover:bg-slate-100 uppercase'
            >
              <Download size={12} className='mr-1.5' /> Export
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className='h-7 rounded-md bg-[#002EFF] hover:bg-blue-700 text-white text-[9px] font-black px-3 shadow-md uppercase tracking-wider'
            >
              <Plus size={12} className='mr-1' /> Ingest PDF
            </Button>
          </div>
        </header>

        <div className='flex-1 overflow-y-auto p-6 bg-[#F8FAFC]'>
          <div className='max-w-4xl mx-auto space-y-4'>
            <div className='grid grid-cols-3 gap-3'>
              <CompactStat
                label='Index Count'
                value={stats.count}
                icon={ShieldCheck}
              />
              <CompactStat label='Latency' value='2ms' icon={Activity} />
              <CompactStat
                label='Integrity'
                value='Verified'
                icon={CheckCircle2}
                color='text-emerald-600'
              />
            </div>

            <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
              <div className='px-4 py-2 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between'>
                <span className='text-[8px] font-black text-slate-400 uppercase tracking-widest'>
                  Master Manifest
                </span>
                <Badge className='bg-[#FCB900] text-black text-[8px] hover:bg-[#FCB900] border-none font-black'>
                  {filteredMaterials.length} NODES
                </Badge>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='bg-white border-b border-slate-50'>
                      <th className='p-3 w-10'>
                        <button className='flex justify-center w-full'>
                          <Square size={13} className='text-slate-200' />
                        </button>
                      </th>
                      <th className='text-[8px] font-black text-slate-400 uppercase tracking-widest p-3'>
                        Resource Asset
                      </th>
                      <th className='text-[8px] font-black text-slate-400 uppercase tracking-widest p-3'>
                        Classification
                      </th>
                      <th className='text-[8px] font-black text-slate-400 uppercase tracking-widest p-3'>
                        Size
                      </th>
                      <th className='text-[8px] font-black text-slate-400 uppercase tracking-widest p-3 text-right pr-6'>
                        Ops
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-50'>
                    <AnimatePresence initial={false}>
                      {filteredMaterials.map((file) => (
                        <motion.tr
                          key={file.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className='group hover:bg-slate-50/50 transition-colors'
                        >
                          <td className='p-3 text-center'>
                            <Square
                              size={13}
                              className='text-slate-100 group-hover:text-slate-200 mx-auto'
                            />
                          </td>
                          <td className='p-3'>
                            <div className='flex items-center gap-2.5'>
                              <div className='w-6 h-6 bg-slate-50 rounded flex items-center justify-center text-slate-400 group-hover:text-[#002EFF] border border-slate-100'>
                                <FileText size={11} />
                              </div>
                              <div>
                                <p className='text-[10px] font-bold text-slate-800 leading-tight'>
                                  {file.title}
                                </p>
                                <p className='text-[7px] font-black text-slate-300 uppercase'>
                                  UID: {file.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='p-3'>
                            <span className='text-[8px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm uppercase'>
                              {file.category}
                            </span>
                          </td>
                          <td className='p-3 font-mono text-[9px] font-bold text-slate-400'>
                            {file.size}
                          </td>
                          <td className='p-3 text-right pr-6'>
                            <div className='flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-6 w-6 text-slate-300 hover:text-blue-600'
                              >
                                <Download size={11} />
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-6 w-6 text-slate-300 hover:text-rose-500'
                              >
                                <Trash2 size={11} />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* INGESTION MODAL */}
      <AnimatePresence>
        {isUploading && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className='bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200'
            >
              <div className='p-1 bg-[#FCB900]' />
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#002EFF]'>
                    <UploadCloud size={20} />
                  </div>
                  <div>
                    <h3 className='text-sm font-black uppercase tracking-tight'>
                      Classify Resource
                    </h3>
                    <p className='text-[10px] text-slate-400 font-bold'>
                      {pendingFile?.name}
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-1.5'>
                    <label className='text-[8px] font-black text-slate-400 uppercase tracking-widest'>
                      Select Category
                    </label>
                    <div className='grid grid-cols-2 gap-2'>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setIngestCategory(cat)}
                          className={`px-3 py-2 rounded-lg text-[9px] font-black text-left transition-all border ${
                            ingestCategory === cat
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                              : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='flex gap-2 pt-2'>
                    <Button
                      variant='ghost'
                      onClick={() => setIsUploading(false)}
                      className='flex-1 h-9 text-[10px] font-black uppercase tracking-widest'
                    >
                      Abort
                    </Button>
                    <Button
                      onClick={finalizeIngest}
                      className='flex-1 h-9 bg-[#002EFF] hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100'
                    >
                      Confirm Ingest
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='.pdf'
        className='hidden'
      />
    </div>
  )
}

function CompactStat({
  label,
  value,
  icon: Icon,
  color = 'text-slate-900',
}: any) {
  return (
    <div className='bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm'>
      <div className='w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-[#002EFF]'>
        <Icon size={14} />
      </div>
      <div>
        <p className='text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5'>
          {label}
        </p>
        <p
          className={`text-xs font-black ${color} tracking-tight leading-none`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}