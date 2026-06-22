'use client'

import { saveDailyRecord } from '@/lib/actions'
import { HABITS } from '@/types'
import { useState, useTransition } from 'react'

type Props = {
  initialHabits: {
    walked: boolean
    water: boolean
    stretch: boolean
    weight: boolean
  }
}

export default function HabitForm({ initialHabits }: Props) {
  const [habits, setHabits] = useState(initialHabits)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function toggle(key: string) {
    setHabits(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
    setSaved(false)
    setSaveError(null)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await saveDailyRecord(formData)
      if (result?.error) {
        setSaveError(result.error)
        setSaved(false)
      } else {
        setSaved(true)
        setSaveError(null)
      }
    })
  }

  const todayPoints = HABITS.reduce(
    (sum, h) => sum + (habits[h.key as keyof typeof habits] ? h.points : 0),
    0
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {HABITS.map((habit) => {
        const checked = habits[habit.key as keyof typeof habits]
        return (
          <label
            key={habit.key}
            className={`flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer border-2 transition-all select-none ${
              checked
                ? 'bg-green-50 border-green-400'
                : 'bg-white border-gray-100 hover:border-green-200'
            }`}
          >
            <input
              type="checkbox"
              name={habit.key}
              checked={checked}
              onChange={() => toggle(habit.key)}
              className="sr-only"
            />
            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {checked && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-2xl">{habit.icon}</span>
            <span className={`flex-1 text-lg font-medium ${checked ? 'text-green-800' : 'text-gray-700'}`}>
              {habit.label}
            </span>
            <span className={`text-sm font-medium ${checked ? 'text-green-600' : 'text-gray-400'}`}>
              +{habit.points}pt
            </span>
          </label>
        )
      })}

      <div className="flex items-center justify-between pt-2">
        <span className="text-gray-600 text-sm">
          本日獲得予定: <span className="font-bold text-green-700 text-lg">{todayPoints}pt</span>
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition-colors text-base"
        >
          {isPending ? '保存中...' : '保存する'}
        </button>
      </div>

      {saved && (
        <p className="text-center text-green-600 font-medium text-sm bg-green-50 rounded-xl py-2">
          ✓ 今日の記録を保存しました
        </p>
      )}
      {saveError && (
        <p className="text-center text-red-600 font-medium text-sm bg-red-50 rounded-xl py-2">
          保存に失敗しました: {saveError}
        </p>
      )}
    </form>
  )
}
