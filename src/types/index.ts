export type User = {
  id: string
  member_no: number
  name: string
  email: string
  level: number
  total_points: number
  streak_days: number
  created_at: string
}

export type DailyRecord = {
  id: string
  user_id: string
  date: string
  walked: boolean
  water: boolean
  stretch: boolean
  weight: boolean
  points: number
}

export type Badge = {
  id: string
  user_id: string
  badge_name: string
  acquired_at: string
}

export const HABITS = [
  { key: 'walked', label: '歩く', points: 10, icon: '🚶' },
  { key: 'water', label: '水を飲む', points: 5, icon: '💧' },
  { key: 'stretch', label: 'ストレッチ', points: 10, icon: '🤸' },
  { key: 'weight', label: '体重測定', points: 5, icon: '⚖️' },
] as const

export const LEVELS = [
  { level: 1, minPoints: 0, label: 'Lv1' },
  { level: 2, minPoints: 100, label: 'Lv2' },
  { level: 3, minPoints: 300, label: 'Lv3' },
  { level: 4, minPoints: 600, label: 'Lv4' },
  { level: 5, minPoints: 1000, label: 'Lv5' },
]

export const BADGES = [
  { key: '3day', streakRequired: 3, label: '三日坊主卒業', emoji: '🌱' },
  { key: '7day', streakRequired: 7, label: '新人部員', emoji: '⭐' },
  { key: '30day', streakRequired: 30, label: '正式部員', emoji: '🎖️' },
  { key: '100day', streakRequired: 100, label: '優秀部員', emoji: '🏆' },
  { key: '365day', streakRequired: 365, label: 'レジェンド部員', emoji: '👑' },
]

export function calcLevel(totalPoints: number): number {
  const sortedLevels = [...LEVELS].reverse()
  for (const l of sortedLevels) {
    if (totalPoints >= l.minPoints) return l.level
  }
  return 1
}
