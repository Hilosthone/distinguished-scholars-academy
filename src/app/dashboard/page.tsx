'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Zap,
  BookOpen,
  Trophy,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Search,
  GraduationCap,
  Rocket,
  Bell,
} from 'lucide-react'

// UI Components
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Page Components
import SyllabusMastery from './syllabus/page'
import ExamSimulator from './simulator/page'
import Quiz360Portal from './quiz360/page'
import GlobalRankings from './rankings/page'
import ExamSchedule from './schedule/page'
import SettingsView from './settings/page'
import OverviewUI from './OverviewUI'

type ViewState =
  | 'overview'
  | 'syllabus'
  | 'simulator'
  | 'rankings'
  | 'schedule'
  | 'settings'
  | 'quiz360'

export default function AcademyDashboard() {
  const [activeView, setActiveView] = useState<ViewState>('overview')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Centralized Navigation Config
  const navigation = [
    { icon: LayoutDashboard, label: 'Overview', view: 'overview' as ViewState },
    { icon: Zap, label: 'Syllabus Mastery', view: 'syllabus' as ViewState },
    { icon: BookOpen, label: 'Exam Simulator', view: 'simulator' as ViewState },
    { icon: Rocket, label: 'Quiz360 Pro', view: 'quiz360' as ViewState },
    { icon: Trophy, label: 'Global Rankings', view: 'rankings' as ViewState },
    { icon: Calendar, label: 'Exam Schedule', view: 'schedule' as ViewState },
    { icon: Settings, label: 'Settings', view: 'settings' as ViewState },
  ]

  const NavItem = ({
    icon: Icon,
    label,
    view,
  }: {
    icon: any
    label: string
    view: ViewState
  }) => (
    <button
      onClick={() => {
        setActiveView(view)
        setIsSheetOpen(false)
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        activeView === view
          ? 'bg-[#FCB900] text-[#002EFF] font-black shadow-lg shadow-[#FCB900]/20'
          : 'text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon
        size={18}
        className={
          activeView === view
            ? 'animate-pulse'
            : 'group-hover:scale-110 transition-transform'
        }
      />
      <span className='text-[11px] uppercase tracking-wider font-bold'>
        {label}
      </span>
    </button>
  )

  const SidebarContent = () => (
    <div className='flex flex-col h-full py-6 px-4'>
      <div className='flex items-center gap-3 mb-10 px-2'>
        <div className='bg-[#FCB900] p-1.5 rounded-lg'>
          <GraduationCap className='text-[#002EFF]' size={20} />
        </div>
        <span className='text-white font-black text-sm tracking-tighter uppercase'>
          DSA.Portal
        </span>
      </div>

      <nav className='flex-1 space-y-1'>
        {navigation.map((item) => (
          <NavItem key={item.view} {...item} />
        ))}
      </nav>

      <div className='mt-auto pt-6 border-t border-white/10'>
        <button
          onClick={() => console.log('Logout logic')}
          className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all group'
        >
          <LogOut
            size={18}
            className='group-hover:-translate-x-1 transition-transform'
          />
          <span className='text-[11px] uppercase tracking-wider font-bold'>
            <Link href='/signin'>Logout</Link>
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <div className='flex h-screen bg-[#F8FAFF] overflow-hidden font-sans selection:bg-blue-100'>
      {/* DESKTOP SIDEBAR */}
      <aside className='hidden lg:flex w-60 bg-[#002EFF] m-4 rounded-[2.5rem] flex-col shadow-2xl border border-blue-400/20'>
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className='flex-1 flex flex-col min-w-0 overflow-hidden lg:py-4 lg:pr-4'>
        {/* TOP BAR */}
        <header className='flex items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <div className='lg:hidden'>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-[#002EFF] hover:bg-blue-50'
                  >
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='left'
                  className='bg-[#002EFF] p-0 border-none w-72'
                >
                  <SheetTitle className='sr-only'>Menu Navigation</SheetTitle>
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>

            <div className='relative hidden md:block w-64 xl:w-80 group'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors'
                size={14}
              />
              <Input
                className='pl-9 bg-white border-zinc-100 rounded-xl focus-visible:ring-blue-500/20 shadow-sm'
                placeholder='Search modules...'
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              className='relative text-zinc-400 hover:text-blue-600'
            >
              <Bell size={18} />
              <span className='absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white' />
            </Button>

            <div className='flex items-center gap-3 pl-3 border-l border-zinc-200'>
              <div className='text-right hidden sm:block'>
                <p className='text-[10px] font-black text-zinc-900 leading-none'>
                  Hilosthone S.
                </p>
                <p className='text-[9px] text-zinc-400 font-bold uppercase'>
                  Pro Student
                </p>
              </div>
              <Avatar className='h-9 w-9 border-2 border-white shadow-md'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>HS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* VIEWPORT */}
        <div className='flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide'>
          <div className='max-w-[1600px] mx-auto'>
            {activeView === 'overview' && (
              <OverviewUI setView={setActiveView} />
            )}
            {activeView === 'syllabus' && <SyllabusMastery />}
            {activeView === 'simulator' && <ExamSimulator />}
            {activeView === 'quiz360' && <Quiz360Portal />}
            {activeView === 'rankings' && <GlobalRankings />}
            {activeView === 'schedule' && <ExamSchedule />}
            {activeView === 'settings' && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  )
}