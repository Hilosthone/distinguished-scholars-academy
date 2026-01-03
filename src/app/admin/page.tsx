'use client'
import { useState, useEffect } from 'react'
import {
  Users,
  PlusCircle,
  Lock,
  Unlock,
  CheckCircle,
  Database,
  AlertTriangle,
} from 'lucide-react'

// Removed Supabase Import

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<'students' | 'add-question'>('students')

  // Local state for demonstration since we aren't using a DB
  const [students, setStudents] = useState([
    { id: '1', full_name: 'Sample Student', status: 'active' },
    { id: '2', full_name: 'Demo User', status: 'restricted' },
  ])

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
    setMounted(true)
  }, [])

  async function toggleStatus(id: string, currentStatus: string) {
    // Local update only
    const newStatus = currentStatus === 'active' ? 'restricted' : 'active'
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    )
  }

  async function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Simulate a network delay
    setTimeout(() => {
      setLoading(false)
      alert('Demo Mode: Question logic would trigger here.')
      setForm({
        ...form,
        text: '',
        a: '',
        b: '',
        c: '',
        d: '',
        explanation: '',
      })
    }, 1000)
  }

  if (!mounted) return null

  return (
    <div className='min-h-screen bg-[#F0F4FF] flex font-sans'>
      {/* Sidebar */}
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

        {/* Status Indicator showing No DB */}
        <div className='bg-yellow-500/20 p-4 rounded-2xl border border-yellow-500/30'>
          <p className='text-[10px] uppercase font-black tracking-widest text-yellow-200 mb-1'>
            Data Mode
          </p>
          <div className='flex items-center gap-2 text-xs font-bold text-white'>
            <AlertTriangle size={14} className='text-yellow-400' />
            Local/Static Mode
          </div>
        </div>
      </aside>

      <main className='flex-1 p-12 overflow-y-auto'>
        {tab === 'students' ? (
          <div className='bg-white rounded-[40px] p-10 shadow-sm border border-blue-100'>
            <h2 className='text-3xl font-black text-gray-900 mb-8'>
              Student Records
            </h2>
            <table className='w-full'>
              <thead>
                <tr className='text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-50'>
                  <th className='pb-6 text-left pl-4'>Student Profile</th>
                  <th className='pb-6 text-left'>Status</th>
                  <th className='pb-6 text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {students.map((s) => (
                  <tr key={s.id} className='group hover:bg-gray-50/50'>
                    <td className='py-6 pl-4'>
                      <div className='font-bold text-gray-800'>
                        {s.full_name}
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
                        className='p-4 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100'
                      >
                        {s.status === 'active' ? (
                          <Lock size={20} />
                        ) : (
                          <Unlock size={20} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='max-w-3xl mx-auto'>
            <form
              onSubmit={handleAddQuestion}
              className='bg-white rounded-[40px] p-12 shadow-sm border border-blue-100 space-y-6'
            >
              <h2 className='text-3xl font-black text-gray-900'>
                New Question
              </h2>
              <textarea
                placeholder='Question Text...'
                className='w-full p-6 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 outline-none text-gray-800'
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                required
              />
              {/* Simplified options for demo */}
              <div className='grid grid-cols-2 gap-4'>
                {['a', 'b', 'c', 'd'].map((l) => (
                  <input
                    key={l}
                    placeholder={`Option ${l.toUpperCase()}`}
                    className='p-4 bg-gray-50 rounded-2xl ring-1 ring-gray-200 outline-none text-gray-800 font-bold'
                    value={(form as any)[l]}
                    onChange={(e) => setForm({ ...form, [l]: e.target.value })}
                  />
                ))}
              </div>
              <button
                type='submit'
                disabled={loading}
                className='w-full py-6 bg-black text-white font-black rounded-3xl hover:bg-[#002EFF] transition-all'
              >
                {loading ? 'PROCESSING...' : 'SAVE QUESTION (LOCAL)'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
