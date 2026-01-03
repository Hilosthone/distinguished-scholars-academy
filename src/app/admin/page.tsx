'use client'
import { useState, useEffect } from 'react'
import {
  Users,
  PlusCircle,
  Lock,
  Unlock,
  CheckCircle,
  Database,
  HelpCircle,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [tab, setTab] = useState<'students' | 'add-question'>('students')
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    subject: 'ENG',
    text: '',
    a: '',
    b: '',
    c: '',
    d: '',
    correct: 0,
    explanation: '',
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setStudents(data)
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'restricted' : 'active'
    await supabase.from('profiles').update({ status: newStatus }).eq('id', id)
    fetchStudents()
  }

  async function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('questions').insert({
      subject: form.subject,
      question_text: form.text,
      options: [form.a, form.b, form.c, form.d],
      correct_option: form.correct,
      explanation: form.explanation,
    })

    setLoading(false)
    if (!error) {
      alert('Question Saved Successfully!')
      setForm({
        ...form,
        text: '',
        a: '',
        b: '',
        c: '',
        d: '',
        explanation: '',
      })
    } else {
      alert('Error: ' + error.message)
    }
  }

  return (
    <div className='min-h-screen bg-[#F0F4FF] flex font-sans'>
      {/* Sidebar Navigation */}
      <aside className='w-72 bg-[#002EFF] text-white p-8 flex flex-col shadow-xl sticky top-0 h-screen'>
        <h1 className='font-black text-3xl mb-12 tracking-tighter italic'>
          DSA ADMIN
        </h1>
        <nav className='space-y-2 flex-1'>
          <button
            onClick={() => setTab('students')}
            className={`flex items-center gap-3 w-full p-4 rounded-2xl font-bold transition-all ${
              tab === 'students'
                ? 'bg-white text-[#002EFF] shadow-lg'
                : 'hover:bg-blue-600'
            }`}
          >
            <Users size={20} /> Students
          </button>
          <button
            onClick={() => setTab('add-question')}
            className={`flex items-center gap-3 w-full p-4 rounded-2xl font-bold transition-all ${
              tab === 'add-question'
                ? 'bg-white text-[#002EFF] shadow-lg'
                : 'hover:bg-blue-600'
            }`}
          >
            <PlusCircle size={20} /> Question Bank
          </button>
        </nav>
        <div className='bg-blue-700/50 p-4 rounded-2xl'>
          <p className='text-[10px] uppercase font-black tracking-widest text-blue-200 mb-1'>
            System Status
          </p>
          <div className='flex items-center gap-2 text-xs font-bold'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            Connected to Supabase
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 p-12 overflow-y-auto'>
        {tab === 'students' ? (
          <div className='bg-white rounded-[40px] p-10 shadow-sm border border-blue-100'>
            <div className='flex justify-between items-center mb-8'>
              <div>
                <h2 className='text-3xl font-black text-gray-900'>
                  Student Records
                </h2>
                <p className='text-gray-400 font-medium'>
                  Monitor and manage student access
                </p>
              </div>
              <span className='bg-blue-50 text-[#002EFF] px-6 py-3 rounded-2xl font-black text-sm border border-blue-100'>
                {students.length} Total Users
              </span>
            </div>

            <table className='w-full'>
              <thead>
                <tr className='text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-50'>
                  <th className='pb-6 text-left pl-4'>Student Profile</th>
                  <th className='pb-6 text-left'>Status</th>
                  <th className='pb-6 text-center'>Quick Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className='group hover:bg-gray-50/50 transition-colors'
                  >
                    <td className='py-6 pl-4'>
                      <div className='font-bold text-gray-800 text-lg'>
                        {s.full_name || 'Anonymous Student'}
                      </div>
                      <div className='text-xs text-gray-400 font-mono'>
                        {s.id}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                          s.status === 'active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className='text-center'>
                      <button
                        onClick={() => toggleStatus(s.id, s.status)}
                        className={`p-4 rounded-2xl transition-all shadow-sm ${
                          s.status === 'active'
                            ? 'bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                        title={
                          s.status === 'active'
                            ? 'Restrict Access'
                            : 'Allow Access'
                        }
                      >
                        {s.status === 'active' ? (
                          <Lock size={22} />
                        ) : (
                          <Unlock size={22} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* FULL QUESTION UPLOAD FORM */
          <div className='max-w-3xl mx-auto'>
            <form
              onSubmit={handleAddQuestion}
              className='bg-white rounded-[40px] p-12 shadow-sm border border-blue-100 space-y-8'
            >
              <div className='flex items-center gap-4 mb-4'>
                <div className='p-4 bg-blue-50 rounded-2xl text-[#002EFF]'>
                  <Database size={32} />
                </div>
                <div>
                  <h2 className='text-3xl font-black text-gray-900'>
                    New Question
                  </h2>
                  <p className='text-gray-400 font-medium'>
                    Add questions to the Entrance Exam bank
                  </p>
                </div>
              </div>

              {/* Meta Data Grid */}
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label className='text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest'>
                    Subject Category
                  </label>
                  <select
                    className='p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#002EFF] font-bold outline-none'
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  >
                    <option>ENG</option>
                    <option>MATH</option>
                    <option>PHY</option>
                    <option>CHEM</option>
                    <option>BIO</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest'>
                    Correct Answer
                  </label>
                  <select
                    className='p-4 bg-blue-50 rounded-2xl border-none ring-2 ring-blue-200 text-[#002EFF] font-black outline-none'
                    value={form.correct}
                    onChange={(e) =>
                      setForm({ ...form, correct: parseInt(e.target.value) })
                    }
                  >
                    <option value={0}>Option A is Correct</option>
                    <option value={1}>Option B is Correct</option>
                    <option value={2}>Option C is Correct</option>
                    <option value={3}>Option D is Correct</option>
                  </select>
                </div>
              </div>

              {/* Question Body */}
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest'>
                  Question Text
                </label>
                <textarea
                  placeholder='Describe the problem or question...'
                  className='w-full p-6 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#002EFF] min-h-[120px] outline-none font-medium'
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  required
                />
              </div>

              {/* Options Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {['a', 'b', 'c', 'd'].map((letter, index) => (
                  <div key={letter} className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest'>
                      Option {letter.toUpperCase()}
                    </label>
                    <input
                      placeholder={`Enter choice ${letter.toUpperCase()}...`}
                      className='p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#002EFF] outline-none font-bold'
                      value={(form as any)[letter]}
                      onChange={(e) =>
                        setForm({ ...form, [letter]: e.target.value })
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Explanation Section */}
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest'>
                  Expert Explanation
                </label>
                <textarea
                  placeholder='Why is this the answer? (Optional)'
                  className='w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 text-sm outline-none'
                  value={form.explanation}
                  onChange={(e) =>
                    setForm({ ...form, explanation: e.target.value })
                  }
                />
              </div>

              <button
                disabled={loading}
                className='w-full py-6 bg-black text-white font-black rounded-3xl hover:bg-[#002EFF] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl'
              >
                {loading ? 'SYNCING...' : 'PUSH TO DATABASE'}
                {!loading && <CheckCircle size={20} />}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
