import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata = {
  title: '健康コラム | みんなの健康部',
}

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
      <div className="max-w-md mx-auto space-y-6">

        <div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← ダッシュボードに戻る
          </Link>
          <h1 className="text-2xl font-bold text-green-800 mt-4 mb-1">健康コラム</h1>
          <p className="text-sm text-gray-500">健康習慣を続けるためのヒント</p>
        </div>

        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-white rounded-2xl border border-green-100 p-5 hover:border-green-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-0.5">{article.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-800 leading-snug">{article.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{article.summary}</p>
                  <p className="text-xs text-gray-300 mt-2">{article.date}</p>
                </div>
                <span className="text-gray-300 text-lg mt-0.5">›</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
