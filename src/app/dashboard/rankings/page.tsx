// src/app/dashboard/rankings/page.tsx
'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function GlobalRankings() {
  const ranks = [
    { name: 'Adebayo T.', score: 342, school: 'UNILAG', avatar: '1' },
    { name: 'Hilosthone', score: 328, school: 'UI', avatar: '2', me: true },
    { name: 'Sarah J.', score: 315, school: 'OAU', avatar: '3' },
  ]

  return (
    <div className='space-y-6 animate-in zoom-in-95 duration-500 max-w-4xl mx-auto'>
      <Card className='bg-[#002EFF] text-white p-8 rounded-4xl text-center relative overflow-hidden'>
        <Trophy className='absolute -left-4 -top-4 text-white/10' size={120} />
        <h2 className='text-2xl font-black italic mb-2 uppercase'>
          Global Ranking: #12
        </h2>
        <p className='text-blue-100 text-xs font-bold'>
          You are in the top 1% of candidates!
        </p>
      </Card>

      <div className='bg-white rounded-4xl shadow-sm border border-blue-50 overflow-hidden'>
        {ranks.map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-4 border-b last:border-none ${r.me ? 'bg-blue-50/50' : ''}`}
          >
            <div className='flex items-center gap-4'>
              <span className='font-black text-gray-400 w-6'>#{i + 1}</span>
              <Avatar className='h-10 w-10 border-2 border-white'>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}`}
                />
              </Avatar>
              <div>
                <p className='text-xs font-black text-gray-800 uppercase'>
                  {r.name}{' '}
                  {r.me && (
                    <Badge className='ml-2 bg-[#FCB900] text-[#002EFF]'>
                      YOU
                    </Badge>
                  )}
                </p>
                <p className='text-[10px] font-bold text-gray-400'>
                  {r.school}
                </p>
              </div>
            </div>
            <p className='text-sm font-black text-[#002EFF]'>{r.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
