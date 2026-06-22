'use client'

import { signIn } from '@/lib/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    if (result.error) {
      setError(
        result.error.includes('Email not confirmed')
          ? 'メール確認が完了していません。\n届いたメールのリンクをタップしてからログインしてください。'
          : 'メールアドレスかパスワードが正しくありません'
      )
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="text-3xl font-bold text-green-800">
            みんなの健康部
          </Link>
          <p className="text-gray-600 text-lg">ログイン</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-lg" htmlFor="email">
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-lg" htmlFor="password">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="パスワード"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 whitespace-pre-line">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xl font-bold py-4 rounded-2xl shadow-md transition-colors"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600">
          まだ部員でない方は{' '}
          <Link href="/signup" className="text-green-700 font-medium underline">
            入部する
          </Link>
        </p>
      </div>
    </main>
  )
}
