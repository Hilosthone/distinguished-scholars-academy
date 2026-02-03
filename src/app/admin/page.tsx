'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Database,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Activity,
  Megaphone,
  Trophy,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  Bell,
  GraduationCap,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'

// --- FEATURE IMPORTS ---
import SuperDashboard from './components/SuperDashboard'
import QuestionBank from './components/QuestionBank'
import ExamBuilder from './components/ExamBuilder'
import Analytics from './components/Analytics'
import StudentManagement from './components/StudentManagement'
import LiveMonitoring from './components/LiveMonitoring'
import Announcements from './components/Announcements'
import Leaderboard from './components/Leaderboard'
import RevenueControls from './components/RevenueControls'
import RolesPermissions from './components/RolesPermissions'
import Settings from './components/Settings'

export default function AdminNexus() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarGroups = [
    {
      group: 'Management',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'questions', label: 'Question Bank', icon: Database },
        { id: 'exams', label: 'Exam Builder', icon: BookOpen },
      ],
    },
    {
      group: 'Operations',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
      ],
    },
    {
      group: 'Finance & Engagement',
      items: [
        { id: 'broadcast', label: 'Announcements', icon: Megaphone },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'revenue', label: 'Revenue', icon: CreditCard },
      ],
    },
    {
      group: 'System',
      items: [
        { id: 'roles', label: 'Permissions', icon: ShieldCheck },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
      ],
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SuperDashboard />
      case 'questions':
        return <QuestionBank />
      case 'exams':
        return <ExamBuilder />
      case 'analytics':
        return <Analytics />
      case 'students':
        return <StudentManagement />
      case 'monitoring':
        return <LiveMonitoring />
      case 'broadcast':
        return <Announcements />
      case 'leaderboard':
        return <Leaderboard />
      case 'revenue':
        return <RevenueControls />
      case 'roles':
        return <RolesPermissions />
      case 'settings':
        return <Settings />
      default:
        return <Error404 tabId={activeTab} />
    }
  }

  return (
    <div className='flex h-screen bg-[#F9FAFB] overflow-hidden font-sans text-slate-900 antialiased'>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className='fixed inset-0 bg-blue-900/20 backdrop-blur-xs z-40 lg:hidden'
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Original Blue Brand + Compact Layout */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-blue-600 text-white flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='h-14 flex items-center px-5 border-b border-white/10 gap-2.5 shrink-0'>
          <div className='w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center border border-white/20 shadow-inner'>
            <GraduationCap size={16} className='text-white' />
          </div>
          <span className='font-bold text-base tracking-tight'>
            DSA.<span className='text-blue-200'>Admin</span>
          </span>
        </div>

        <div className='flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-hide'>
          {sidebarGroups.map((group, idx) => (
            <div key={idx} className='space-y-1'>
              <h3 className='px-3 text-[9px] font-bold uppercase tracking-[0.15em] text-blue-200/50'>
                {group.group}
              </h3>
              <div className='space-y-0.5'>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-white text-blue-600 shadow-md shadow-blue-900/20'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon
                      size={14}
                      className={
                        activeTab === item.id ? 'opacity-100' : 'opacity-60'
                      }
                    />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='p-3 border-t border-white/10'>
          <button className='w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-bold text-rose-100 hover:bg-rose-500 hover:text-white transition-all group'>
            <LogOut
              size={14}
              className='group-hover:-translate-x-0.5 transition-transform'
            />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <header className='h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='lg:hidden p-1.5 text-slate-500 hover:bg-slate-50 rounded-md border border-slate-200'
            >
              <Menu size={16} />
            </button>
            <div className='flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
              <span className='hidden sm:inline'>Portal</span>
              <ChevronRight
                size={10}
                className='mx-1.5 text-slate-300 hidden sm:inline'
              />
              <span className='text-blue-600'>{activeTab}</span>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button className='p-1.5 text-slate-400 hover:text-blue-600 transition-colors relative'>
              <Bell size={16} />
              <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white' />
            </button>

            <div className='flex items-center gap-2.5 pl-4 border-l border-slate-100'>
              <div className='text-right hidden sm:block'>
                <p className='text-[11px] font-bold text-slate-900 leading-none'>
                  Hilosthone
                </p>
                <p className='text-[9px] font-bold text-blue-600 mt-0.5'>
                  Super Admin
                </p>
              </div>
              <div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm'>
                AD
              </div>
            </div>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto bg-[#F8FAFC]'>
          <div className='p-4 lg:p-6'>
            <div className='max-w-7xl mx-auto'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Error404({ tabId }: { tabId: string }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[40vh] text-center'>
      <div className='w-10 h-10 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center mb-3 border border-rose-100'>
        <AlertTriangle size={18} />
      </div>
      <h2 className='text-xs font-bold text-slate-900 uppercase'>
        Component Not Loaded
      </h2>
      <p className='text-[10px] text-slate-500 mt-1'>
        Check if `components/{tabId}.tsx` is exported correctly.
      </p>
    </div>
  )
}
