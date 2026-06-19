'use client'

import { signUp } from '@/lib/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success && result.memberNo) {
      setSuccess(result.memberNo)
    }
  }

  if (success) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold text-green-800">入部完了！</h1>
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 space-y-4">
            <p className="text-gray-600 text-lg">あなたの部員番号は</p>
            <p className="text-5xl font-bold text-green-700">
              部員No.{String(success).padStart(3, '0')}
            </p>
            <p className="text-gray-500">
              メールアドレスの確認メールを送りました。<br />
              確認後、ログインしてください。
            </p>
          </div>
          <Link
            href="/login"
            className="block w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-md transition-colors"
          >
            ログインする
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="text-3xl font-bold text-green-800">
            みんなの健康部
          </Link>
          <p className="text-gray-600 text-lg">新規入部申請</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-lg" htmlFor="name">
                お名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="山田 太郎"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

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
                minLength={6}
                placeholder="6文字以上"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xl font-bold py-4 rounded-2xl shadow-md transition-colors"
            >
              {loading ? '入部申請中...' : '入部する'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600">
          すでに部員の方は{' '}
          <Link href="/login" className="text-green-700 font-medium underline">
            ログイン
          </Link>
        </p>
      </div>
    </main>
  )
}
