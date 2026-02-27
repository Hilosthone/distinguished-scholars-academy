// 'use client'

// import React, { useState, useEffect } from 'react'
// import {
//   Zap,
//   LayoutGrid,
//   CheckCircle2,
//   Share2,
//   BarChart3,
//   Edit3,
//   ChevronLeft,
//   User,
//   Trash2,
//   Search,
//   Plus,
//   Clock,
//   FileQuestion,
//   Trophy,
//   AlertCircle,
//   Eye,
//   EyeOff,
//   Check,
//   ImageIcon,
//   Save,
// } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// // --- TYPES ---
// interface Question {
//   Question: string
//   A: string
//   B: string
//   C: string
//   D: string
//   E?: string
//   Answer: string
//   Explanation?: string
//   image?: string | null
// }

// interface Attempt {
//   studentName: string
//   score: number
//   date: string
//   status: 'Passed' | 'Failed'
// }

// interface Quiz {
//   id: string
//   title: string
//   description: string
//   totalQuestions: number
//   timeLimit: number
//   questions: Question[]
//   url: string
//   createdAt: string
//   attempts: Attempt[]
// }

// export default function MyQuizzes() {
//   const [view, setView] = useState<'builder' | 'list' | 'results'>('list')
//   const [quizzes, setQuizzes] = useState<Quiz[]>([])
//   const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [pendingQuestions, setPendingQuestions] = useState<Question[]>([])
//   const [editingId, setEditingId] = useState<string | null>(null)
//   const [showPreview, setShowPreview] = useState(false)
//   const [copiedId, setCopiedId] = useState<string | null>(null)

//   const [builderForm, setBuilderForm] = useState({
//     title: '',
//     description: '',
//     timeLimit: 30,
//   })
//   const [isDeploying, setIsDeploying] = useState(false)

//   // --- SYNC & LOAD ---
//   useEffect(() => {
//     const savedQuizzes = localStorage.getItem('my_quizzes')
//     if (savedQuizzes) setQuizzes(JSON.parse(savedQuizzes))

//     const checkPending = () => {
//       const pending = localStorage.getItem('pending_exam_questions')
//       if (pending) {
//         const parsed = JSON.parse(pending)
//         // Only update if questions actually changed to prevent state loops
//         if (JSON.stringify(parsed) !== JSON.stringify(pendingQuestions)) {
//           setPendingQuestions(parsed)
//           // If we aren't editing something specific, go to builder to show new import
//           if (!editingId && parsed.length > 0) setView('builder')
//         }
//       }
//     }

//     window.addEventListener('storage', checkPending)
//     window.addEventListener('storage-update', checkPending)
//     const interval = setInterval(checkPending, 1500)

//     return () => {
//       window.removeEventListener('storage', checkPending)
//       window.removeEventListener('storage-update', checkPending)
//       clearInterval(interval)
//     }
//   }, [editingId, pendingQuestions])

//   // --- DEPLOY & SAVE HANDLER ---
//   const handleDeploy = () => {
//     if (!builderForm.title) return alert('Please enter a quiz title')
//     if (pendingQuestions.length === 0)
//       return alert('No questions found to deploy.')

//     setIsDeploying(true)

//     // Simulation for UX feel
//     setTimeout(() => {
//       try {
//         const examId =
//           editingId ||
//           `QZ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

//         const newQuiz: Quiz = {
//           id: examId,
//           title: builderForm.title,
//           description: builderForm.description || 'No description provided.',
//           totalQuestions: pendingQuestions.length,
//           timeLimit: Number(builderForm.timeLimit),
//           questions: pendingQuestions,
//           url: `/take-exam/${examId}`,
//           createdAt: editingId
//             ? quizzes.find((q) => q.id === editingId)?.createdAt ||
//               new Date().toLocaleDateString()
//             : new Date().toLocaleDateString(),
//           attempts: editingId
//             ? quizzes.find((q) => q.id === editingId)?.attempts || []
//             : [],
//         }

//         let updatedQuizzes: Quiz[]
//         if (editingId) {
//           // Replace existing
//           updatedQuizzes = quizzes.map((q) =>
//             q.id === editingId ? newQuiz : q,
//           )
//         } else {
//           // Add new to start
//           updatedQuizzes = [newQuiz, ...quizzes]
//         }

//         localStorage.setItem('my_quizzes', JSON.stringify(updatedQuizzes))
//         setQuizzes(updatedQuizzes)

//         // Cleanup storage to prevent double-loading
//         localStorage.removeItem('pending_exam_questions')
//         localStorage.removeItem('draft_exam_builder')

//         setIsDeploying(false)
//         setEditingId(null)
//         setPendingQuestions([])
//         setBuilderForm({ title: '', description: '', timeLimit: 30 })
//         setView('list')

//         alert(
//           editingId ? '✅ Quiz Updated!' : '🚀 Exam Published Successfully!',
//         )
//       } catch (error) {
//         console.error('Deployment failed:', error)
//         alert(
//           'Storage Error: The file might be too large (images). Try smaller images.',
//         )
//         setIsDeploying(false)
//       }
//     }, 600)
//   }

//   const handleEdit = (quiz: Quiz) => {
//     setEditingId(quiz.id)
//     setBuilderForm({
//       title: quiz.title,
//       description: quiz.description,
//       timeLimit: quiz.timeLimit,
//     })
//     setPendingQuestions(quiz.questions)
//     // Synchronize the "pending" storage so the builder tab sees this data too
//     localStorage.setItem(
//       'pending_exam_questions',
//       JSON.stringify(quiz.questions),
//     )
//     setView('builder')
//   }

//   const handleDelete = (id: string) => {
//     if (confirm('Permanently delete this quiz and all student results?')) {
//       const updated = quizzes.filter((q) => q.id !== id)
//       setQuizzes(updated)
//       localStorage.setItem('my_quizzes', JSON.stringify(updated))
//     }
//   }

//   const handleShare = (relativeUrl: string, id: string) => {
//     const fullUrl = window.location.origin + relativeUrl
//     navigator.clipboard.writeText(fullUrl)
//     setCopiedId(id)
//     setTimeout(() => setCopiedId(null), 2000)
//   }

//   const filteredQuizzes = quizzes.filter(
//     (q) =>
//       q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       q.id.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   return (
//     <div className='max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900 bg-[#F8FAFC] min-h-screen'>
//       <header className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
//         <div>
//           <h1 className='text-2xl md:text-3xl font-black tracking-tight text-slate-900'>
//             Quiz<span className='text-[#002EFF]'>Manager</span>
//           </h1>
//           <p className='text-slate-500 text-xs font-bold uppercase tracking-widest mt-1'>
//             Control Center
//           </p>
//         </div>

//         <div className='flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm'>
//           <button
//             onClick={() => {
//               setView('list')
//               setEditingId(null)
//             }}
//             className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${view !== 'builder' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
//           >
//             My Quizzes
//           </button>
//           <button
//             onClick={() => {
//               setView('builder')
//               if (!editingId) {
//                 setBuilderForm({ title: '', description: '', timeLimit: 30 })
//                 setPendingQuestions([])
//               }
//             }}
//             className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${view === 'builder' ? 'bg-[#002EFF] text-white' : 'text-slate-400 hover:text-[#002EFF]'}`}
//           >
//             {editingId ? 'Editing Quiz' : '+ Create New'}
//           </button>
//         </div>
//       </header>

//       {/* --- BUILDER VIEW --- */}
//       {view === 'builder' && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className='bg-white rounded-3xl p-8 border border-slate-200 shadow-xl max-w-2xl mx-auto'>
//             <div className='flex justify-between items-center mb-6'>
//               <h2 className='text-xl font-black flex items-center gap-2'>
//                 <Zap className='text-[#002EFF]' fill='#002EFF' size={20} />
//                 {editingId ? 'Modify Settings' : 'Deployment Setup'}
//               </h2>
//               {editingId && (
//                 <span className='text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded'>
//                   EDIT MODE
//                 </span>
//               )}
//             </div>

//             {pendingQuestions.length > 0 ? (
//               <div className='mb-6 space-y-2'>
//                 <div className='p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between shadow-sm'>
//                   <div className='flex items-center gap-3'>
//                     <CheckCircle2 className='text-emerald-500' size={20} />
//                     <p className='text-sm font-bold text-emerald-900'>
//                       {pendingQuestions.length} Questions Loaded
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setShowPreview(!showPreview)}
//                     className='text-xs font-black uppercase text-emerald-600 hover:text-emerald-700 flex items-center gap-1'
//                   >
//                     {showPreview ? (
//                       <>
//                         <EyeOff size={14} /> Hide
//                       </>
//                     ) : (
//                       <>
//                         <Eye size={14} /> Preview
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 <AnimatePresence>
//                   {showPreview && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className='overflow-hidden border border-slate-100 rounded-xl bg-slate-50 p-2 max-h-64 overflow-y-auto'
//                     >
//                       {pendingQuestions.map((q, i) => (
//                         <div
//                           key={i}
//                           className='text-[11px] p-3 border-b border-slate-200 last:border-0 text-slate-600'
//                         >
//                           <div className='flex justify-between'>
//                             <span className='font-bold text-slate-700'>
//                               {i + 1}. {q.Question}
//                             </span>
//                             {q.image && (
//                               <ImageIcon size={12} className='text-blue-500' />
//                             )}
//                           </div>
//                           <div className='mt-2 flex flex-wrap gap-2 text-[10px]'>
//                             {['A', 'B', 'C', 'D', 'E'].map(
//                               (opt) =>
//                                 q[opt as keyof Question] && (
//                                   <span
//                                     key={opt}
//                                     className={`px-1.5 py-0.5 rounded ${q.Answer === opt ? 'bg-emerald-100 text-emerald-700 font-bold' : 'bg-white border text-slate-400'}`}
//                                   >
//                                     {opt}:{' '}
//                                     {String(q[opt as keyof Question]).substring(
//                                       0,
//                                       15,
//                                     )}
//                                     ...
//                                   </span>
//                                 ),
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className='mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3'>
//                 <AlertCircle className='text-amber-500' size={20} />
//                 <p className='text-sm font-bold text-amber-900'>
//                   Add questions in the <b>Exam Builder</b> to see them here.
//                 </p>
//               </div>
//             )}

//             <div className='space-y-5'>
//               <div>
//                 <label className='block text-xs font-bold uppercase text-slate-500 mb-1 ml-1'>
//                   Quiz Title
//                 </label>
//                 <input
//                   value={builderForm.title}
//                   onChange={(e) =>
//                     setBuilderForm({ ...builderForm, title: e.target.value })
//                   }
//                   className='w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-[#002EFF] focus:bg-white transition-all'
//                   placeholder='Enter quiz title...'
//                 />
//               </div>
//               <div className='grid grid-cols-2 gap-4'>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-slate-500 mb-1 ml-1'>
//                     Time Limit (Minutes)
//                   </label>
//                   <div className='relative'>
//                     <Clock
//                       className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
//                       size={18}
//                     />
//                     <input
//                       type='number'
//                       value={builderForm.timeLimit}
//                       onChange={(e) =>
//                         setBuilderForm({
//                           ...builderForm,
//                           timeLimit: Number(e.target.value),
//                         })
//                       }
//                       className='w-full pl-12 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-[#002EFF]'
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className='block text-xs font-bold uppercase text-slate-500 mb-1 ml-1'>
//                     Questions
//                   </label>
//                   <div className='w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl font-black text-slate-500 flex items-center justify-center gap-2'>
//                     <FileQuestion size={18} /> {pendingQuestions.length}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleDeploy}
//                 disabled={isDeploying || pendingQuestions.length === 0}
//                 className={`w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
//                   pendingQuestions.length > 0
//                     ? 'bg-[#002EFF] hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]'
//                     : 'bg-slate-300 cursor-not-allowed'
//                 }`}
//               >
//                 {isDeploying ? (
//                   'Processing...'
//                 ) : (
//                   <>
//                     {editingId ? (
//                       <Save size={20} />
//                     ) : (
//                       <Zap size={20} fill='white' />
//                     )}
//                     {editingId ? 'Update and Save' : 'Generate Student Link'}
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* --- LIST VIEW --- */}
//       {view === 'list' && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <div className='mb-8 relative max-w-md'>
//             <Search
//               className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
//               size={18}
//             />
//             <input
//               type='text'
//               placeholder='Search by title or ID...'
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:shadow-md outline-none transition-all'
//             />
//           </div>

//           {filteredQuizzes.length === 0 ? (
//             <div className='text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-200'>
//               <LayoutGrid className='text-slate-200 mx-auto mb-4' size={48} />
//               <h3 className='text-slate-900 font-black text-xl'>
//                 No exams found
//               </h3>
//               <button
//                 onClick={() => setView('builder')}
//                 className='mt-6 bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase hover:bg-[#002EFF] transition-all'
//               >
//                 + Create First Quiz
//               </button>
//             </div>
//           ) : (
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//               {filteredQuizzes.map((quiz) => (
//                 <motion.div
//                   layoutId={quiz.id}
//                   key={quiz.id}
//                   className='bg-white p-6 rounded-4xl border border-slate-100 hover:border-blue-100 hover:shadow-2xl transition-all group relative'
//                 >
//                   <div className='flex justify-between items-start mb-6'>
//                     <span className='bg-blue-50 text-[#002EFF] px-3 py-1 rounded-full text-[10px] font-black uppercase'>
//                       {quiz.id}
//                     </span>
//                     <div className='flex items-center gap-1.5 text-slate-400 text-xs font-bold'>
//                       <Clock size={14} /> {quiz.timeLimit}m
//                     </div>
//                   </div>
//                   <h3 className='text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-[#002EFF] transition-colors'>
//                     {quiz.title}
//                   </h3>
//                   <div className='flex gap-4 mb-8'>
//                     <div className='flex items-center gap-1.5'>
//                       <FileQuestion size={14} className='text-slate-400' />
//                       <span className='text-xs font-bold text-slate-600'>
//                         {quiz.totalQuestions} Qs
//                       </span>
//                     </div>
//                     <div className='flex items-center gap-1.5'>
//                       <User size={14} className='text-slate-400' />
//                       <span className='text-xs font-bold text-slate-600'>
//                         {quiz.attempts.length} Attempts
//                       </span>
//                     </div>
//                   </div>
//                   <div className='grid grid-cols-3 gap-3 mb-4'>
//                     <button
//                       onClick={() => {
//                         setSelectedQuiz(quiz)
//                         setView('results')
//                       }}
//                       className='flex flex-col items-center p-3 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all'
//                     >
//                       <BarChart3 size={18} />
//                       <span className='text-[9px] font-black uppercase mt-1.5'>
//                         Stats
//                       </span>
//                     </button>
//                     <button
//                       onClick={() => handleEdit(quiz)}
//                       className='flex flex-col items-center p-3 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all'
//                     >
//                       <Edit3 size={18} />
//                       <span className='text-[9px] font-black uppercase mt-1.5'>
//                         Edit
//                       </span>
//                     </button>
//                     <button
//                       onClick={() => handleShare(quiz.url, quiz.id)}
//                       className={`flex flex-col items-center p-3 rounded-2xl transition-all ${copiedId === quiz.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 hover:bg-emerald-500 hover:text-white'}`}
//                     >
//                       {copiedId === quiz.id ? (
//                         <Check size={18} />
//                       ) : (
//                         <Share2 size={18} />
//                       )}
//                       <span className='text-[9px] font-black uppercase mt-1.5'>
//                         {copiedId === quiz.id ? 'Copied' : 'Link'}
//                       </span>
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => handleDelete(quiz.id)}
//                     className='w-full py-2 text-[10px] text-slate-300 hover:text-rose-500 font-bold uppercase transition-colors flex items-center justify-center gap-1'
//                   >
//                     <Trash2 size={10} /> Delete Permanently
//                   </button>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* --- RESULTS VIEW --- */}
//       {view === 'results' && selectedQuiz && (
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <button
//             onClick={() => setView('list')}
//             className='mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-800 text-xs font-black uppercase'
//           >
//             <ChevronLeft size={16} /> Back to Dashboard
//           </button>
//           <div className='bg-slate-900 text-white rounded-[40px] p-10 mb-8 relative overflow-hidden'>
//             <h2 className='text-4xl font-black mb-3'>{selectedQuiz.title}</h2>
//             <p className='text-blue-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2'>
//               <Trophy size={16} className='text-yellow-400' /> Performance
//               Insights
//             </p>
//           </div>
//           <div className='bg-white rounded-4xl border border-slate-200 overflow-hidden shadow-sm'>
//             <table className='w-full text-left border-collapse'>
//               <thead className='bg-slate-50 text-[11px] font-black uppercase text-slate-400'>
//                 <tr>
//                   <th className='px-8 py-5'>Student Name</th>
//                   <th className='px-8 py-5'>Date Attempted</th>
//                   <th className='px-8 py-5 text-center'>Score</th>
//                   <th className='px-8 py-5'>Status</th>
//                 </tr>
//               </thead>
//               <tbody className='divide-y divide-slate-100'>
//                 {selectedQuiz.attempts.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className='px-8 py-20 text-center text-slate-400 font-bold'
//                     >
//                       No student data available yet. Share the link to start
//                       collecting results!
//                     </td>
//                   </tr>
//                 ) : (
//                   selectedQuiz.attempts.map((att, i) => (
//                     <tr
//                       key={i}
//                       className='hover:bg-slate-50/50 transition-colors'
//                     >
//                       <td className='px-8 py-5 font-bold text-slate-700'>
//                         {att.studentName}
//                       </td>
//                       <td className='px-8 py-5 text-slate-500'>{att.date}</td>
//                       <td className='px-8 py-5 font-black text-lg text-center text-slate-900'>
//                         {att.score}%
//                       </td>
//                       <td className='px-8 py-5'>
//                         <span
//                           className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${att.status === 'Passed' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
//                         >
//                           {att.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Zap,
  LayoutGrid,
  CheckCircle2,
  Share2,
  BarChart3,
  Edit3,
  ChevronLeft,
  User,
  Trash2,
  Search,
  Plus,
  Clock,
  FileQuestion,
  Trophy,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  ImageIcon,
  Save,
  ExternalLink,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- TYPES ---
interface Question {
  Question: string
  A: string
  B: string
  C: string
  D: string
  E?: string
  Answer: string
  Explanation?: string
  image?: string | null
  subject?: string
}

interface Attempt {
  studentName: string
  score: number
  date: string
  status: 'Passed' | 'Failed'
}

interface Quiz {
  id: string
  title: string
  description: string
  totalQuestions: number
  timeLimit: number
  questions: Question[]
  url: string
  createdAt: string
  attempts: Attempt[]
}

export default function MyQuizzes() {
  const router = useRouter()
  const [view, setView] = useState<'list' | 'results'>('list')
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // --- LOAD QUIZZES ---
  useEffect(() => {
    const savedQuizzes = localStorage.getItem('my_quizzes')
    if (savedQuizzes) setQuizzes(JSON.parse(savedQuizzes))
  }, [])

  // --- HANDLERS ---
  const handleCreateNew = () => {
    // Clear any old draft data before heading to builder
    localStorage.removeItem('pending_exam_questions')
    localStorage.removeItem('draft_exam_builder')
    router.push('/admin/components/exambuilder')
  }

  const handleEdit = (quiz: Quiz) => {
    // 1. Save the questions to the shared storage the builder uses
    localStorage.setItem(
      'pending_exam_questions',
      JSON.stringify(quiz.questions),
    )

    // 2. Save the metadata as a draft so the builder can pre-fill
    const draftData = {
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.timeLimit,
      editingId: quiz.id, // Crucial for updating instead of creating new
    }
    localStorage.setItem('draft_exam_builder', JSON.stringify(draftData))

    // 3. Navigate to the builder
    router.push('/admin/components/exambuilder')
  }

  const handleDelete = (id: string) => {
    if (
      window.confirm('Permanently delete this quiz and all student results?')
    ) {
      const updated = quizzes.filter((q) => q.id !== id)
      setQuizzes(updated)
      localStorage.setItem('my_quizzes', JSON.stringify(updated))
    }
  }

  const handleShare = (relativeUrl: string, id: string) => {
    const fullUrl = window.location.origin + relativeUrl
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredQuizzes = quizzes.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8 font-sans text-slate-900 bg-[#F8FAFC] min-h-screen'>
      <header className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4'>
        <div>
          <h1 className='text-2xl md:text-4xl font-black tracking-tight text-slate-900'>
            Exam<span className='text-[#002EFF]'>Hub</span>
          </h1>
          <p className='text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1'>
            Administrator Control Center
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className='flex items-center gap-2 bg-[#002EFF] hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all shadow-lg shadow-blue-100 active:scale-95'
        >
          <Plus size={18} /> Create New Quiz
        </button>
      </header>

      {/* --- LIST VIEW --- */}
      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='mb-8 relative max-w-md'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Search quizzes...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[20px] text-sm font-bold focus:shadow-xl focus:border-blue-200 outline-none transition-all'
            />
          </div>

          {filteredQuizzes.length === 0 ? (
            <div className='text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200'>
              <div className='bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <LayoutGrid className='text-slate-300' size={32} />
              </div>
              <h3 className='text-slate-900 font-black text-xl mb-2'>
                No active quizzes found
              </h3>
              <p className='text-slate-400 text-sm mb-8 font-medium'>
                Ready to launch your first assessment?
              </p>
              <button
                onClick={handleCreateNew}
                className='bg-slate-900 text-white px-10 py-4 rounded-full text-xs font-black uppercase hover:bg-[#002EFF] transition-all shadow-xl'
              >
                + Get Started Now
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  whileHover={{ y: -5 }}
                  className='bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group relative'
                >
                  <div className='flex justify-between items-start mb-6'>
                    <span className='bg-blue-50 text-[#002EFF] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider'>
                      {quiz.id}
                    </span>
                    <div className='flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-tighter'>
                      <Clock size={12} /> {quiz.timeLimit} Minutes
                    </div>
                  </div>

                  <h3 className='text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-[#002EFF] transition-colors'>
                    {quiz.title}
                  </h3>
                  <p className='text-slate-400 text-xs font-medium line-clamp-2 mb-6'>
                    {quiz.description}
                  </p>

                  <div className='flex gap-4 mb-8 bg-slate-50 p-3 rounded-2xl'>
                    <div className='flex-1 flex flex-col items-center border-r border-slate-200'>
                      <span className='text-[10px] font-black text-slate-400 uppercase'>
                        Questions
                      </span>
                      <span className='text-sm font-black text-slate-700'>
                        {quiz.totalQuestions}
                      </span>
                    </div>
                    <div className='flex-1 flex flex-col items-center'>
                      <span className='text-[10px] font-black text-slate-400 uppercase'>
                        Attempts
                      </span>
                      <span className='text-sm font-black text-slate-700'>
                        {quiz.attempts.length}
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-3 mb-6'>
                    <button
                      onClick={() => {
                        setSelectedQuiz(quiz)
                        setView('results')
                      }}
                      className='flex flex-col items-center p-3 bg-slate-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all'
                    >
                      <BarChart3 size={18} />
                      <span className='text-[9px] font-black uppercase mt-1.5'>
                        Stats
                      </span>
                    </button>
                    <button
                      onClick={() => handleEdit(quiz)}
                      className='flex flex-col items-center p-3 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all'
                    >
                      <Edit3 size={18} />
                      <span className='text-[9px] font-black uppercase mt-1.5'>
                        Update
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare(quiz.url, quiz.id)}
                      className={`flex flex-col items-center p-3 rounded-2xl transition-all ${copiedId === quiz.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 hover:bg-emerald-500 hover:text-white'}`}
                    >
                      {copiedId === quiz.id ? (
                        <Check size={18} />
                      ) : (
                        <Share2 size={18} />
                      )}
                      <span className='text-[9px] font-black uppercase mt-1.5'>
                        {copiedId === quiz.id ? 'Copied' : 'Link'}
                      </span>
                    </button>
                  </div>

                  <div className='flex items-center justify-between border-t border-slate-50 pt-4'>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className='text-[9px] text-slate-300 hover:text-rose-500 font-black uppercase transition-colors flex items-center gap-1'
                    >
                      <Trash2 size={12} /> Delete Quiz
                    </button>
                    <a
                      href={quiz.url}
                      target='_blank'
                      className='text-[9px] text-[#002EFF] font-black uppercase flex items-center gap-1 hover:underline'
                    >
                      Preview Live <ExternalLink size={10} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* --- RESULTS VIEW --- */}
      {view === 'results' && selectedQuiz && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => setView('list')}
            className='mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-800 text-xs font-black uppercase tracking-widest'
          >
            <ChevronLeft size={16} /> Back to My Quizzes
          </button>

          <div className='bg-slate-900 text-white rounded-[40px] p-10 mb-8 flex justify-between items-end'>
            <div>
              <p className='text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2'>
                Results Dashboard
              </p>
              <h2 className='text-4xl font-black'>{selectedQuiz.title}</h2>
            </div>
            <div className='text-right'>
              <p className='text-slate-400 text-[10px] font-black uppercase'>
                Average Score
              </p>
              <p className='text-3xl font-black text-emerald-400'>
                {selectedQuiz.attempts.length > 0
                  ? (
                      selectedQuiz.attempts.reduce((a, b) => a + b.score, 0) /
                      selectedQuiz.attempts.length
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>
          </div>

          <div className='bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm'>
            <table className='w-full text-left border-collapse'>
              <thead className='bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100'>
                <tr>
                  <th className='px-8 py-6'>Student Name</th>
                  <th className='px-8 py-6'>Date Attempted</th>
                  <th className='px-8 py-6 text-center'>Score</th>
                  <th className='px-8 py-6'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {selectedQuiz.attempts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className='px-8 py-24 text-center text-slate-400 font-bold'
                    >
                      <div className='flex flex-col items-center'>
                        <User className='mb-4 opacity-20' size={40} />
                        <p>No student data available yet.</p>
                        <p className='text-[10px] uppercase mt-2 italic'>
                          Share the link to start collecting results!
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  selectedQuiz.attempts.map((att, i) => (
                    <tr
                      key={i}
                      className='hover:bg-slate-50/50 transition-colors group'
                    >
                      <td className='px-8 py-6 font-bold text-slate-700 group-hover:text-[#002EFF]'>
                        {att.studentName}
                      </td>
                      <td className='px-8 py-6 text-slate-500 font-medium text-sm'>
                        {att.date}
                      </td>
                      <td className='px-8 py-6 font-black text-xl text-center text-slate-900'>
                        {att.score}%
                      </td>
                      <td className='px-8 py-6'>
                        <span
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${att.status === 'Passed' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
                        >
                          {att.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}