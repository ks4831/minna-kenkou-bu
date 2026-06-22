import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, getArticle } from '@/lib/articles'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return { title: `${article.title} | 健康コラム | みんなの健康部` }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
      <div className="max-w-md mx-auto space-y-6">

        <div>
          <Link href="/articles" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← コラム一覧に戻る
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-4xl">{article.emoji}</span>
            <h1 className="text-xl font-bold text-green-800 leading-snug">{article.title}</h1>
          </div>
          <p className="text-xs text-gray-400 mt-2">{article.date}</p>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <p className="text-gray-500 italic">{article.summary}</p>

          <hr className="border-green-100" />

          {article.sections.map((section, i) => (
            <div key={i} className="space-y-2">
              {section.heading && (
                <h2 className="font-bold text-gray-800 text-base">{section.heading}</h2>
              )}
              <p>{section.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            今日の記録をつける
          </Link>
        </div>

      </div>
    </main>
  )
}
