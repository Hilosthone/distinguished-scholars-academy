'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
Camera,
  User,
  Target,
  Bell,
  ShieldCheck,
  ChevronLeft,
  Check,
  Smartphone,
  Mail,
  Lock,
  EyeOff,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6 p-4 md:p-8 bg-[#FAFBFF] min-h-screen pb-20'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard'
            className='p-2 bg-white rounded-xl border border-gray-100 hover:shadow-sm'
          >
            <ChevronLeft size={16} className='text-gray-600' />
          </Link>
          <h1 className='text-xl font-black text-zinc-900 tracking-tight'>
            Settings
          </h1>
        </div>
        <Button
          onClick={handleSave}
          size='sm'
          className={`h-9 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${saved ? 'bg-emerald-500' : 'bg-[#002EFF]'}`}
        >
          {saved ? <Check size={14} className='mr-2' /> : null}
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {/* Sidebar Navigation */}
        <div className='md:col-span-4 space-y-2'>
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'goals', icon: Target, label: 'Academic Goals' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'security', icon: ShieldCheck, label: 'Privacy & Security' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeTab === item.id
                  ? 'bg-white shadow-sm border border-gray-100 text-[#002EFF]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={18} />
              <span className='text-xs font-bold uppercase tracking-wider'>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className='md:col-span-8'>
          {activeTab === 'goals' && <AcademicGoals />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'profile' && <ProfileSettings />}
        </div>
      </div>
    </div>
  )
}

/* --- SUB-COMPONENTS --- */

function AcademicGoals() {
  return (
    <Card className='p-6 border-none shadow-sm rounded-3xl bg-white space-y-6'>
      <div>
        <h3 className='font-black text-zinc-900 text-sm uppercase tracking-tight'>
          Target Percentages
        </h3>
        <p className='text-[10px] text-gray-400 font-medium'>
          These affect your dashboard progress rings.
        </p>
      </div>
      {['Biology', 'Physics', 'Chemistry', 'Mathematics'].map((subject) => (
        <div key={subject} className='space-y-3'>
          <div className='flex justify-between text-[10px] font-black uppercase'>
            <span>{subject}</span>
            <span className='text-[#002EFF]'>85%</span>
          </div>
          <input
            type='range'
            className='w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#002EFF]'
          />
        </div>
      ))}
    </Card>
  )
}

function NotificationSettings() {
  return (
    <Card className='p-6 border-none shadow-sm rounded-3xl bg-white space-y-4'>
      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-2xl'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-white rounded-xl shadow-sm'>
            <Mail size={16} className='text-blue-500' />
          </div>
          <div>
            <p className='text-[10px] font-black uppercase'>Email Reports</p>
            <p className='text-[9px] text-gray-400'>
              Weekly performance summary
            </p>
          </div>
        </div>
        <div className='w-8 h-4 bg-blue-600 rounded-full relative'>
          <div className='absolute right-1 top-1 w-2 h-2 bg-white rounded-full' />
        </div>
      </div>
      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-2xl'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-white rounded-xl shadow-sm'>
            <Smartphone size={16} className='text-emerald-500' />
          </div>
          <div>
            <p className='text-[10px] font-black uppercase'>
              Push Notifications
            </p>
            <p className='text-[9px] text-gray-400'>Daily streak reminders</p>
          </div>
        </div>
        <div className='w-8 h-4 bg-gray-200 rounded-full relative'>
          <div className='absolute left-1 top-1 w-2 h-2 bg-white rounded-full' />
        </div>
      </div>
    </Card>
  )
}

function SecuritySettings() {
  return (
    <Card className='p-6 border-none shadow-sm rounded-3xl bg-white space-y-6'>
      <div className='space-y-4'>
        <button className='w-full flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all'>
          <div className='flex items-center gap-3'>
            <Lock size={16} className='text-zinc-400' />
            <span className='text-[10px] font-black uppercase'>
              Change Password
            </span>
          </div>
          <ChevronLeft size={14} className='rotate-180 text-gray-300' />
        </button>
        <button className='w-full flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all'>
          <div className='flex items-center gap-3'>
            <EyeOff size={16} className='text-zinc-400' />
            <span className='text-[10px] font-black uppercase'>
              Privacy Mode
            </span>
          </div>
          <div className='w-8 h-4 bg-gray-200 rounded-full' />
        </button>
      </div>
      <hr className='border-gray-50' />
      <button className='flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors'>
        <Trash2 size={14} />
        <span className='text-[10px] font-black uppercase tracking-widest'>
          Delete Account
        </span>
      </button>
    </Card>
  )
}

function ProfileSettings() {
  return (
    <Card className='p-6 border-none shadow-sm rounded-3xl bg-white animate-in fade-in slide-in-from-bottom-2 duration-300'>
      <div className='space-y-8'>
        {/* Profile Picture Upload */}
        <div className='flex items-center gap-6'>
          <div className='relative group cursor-pointer'>
            <div className='w-20 h-20 rounded-3xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center text-[#002EFF] overflow-hidden transition-all group-hover:border-[#002EFF]'>
              <User size={32} />
              {/* This would be an <img /> if a photo existed */}
            </div>
            <div className='absolute inset-0 bg-zinc-900/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]'>
              <Camera size={20} className='text-white' />
            </div>
          </div>
          <div>
            <h3 className='font-black text-zinc-900 text-sm uppercase tracking-tight'>
              Profile Avatar
            </h3>
            <p className='text-[10px] text-gray-400 font-medium mt-1 leading-relaxed'>
              PNG or JPG. Max 2MB. <br />
              This will appear on your certificates.
            </p>
            <div className='flex gap-4 mt-3'>
              <button className='text-[10px] font-black text-[#002EFF] uppercase tracking-widest hover:text-blue-700 transition-colors'>
                Upload New
              </button>
              <button className='text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors'>
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='space-y-2'>
            <label className='text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1'>
              Display Name
            </label>
            <input
              type='text'
              defaultValue='Hilosthone A.'
              placeholder='Enter your name'
              className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-zinc-900 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all placeholder:text-gray-300'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1'>
              Academic Level
            </label>
            <div className='relative'>
              <select className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-zinc-900 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100'>
                <option>University / Final Year</option>
                <option>Senior Secondary (SS3)</option>
                <option>Senior Secondary (SS2)</option>
                <option>Post-Graduate</option>
              </select>
              <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                <ChevronLeft
                  size={12}
                  className='rotate-270 text-gray-400'
                />
              </div>
            </div>
          </div>

          <div className='md:col-span-2 space-y-2'>
            <label className='text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1'>
              Academic Bio
            </label>
            <textarea
              rows={4}
              placeholder='e.g. Aspiring Surgeon | Mastering Biochemistry...'
              className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-xs font-bold text-zinc-900 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-300'
            />
            <div className='flex justify-end'>
              <span className='text-[8px] font-bold text-gray-300 uppercase tracking-tighter'>
                0 / 120 Characters
              </span>
            </div>
          </div>
        </div>

        {/* Verification Badge (Extra Detail) */}
        <div className='p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-white rounded-xl text-blue-600 shadow-sm'>
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className='text-[10px] font-black uppercase text-zinc-900'>
                Verified Student Status
              </p>
              <p className='text-[9px] text-blue-600/70 font-bold'>
                Your account is eligible for official rankings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}