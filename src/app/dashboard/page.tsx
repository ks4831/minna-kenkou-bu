import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BADGES, HABITS, LEVELS } from '@/types'
import type { User, DailyRecord, Badge } from '@/types'
import HabitForm from './HabitForm'
import SignOutButton from './SignOutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  if (!authUser) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()

  const today = new Date().toISOString().split('T')[0]

  const { data: todayRecord } = await supabase
    .from('daily_records')
    .select('*')
    .eq('user_id', authUser.id)
    .eq('date', today)
    .single()

  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', authUser.id)

  const { count: memberCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const user = userData as User | null
  const record = todayRecord as DailyRecord | null
  const ownedBadges = new Set((badges as Badge[] | null)?.map(b => b.badge_name) ?? [])

  const totalPoints = user?.total_points ?? 0
  const streakDays = user?.streak_days ?? 0
  const level = user?.level ?? 1
  const memberNo = user?.member_no ?? 0

  const nextLevel = LEVELS.find(l => l.level === level + 1)
  const progressToNext = nextLevel
    ? Math.min(100, Math.round((totalPoints / nextLevel.minPoints) * 100))
    : 100

  const todayPoints = record?.points ?? 0
  const achievementRate = Math.round((todayPoints / 30) * 100)

  const todayHabits = {
    walked: record?.walked ?? false,
    water: record?.water ?? false,
    stretch: record?.stretch ?? false,
    weight: record?.weight ?? false,
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-800">みんなの健康部</h1>
            <p className="text-green-600 text-sm">部員No.{String(memberNo).padStart(3, '0')}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 text-center">
            <p className="text-gray-500 text-xs mb-1">継続日数</p>
            <p className="text-2xl font-bold text-green-700">{streakDays}</p>
            <p className="text-gray-500 text-xs">日</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 text-center">
            <p className="text-gray-500 text-xs mb-1">健康レベル</p>
            <p className="text-2xl font-bold text-green-700">レベル{level}</p>
            <div className="mt-1 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-green-500 rounded-full h-1.5 transition-all"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 text-center">
            <p className="text-gray-500 text-xs mb-1">総ポイント</p>
            <p className="text-2xl font-bold text-green-700">{totalPoints}</p>
            <p className="text-gray-500 text-xs">ポイント</p>
          </div>
        </div>

        {/* Today's habits form */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">今日の健康習慣</h2>
          <HabitForm initialHabits={todayHabits} />
        </div>

        {/* Achievement rate */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3">今日の達成率</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#16a34a" strokeWidth="3"
                  strokeDasharray={`${achievementRate} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-green-700">{achievementRate}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">本日 <span className="font-bold text-green-700">{todayPoints}ポイント</span> 獲得</p>
              <p className="text-gray-400 text-xs mt-1">最大 30ポイント / 日</p>
            </div>
          </div>
        </div>

        {/* Member count & message */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 text-center">
            <p className="text-gray-500 text-sm mb-1">全国部員数</p>
            <p className="text-3xl font-bold text-green-700">{memberCount ?? 0}</p>
            <p className="text-gray-500 text-xs">名</p>
          </div>
          <div className="bg-green-50 rounded-2xl border border-green-200 p-4 flex flex-col justify-center">
            <p className="text-green-700 text-xs font-medium mb-1">部長からの一言</p>
            <p className="text-green-800 text-sm font-medium leading-relaxed">
              今日も無理なく続けましょう
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">バッジ</h2>
          {ownedBadges.size === 0 && (
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              3日連続で記録すると、最初のバッジ「三日坊主卒業」がもらえます。
            </p>
          )}
          <div className="space-y-3">
            {BADGES.map((badge) => {
              const owned = ownedBadges.has(badge.key)
              return (
                <div
                  key={badge.key}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                    owned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <span className={`text-2xl ${!owned && 'grayscale opacity-40'}`}>
                    {badge.emoji}
                  </span>
                  <div className="flex-1">
                    <p className={`font-medium ${owned ? 'text-green-800' : 'text-gray-400'}`}>
                      {badge.label}
                    </p>
                    <p className="text-xs text-gray-400">{badge.streakRequired}日継続</p>
                  </div>
                  {owned && (
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                      獲得済み
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
