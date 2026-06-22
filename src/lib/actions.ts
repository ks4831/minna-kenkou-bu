'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { BADGES, HABITS, calcLevel } from '@/types'
import { revalidatePath } from 'next/cache'

export async function saveDailyRecord(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: '未ログイン' }

  const walked = formData.get('walked') === 'on'
  const water = formData.get('water') === 'on'
  const stretch = formData.get('stretch') === 'on'
  const weight = formData.get('weight') === 'on'

  const points =
    (walked ? 10 : 0) +
    (water ? 5 : 0) +
    (stretch ? 10 : 0) +
    (weight ? 5 : 0)

  const today = new Date().toISOString().split('T')[0]

  const { error: upsertError } = await supabase
    .from('daily_records')
    .upsert(
      { user_id: user.id, date: today, walked, water, stretch, weight, points },
      { onConflict: 'user_id,date' }
    )

  if (upsertError) return { error: upsertError.message }

  await recalcUserStats(user.id)

  revalidatePath('/dashboard')
  return { success: true }
}

async function recalcUserStats(userId: string) {
  const supabase = await createClient()

  const { data: records } = await supabase
    .from('daily_records')
    .select('date, points')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (!records) return

  const totalPoints = records.reduce((sum, r) => sum + (r.points || 0), 0)
  const newLevel = calcLevel(totalPoints)
  const streakDays = calcStreak(records.map(r => r.date))

  await supabase
    .from('users')
    .update({ total_points: totalPoints, level: newLevel, streak_days: streakDays })
    .eq('id', userId)

  await checkAndAwardBadges(userId, streakDays)
}

function calcStreak(dates: string[]): number {
  if (!dates.length) return 0
  const sorted = [...dates].sort((a, b) => b.localeCompare(a))
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = (prev.getTime() - curr.getTime()) / 86400000
    if (diff === 1) {
      streak++
    } else {
      break
    }
  }
  return streak
}

async function checkAndAwardBadges(userId: string, streakDays: number) {
  const supabase = await createClient()
  const { data: existingBadges } = await supabase
    .from('badges')
    .select('badge_name')
    .eq('user_id', userId)

  const owned = new Set(existingBadges?.map(b => b.badge_name) ?? [])

  for (const badge of BADGES) {
    if (streakDays >= badge.streakRequired && !owned.has(badge.key)) {
      await supabase.from('badges').insert({
        user_id: userId,
        badge_name: badge.key,
      })
    }
  }
}

export async function signUp(formData: FormData) {
  try {
  console.log('[signup] start')
  console.log('[signup] SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/login`,
    },
  })

  console.log('[signup] authError:', authError)
  console.log('[signup] user:', authData?.user?.id ?? null)

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'ユーザー作成に失敗しました' }

  const { data: countData } = await supabase
    .from('users')
    .select('member_no')
    .order('member_no', { ascending: false })
    .limit(1)

  const nextMemberNo = countData && countData.length > 0
    ? countData[0].member_no + 1
    : 1

  const adminSupabase = createAdminClient()
  const { error: insertError } = await adminSupabase.from('users').insert({
    id: authData.user.id,
    member_no: nextMemberNo,
    name,
    email,
    level: 1,
    total_points: 0,
    streak_days: 0,
  })

  console.log('[signup] insertError:', insertError)
  const result = insertError ? { error: insertError.message } : { success: true, memberNo: nextMemberNo }
  console.log('[signup] return:', JSON.stringify(result))
  if (insertError) return { error: insertError.message }

  return { success: true, memberNo: nextMemberNo }
  } catch (e) {
    console.log('[signup] catch:', e)
    return { error: e instanceof Error ? e.message : '登録中にエラーが発生しました' }
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}
