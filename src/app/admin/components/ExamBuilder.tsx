// 'use client'

// import React, { useState, useRef, ChangeEvent } from 'react'
// import {
//   Plus,
//   UploadCloud,
//   ImageIcon as ImageIconLucide,
//   Trash2,
//   Loader2,
//   Settings2,
//   Edit3,
//   Rocket,
//   X,
//   Camera,
//   Info,
// } from 'lucide-react'
// import * as XLSX from 'xlsx'

// // --- Types ---
// type Question = {
//   id: string
//   qNumber: number
//   subject: string
//   topic: string
//   body: string
//   options: { [key: string]: string }
//   correctOption: string
//   explanation: string // NEW: Field for correction logic
//   difficulty: string // NEW: Dropdown categorized
//   image: string | null
// }

// type GlobalContext = {
//   subject: string
//   topic: string
//   description: string
//   timeLimit: string
//   instructions: string
// }

// export default function QuestionBank() {
//   const [mode, setMode] = useState<'individual' | 'bulk'>('individual')
//   const [isDeploying, setIsDeploying] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const [editingId, setEditingId] = useState<string | null>(null)

//   const [context, setContext] = useState<GlobalContext>({
//     subject: '',
//     topic: '',
//     description: '',
//     timeLimit: '30',
//     instructions: 'Select the best answer.',
//   })

//   const [manualQueue, setManualQueue] = useState<Question[]>([])
//   const [formData, setFormData] = useState<Partial<Question>>({
//     body: '',
//     options: { A: '', B: '', C: '', D: '', E: '' },
//     correctOption: '',
//     explanation: '', // Init explanation
//     difficulty: 'Simple', // Default difficulty
//   })

//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const bulkFileRef = useRef<HTMLInputElement>(null)

//   // --- Image Handling ---
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setSelectedImage(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // --- Deploy Logic ---
//   const handleDeploy = () => {
//     if (manualQueue.length === 0) {
//       alert('Add some questions to the queue before deploying!')
//       return
//     }
//     setIsDeploying(true)
//     setTimeout(() => {
//       const payload = {
//         config: context,
//         questions: manualQueue.sort((a, b) => a.qNumber - b.qNumber),
//         deployedAt: new Date().toISOString(),
//       }
//       localStorage.setItem('staged_exam_data', JSON.stringify(payload))
//       setIsDeploying(false)
//       alert('🚀 Exam Deployed with Explanations!')
//     }, 1500)
//   }

//   // --- Handlers ---
//   const handleSaveQuestion = () => {
//     if (!formData.body || !formData.correctOption) {
//       alert('Question body and correct answer are required.')
//       return
//     }

//     if (editingId) {
//       setManualQueue(
//         manualQueue.map((q) =>
//           q.id === editingId
//             ? {
//                 ...q,
//                 body: formData.body!,
//                 options: formData.options as any,
//                 correctOption: formData.correctOption!,
//                 explanation: formData.explanation || '',
//                 difficulty: formData.difficulty || 'Simple',
//                 image: selectedImage,
//                 subject: context.subject || q.subject,
//                 topic: context.topic || q.topic,
//               }
//             : q,
//         ),
//       )
//       setEditingId(null)
//     } else {
//       const newQuestion: Question = {
//         id: Date.now().toString(),
//         qNumber: manualQueue.length + 1,
//         subject: context.subject || 'Uncategorized',
//         topic: context.topic || 'General',
//         body: formData.body || '',
//         options: formData.options as { [key: string]: string },
//         correctOption: formData.correctOption || 'A',
//         explanation: formData.explanation || '',
//         difficulty: formData.difficulty || 'Simple',
//         image: selectedImage,
//       }
//       setManualQueue([...manualQueue, newQuestion])
//     }

//     setFormData({
//       body: '',
//       options: { A: '', B: '', C: '', D: '', E: '' },
//       correctOption: '',
//       explanation: '',
//       difficulty: 'Simple',
//     })
//     setSelectedImage(null)
//   }

//   const editQuestion = (q: Question) => {
//     setEditingId(q.id)
//     setFormData({
//       body: q.body,
//       options: { ...q.options },
//       correctOption: q.correctOption,
//       explanation: q.explanation,
//       difficulty: q.difficulty,
//     })
//     setSelectedImage(q.image)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const deleteQuestion = (id: string) => {
//     const filtered = manualQueue.filter((q) => q.id !== id)
//     const reIndexed = filtered.map((q, idx) => ({ ...q, qNumber: idx + 1 }))
//     setManualQueue(reIndexed)
//   }

//   const handleBulkUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setIsUploading(true)
//     const reader = new FileReader()
//     reader.onload = (evt) => {
//       try {
//         const bstr = evt.target?.result
//         const wb = XLSX.read(bstr, { type: 'binary' })
//         const ws = wb.Sheets[wb.SheetNames[0]]
//         const data = XLSX.utils.sheet_to_json(ws) as any[]
//         const parsed: Question[] = data.map((row, i) => ({
//           id: `bulk-${Date.now()}-${i}`,
//           qNumber: manualQueue.length + i + 1,
//           subject: context.subject || row.Subject || 'Uncategorized',
//           topic: context.topic || row.Topic || 'General',
//           body: row.Question || row.body || '',
//           options: {
//             A: String(row.A || ''),
//             B: String(row.B || ''),
//             C: String(row.C || ''),
//             D: String(row.D || ''),
//             E: String(row.E || ''),
//           },
//           correctOption: String(row.Correct || 'A').toUpperCase(),
//           explanation: row.Explanation || '',
//           difficulty: row.Difficulty || 'Simple',
//           image: null,
//         }))
//         setManualQueue((prev) => [...prev, ...parsed])
//         setMode('individual')
//       } catch (err) {
//         alert('Parse error.')
//       } finally {
//         setIsUploading(false)
//       }
//     }
//     reader.readAsBinaryString(file)
//   }

//   return (
//     <div className='max-w-[1400px] mx-auto min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900'>
//       <div className='p-6 grid grid-cols-1 lg:grid-cols-12 gap-6'>
//         {/* SIDEBAR */}
//         <div className='lg:col-span-4 space-y-4'>
//           <div className='bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-24'>
//             <h3 className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2'>
//               <Settings2 size={12} className='text-[#002EFF]' /> Global Context
//             </h3>

//             <div className='space-y-4'>
//               <div>
//                 <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
//                   Subject
//                 </label>
//                 <input
//                   value={context.subject}
//                   onChange={(e) =>
//                     setContext({ ...context, subject: e.target.value })
//                   }
//                   className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
//                 />
//               </div>

//               <div className='grid grid-cols-2 gap-3'>
//                 <div>
//                   <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
//                     Topic
//                   </label>
//                   <input
//                     value={context.topic}
//                     onChange={(e) =>
//                       setContext({ ...context, topic: e.target.value })
//                     }
//                     className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
//                   />
//                 </div>
//                 <div>
//                   <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
//                     Time (Min)
//                   </label>
//                   <input
//                     type='number'
//                     value={context.timeLimit}
//                     onChange={(e) =>
//                       setContext({ ...context, timeLimit: e.target.value })
//                     }
//                     className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
//                   />
//                 </div>
//               </div>

//               <div className='pt-6 border-t border-slate-100 mt-6'>
//                 <button
//                   onClick={handleDeploy}
//                   disabled={isDeploying || manualQueue.length === 0}
//                   className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100
//                     ${manualQueue.length === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#002EFF] text-white hover:bg-blue-700 active:scale-95'}`}
//                 >
//                   {isDeploying ? (
//                     <Loader2 size={18} className='animate-spin' />
//                   ) : (
//                     <Rocket size={18} />
//                   )}
//                   {isDeploying
//                     ? 'Deploying...'
//                     : `Deploy ${manualQueue.length} Questions`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MAIN AREA */}
//         <div className='lg:col-span-8 space-y-6'>
//           <div className='bg-white rounded-3xl border border-slate-200 p-6 shadow-sm'>
//             <div className='flex justify-between items-center mb-6'>
//               <h2 className='text-sm font-black uppercase tracking-tight flex items-center gap-2'>
//                 {editingId ? (
//                   <Edit3 size={16} className='text-[#002EFF]' />
//                 ) : (
//                   <Plus size={16} />
//                 )}
//                 {editingId
//                   ? `Editing Question #${manualQueue.find((q) => q.id === editingId)?.qNumber}`
//                   : `New Entry (#${manualQueue.length + 1})`}
//               </h2>
//               <div className='flex bg-slate-100 p-1 rounded-xl'>
//                 {['individual', 'bulk'].map((m) => (
//                   <button
//                     key={m}
//                     onClick={() => setMode(m as any)}
//                     className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${mode === m ? 'bg-white shadow-sm' : 'text-slate-400'}`}
//                   >
//                     {m}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {mode === 'individual' ? (
//               <div className='space-y-4'>
//                 <div className='flex items-center justify-between gap-4 mb-4'>
//                   <div className='flex items-center gap-4'>
//                     {selectedImage ? (
//                       <div className='relative w-32 h-24 rounded-xl overflow-hidden border-2 border-[#002EFF]'>
//                         <img
//                           src={selectedImage}
//                           alt='preview'
//                           className='w-full h-full object-cover'
//                         />
//                         <button
//                           onClick={() => setSelectedImage(null)}
//                           className='absolute top-1 right-1 bg-white rounded-full p-1 text-rose-500 shadow-md'
//                         >
//                           <X size={12} />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => fileInputRef.current?.click()}
//                         className='w-32 h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-[#002EFF] hover:border-[#002EFF] transition-colors'
//                       >
//                         <Camera size={20} />
//                         <span className='text-[8px] font-black mt-1'>
//                           ADD IMAGE
//                         </span>
//                       </button>
//                     )}
//                     <input
//                       type='file'
//                       ref={fileInputRef}
//                       hidden
//                       accept='image/*'
//                       onChange={handleImageChange}
//                     />
//                   </div>

//                   {/* DIFFICULTY DROP DOWN */}
//                   <div className='flex-1 max-w-[200px]'>
//                     <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
//                       Difficulty Level
//                     </label>
//                     <select
//                       value={formData.difficulty}
//                       onChange={(e) =>
//                         setFormData({ ...formData, difficulty: e.target.value })
//                       }
//                       className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#002EFF]'
//                     >
//                       <option value='Simple'>Simple</option>
//                       <option value='Standard'>Standard</option>
//                       <option value='Hard'>Hard</option>
//                       <option value='Complex'>Complex</option>
//                     </select>
//                   </div>
//                 </div>

//                 <textarea
//                   value={formData.body}
//                   onChange={(e) =>
//                     setFormData({ ...formData, body: e.target.value })
//                   }
//                   className='w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-[#002EFF]'
//                   placeholder='Type question here...'
//                   rows={3}
//                 />

//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
//                   {['A', 'B', 'C', 'D', 'E'].map((char) => (
//                     <div
//                       key={char}
//                       className={`flex items-center gap-3 p-3 rounded-xl border-2 ${formData.correctOption === char ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-50 bg-slate-50'}`}
//                     >
//                       <button
//                         onClick={() =>
//                           setFormData({ ...formData, correctOption: char })
//                         }
//                         className={`w-8 h-8 rounded-lg font-black text-xs ${formData.correctOption === char ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}
//                       >
//                         {char}
//                       </button>
//                       <input
//                         value={formData.options?.[char] || ''}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             options: {
//                               ...formData.options,
//                               [char]: e.target.value,
//                             },
//                           })
//                         }
//                         className='bg-transparent outline-none text-xs font-bold w-full'
//                         placeholder={`Option ${char}`}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {/* EXPLANATION / RATIONALE SPACE */}
//                 <div className='mt-4'>
//                   <label className='text-[9px] font-black text-[#002EFF] uppercase ml-1 mb-1 flex items-center gap-1'>
//                     <Info size={10} /> Correct Answer Explanation (For Student
//                     Review)
//                   </label>
//                   <textarea
//                     value={formData.explanation}
//                     onChange={(e) =>
//                       setFormData({ ...formData, explanation: e.target.value })
//                     }
//                     className='w-full p-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-xs font-medium outline-none focus:border-[#002EFF]'
//                     placeholder='Explain why the selected answer is correct...'
//                     rows={2}
//                   />
//                 </div>

//                 <div className='flex justify-end mt-6'>
//                   <button
//                     onClick={handleSaveQuestion}
//                     className='px-8 py-3 bg-slate-900 text-[#FFD700] rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#002EFF] transition-all'
//                   >
//                     {editingId ? 'Update Question' : 'Stage Question'}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div
//                 className='py-16 text-center border-4 border-dashed border-slate-100 rounded-4xl cursor-pointer'
//                 onClick={() => bulkFileRef.current?.click()}
//               >
//                 <input
//                   type='file'
//                   ref={bulkFileRef}
//                   hidden
//                   onChange={handleBulkUpload}
//                 />
//                 <UploadCloud
//                   size={40}
//                   className='mx-auto text-slate-200 mb-4'
//                 />
//                 <p className='text-[10px] font-black uppercase text-slate-400'>
//                   Click to upload CSV / XLSX
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* TABLE */}
//           <div className='bg-white rounded-3xl border border-slate-200 overflow-hidden'>
//             <table className='w-full text-left'>
//               <thead className='bg-slate-50 border-b border-slate-100'>
//                 <tr>
//                   <th className='p-4 text-[9px] font-black uppercase text-slate-400 pl-6 w-16'>
//                     #
//                   </th>
//                   <th className='p-4 text-[9px] font-black uppercase text-slate-400'>
//                     Question Detail
//                   </th>
//                   <th className='p-4 text-[9px] font-black uppercase text-slate-400 text-right pr-6'>
//                     Manage
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {manualQueue
//                   .slice()
//                   .reverse()
//                   .map((q) => (
//                     <tr
//                       key={q.id}
//                       className='hover:bg-slate-50/50 border-b border-slate-50'
//                     >
//                       <td className='p-4 pl-6 text-xs font-black text-slate-300'>
//                         {q.qNumber}
//                       </td>
//                       <td className='p-4'>
//                         <div className='flex items-start gap-3'>
//                           {q.image && (
//                             <img
//                               src={q.image}
//                               className='w-10 h-10 rounded shadow-sm object-cover border border-slate-100'
//                             />
//                           )}
//                           <div>
//                             <p className='text-xs font-bold line-clamp-1'>
//                               {q.body}
//                             </p>
//                             <div className='flex items-center gap-2 mt-1'>
//                               <span
//                                 className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
//                                   q.difficulty === 'Simple'
//                                     ? 'bg-emerald-100 text-emerald-600'
//                                     : q.difficulty === 'Hard'
//                                       ? 'bg-orange-100 text-orange-600'
//                                       : q.difficulty === 'Complex'
//                                         ? 'bg-rose-100 text-rose-600'
//                                         : 'bg-slate-100 text-slate-600'
//                                 }`}
//                               >
//                                 {q.difficulty}
//                               </span>
//                               <p className='text-[9px] font-black text-[#002EFF] uppercase'>
//                                 {q.subject} • {q.topic} • Ans: {q.correctOption}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className='p-4 pr-6 text-right'>
//                         <div className='flex justify-end gap-2'>
//                           <button
//                             onClick={() => editQuestion(q)}
//                             className='p-2 text-slate-400 hover:text-slate-900'
//                           >
//                             <Edit3 size={14} />
//                           </button>
//                           <button
//                             onClick={() => deleteQuestion(q.id)}
//                             className='p-2 text-slate-400 hover:text-rose-500'
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState, useRef, ChangeEvent } from 'react'
import {
  Plus,
  UploadCloud,
  ImageIcon as ImageIconLucide,
  Trash2,
  Loader2,
  Settings2,
  Edit3,
  Rocket,
  X,
  Camera,
  Info,
} from 'lucide-react'
import * as XLSX from 'xlsx'

// --- Types ---
type Question = {
  id: string
  qNumber: number
  subject: string
  topic: string
  body: string
  options: { [key: string]: string }
  correctOption: string
  explanation: string
  difficulty: string
  image: string | null
}

type GlobalContext = {
  quizTitle: string // NEW
  quizDescription: string // NEW
  subject: string
  topic: string
  timeLimit: string
  instructions: string
}

export default function QuestionBank() {
  const [mode, setMode] = useState<'individual' | 'bulk'>('individual')
  const [isDeploying, setIsDeploying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [context, setContext] = useState<GlobalContext>({
    quizTitle: '', // Init
    quizDescription: '', // Init
    subject: '',
    topic: '',
    timeLimit: '30',
    instructions: 'Select the best answer.',
  })

  const [manualQueue, setManualQueue] = useState<Question[]>([])
  const [formData, setFormData] = useState<Partial<Question>>({
    body: '',
    options: { A: '', B: '', C: '', D: '', E: '' },
    correctOption: '',
    explanation: '',
    difficulty: 'Simple',
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bulkFileRef = useRef<HTMLInputElement>(null)

  // --- Image Handling ---
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // --- Deploy Logic ---
  const handleDeploy = () => {
    if (manualQueue.length === 0) {
      alert('Add some questions to the queue before deploying!')
      return
    }
    setIsDeploying(true)
    setTimeout(() => {
      const payload = {
        config: context,
        questions: manualQueue.sort((a, b) => a.qNumber - b.qNumber),
        deployedAt: new Date().toISOString(),
      }
      localStorage.setItem('staged_exam_data', JSON.stringify(payload))
      setIsDeploying(false)
      alert('🚀 Exam Deployed with Explanations!')
    }, 1500)
  }

  // --- Handlers ---
  const handleSaveQuestion = () => {
    if (!formData.body || !formData.correctOption) {
      alert('Question body and correct answer are required.')
      return
    }

    if (editingId) {
      setManualQueue(
        manualQueue.map((q) =>
          q.id === editingId
            ? {
                ...q,
                body: formData.body!,
                options: formData.options as any,
                correctOption: formData.correctOption!,
                explanation: formData.explanation || '',
                difficulty: formData.difficulty || 'Simple',
                image: selectedImage,
                subject: context.subject || q.subject,
                topic: context.topic || q.topic,
              }
            : q,
        ),
      )
      setEditingId(null)
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        qNumber: manualQueue.length + 1,
        subject: context.subject || 'Uncategorized',
        topic: context.topic || 'General',
        body: formData.body || '',
        options: formData.options as { [key: string]: string },
        correctOption: formData.correctOption || 'A',
        explanation: formData.explanation || '',
        difficulty: formData.difficulty || 'Simple',
        image: selectedImage,
      }
      setManualQueue([...manualQueue, newQuestion])
    }

    setFormData({
      body: '',
      options: { A: '', B: '', C: '', D: '', E: '' },
      correctOption: '',
      explanation: '',
      difficulty: 'Simple',
    })
    setSelectedImage(null)
  }

  const editQuestion = (q: Question) => {
    setEditingId(q.id)
    setFormData({
      body: q.body,
      options: { ...q.options },
      correctOption: q.correctOption,
      explanation: q.explanation,
      difficulty: q.difficulty,
    })
    setSelectedImage(q.image)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteQuestion = (id: string) => {
    const filtered = manualQueue.filter((q) => q.id !== id)
    const reIndexed = filtered.map((q, idx) => ({ ...q, qNumber: idx + 1 }))
    setManualQueue(reIndexed)
  }

  const handleBulkUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(ws) as any[]
        const parsed: Question[] = data.map((row, i) => ({
          id: `bulk-${Date.now()}-${i}`,
          qNumber: manualQueue.length + i + 1,
          subject: context.subject || row.Subject || 'Uncategorized',
          topic: context.topic || row.Topic || 'General',
          body: row.Question || row.body || '',
          options: {
            A: String(row.A || ''),
            B: String(row.B || ''),
            C: String(row.C || ''),
            D: String(row.D || ''),
            E: String(row.E || ''),
          },
          correctOption: String(row.Correct || 'A').toUpperCase(),
          explanation: row.Explanation || '',
          difficulty: row.Difficulty || 'Simple',
          image: null,
        }))
        setManualQueue((prev) => [...prev, ...parsed])
        setMode('individual')
      } catch (err) {
        alert('Parse error.')
      } finally {
        setIsUploading(false)
      }
    }
    reader.readAsBinaryString(file)
  }

  return (
    <div className='max-w-[1400px] mx-auto min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900'>
      <div className='p-6 grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* SIDEBAR */}
        <div className='lg:col-span-4 space-y-4'>
          <div className='bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-24'>
            <h3 className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2'>
              <Settings2 size={12} className='text-[#002EFF]' /> Global Context
            </h3>

            <div className='space-y-4'>
              {/* QUIZ TITLE */}
              <div>
                <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                  Quiz Title
                </label>
                <input
                  value={context.quizTitle}
                  placeholder='Final Semester Exam...'
                  onChange={(e) =>
                    setContext({ ...context, quizTitle: e.target.value })
                  }
                  className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
                />
              </div>

              {/* QUIZ DESCRIPTION */}
              <div>
                <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                  Quiz Description
                </label>
                <textarea
                  value={context.quizDescription}
                  placeholder='Provide context for this assessment...'
                  onChange={(e) =>
                    setContext({ ...context, quizDescription: e.target.value })
                  }
                  rows={2}
                  className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none resize-none'
                />
              </div>

              <div>
                <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                  Subject
                </label>
                <input
                  placeholder='e.g. Mathematics'
                  value={context.subject}
                  onChange={(e) =>
                    setContext({ ...context, subject: e.target.value })
                  }
                  className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                    Topic
                  </label>
                  <input
                    placeholder='e.g. Algebra'
                    value={context.topic}
                    onChange={(e) =>
                      setContext({ ...context, topic: e.target.value })
                    }
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
                  />
                </div>
                <div>
                  <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                    Time (Min)
                  </label>
                  <input
                    type='number'
                    value={context.timeLimit}
                    onChange={(e) =>
                      setContext({ ...context, timeLimit: e.target.value })
                    }
                    className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#002EFF] outline-none'
                  />
                </div>
              </div>

              <div className='pt-6 border-t border-slate-100 mt-6'>
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying || manualQueue.length === 0}
                  className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 
                    ${manualQueue.length === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#002EFF] text-white hover:bg-blue-700 active:scale-95'}`}
                >
                  {isDeploying ? (
                    <Loader2 size={18} className='animate-spin' />
                  ) : (
                    <Rocket size={18} />
                  )}
                  {isDeploying
                    ? 'Deploying...'
                    : `Deploy ${manualQueue.length} Questions`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className='lg:col-span-8 space-y-6'>
          <div className='bg-white rounded-3xl border border-slate-200 p-6 shadow-sm'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-sm font-black uppercase tracking-tight flex items-center gap-2'>
                {editingId ? (
                  <Edit3 size={16} className='text-[#002EFF]' />
                ) : (
                  <Plus size={16} />
                )}
                {editingId
                  ? `Editing Question #${manualQueue.find((q) => q.id === editingId)?.qNumber}`
                  : `New Entry (#${manualQueue.length + 1})`}
              </h2>
              <div className='flex bg-slate-100 p-1 rounded-xl'>
                {['individual', 'bulk'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m as any)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${mode === m ? 'bg-white shadow-sm' : 'text-slate-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'individual' ? (
              <div className='space-y-4'>
                <div className='flex items-center justify-between gap-4 mb-4'>
                  <div className='flex items-center gap-4'>
                    {selectedImage ? (
                      <div className='relative w-32 h-24 rounded-xl overflow-hidden border-2 border-[#002EFF]'>
                        <img
                          src={selectedImage}
                          alt='preview'
                          className='w-full h-full object-cover'
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className='absolute top-1 right-1 bg-white rounded-full p-1 text-rose-500 shadow-md'
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className='w-32 h-24 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-[#002EFF] hover:border-[#002EFF] transition-colors'
                      >
                        <Camera size={20} />
                        <span className='text-[8px] font-black mt-1'>
                          ADD IMAGE
                        </span>
                      </button>
                    )}
                    <input
                      type='file'
                      ref={fileInputRef}
                      hidden
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* DIFFICULTY DROP DOWN */}
                  <div className='flex-1 max-w-[200px]'>
                    <label className='text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block'>
                      Difficulty Level
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({ ...formData, difficulty: e.target.value })
                      }
                      className='w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#002EFF]'
                    >
                      <option value='Simple'>Simple</option>
                      <option value='Standard'>Standard</option>
                      <option value='Hard'>Hard</option>
                      <option value='Complex'>Complex</option>
                    </select>
                  </div>
                </div>

                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className='w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-[#002EFF]'
                  placeholder='Type question here...'
                  rows={3}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {['A', 'B', 'C', 'D', 'E'].map((char) => (
                    <div
                      key={char}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 ${formData.correctOption === char ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-50 bg-slate-50'}`}
                    >
                      <button
                        onClick={() =>
                          setFormData({ ...formData, correctOption: char })
                        }
                        className={`w-8 h-8 rounded-lg font-black text-xs ${formData.correctOption === char ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}
                      >
                        {char}
                      </button>
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
                        className='bg-transparent outline-none text-xs font-bold w-full'
                        placeholder={`Option ${char}`}
                      />
                    </div>
                  ))}
                </div>

                {/* EXPLANATION / RATIONALE SPACE */}
                <div className='mt-4'>
                  <label className='text-[9px] font-black text-[#002EFF] uppercase ml-1 mb-1 flex items-center gap-1'>
                    <Info size={10} /> Correct Answer Explanation (For Student
                    Review)
                  </label>
                  <textarea
                    value={formData.explanation}
                    onChange={(e) =>
                      setFormData({ ...formData, explanation: e.target.value })
                    }
                    className='w-full p-4 bg-blue-50/30 border border-blue-100 rounded-2xl text-xs font-medium outline-none focus:border-[#002EFF]'
                    placeholder='Explain why the selected answer is correct...'
                    rows={2}
                  />
                </div>

                <div className='flex justify-end mt-6'>
                  <button
                    onClick={handleSaveQuestion}
                    className='px-8 py-3 bg-slate-900 text-[#FFD700] rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#002EFF] transition-all'
                  >
                    {editingId ? 'Update Question' : 'Stage Question'}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className='py-16 text-center border-4 border-dashed border-slate-100 rounded-4xl cursor-pointer'
                onClick={() => bulkFileRef.current?.click()}
              >
                <input
                  type='file'
                  ref={bulkFileRef}
                  hidden
                  onChange={handleBulkUpload}
                />
                <UploadCloud
                  size={40}
                  className='mx-auto text-slate-200 mb-4'
                />
                <p className='text-[10px] font-black uppercase text-slate-400'>
                  Click to upload CSV / XLSX
                </p>
              </div>
            )}
          </div>

          {/* TABLE */}
          <div className='bg-white rounded-3xl border border-slate-200 overflow-hidden'>
            <table className='w-full text-left'>
              <thead className='bg-slate-50 border-b border-slate-100'>
                <tr>
                  <th className='p-4 text-[9px] font-black uppercase text-slate-400 pl-6 w-16'>
                    #
                  </th>
                  <th className='p-4 text-[9px] font-black uppercase text-slate-400'>
                    Question Detail
                  </th>
                  <th className='p-4 text-[9px] font-black uppercase text-slate-400 text-right pr-6'>
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {manualQueue
                  .slice()
                  .reverse()
                  .map((q) => (
                    <tr
                      key={q.id}
                      className='hover:bg-slate-50/50 border-b border-slate-50'
                    >
                      <td className='p-4 pl-6 text-xs font-black text-slate-300'>
                        {q.qNumber}
                      </td>
                      <td className='p-4'>
                        <div className='flex items-start gap-3'>
                          {q.image && (
                            <img
                              src={q.image}
                              className='w-10 h-10 rounded shadow-sm object-cover border border-slate-100'
                            />
                          )}
                          <div>
                            <p className='text-xs font-bold line-clamp-1'>
                              {q.body}
                            </p>
                            <div className='flex items-center gap-2 mt-1'>
                              <span
                                className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                  q.difficulty === 'Simple'
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : q.difficulty === 'Hard'
                                      ? 'bg-orange-100 text-orange-600'
                                      : q.difficulty === 'Complex'
                                        ? 'bg-rose-100 text-rose-600'
                                        : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {q.difficulty}
                              </span>
                              <p className='text-[9px] font-black text-[#002EFF] uppercase'>
                                {q.subject} • {q.topic} • Ans: {q.correctOption}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='p-4 pr-6 text-right'>
                        <div className='flex justify-end gap-2'>
                          <button
                            onClick={() => editQuestion(q)}
                            className='p-2 text-slate-400 hover:text-slate-900'
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className='p-2 text-slate-400 hover:text-rose-500'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}