import Link from 'next/link'

export const metadata = {
  title: 'お問い合わせ | みんなの健康部',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
      <div className="max-w-md mx-auto space-y-8">

        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-green-800 mt-4 mb-2">お問い合わせ</h1>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 space-y-5 text-sm text-gray-700 leading-relaxed">
          <p>
            ご意見・ご要望・不具合のご報告など、お気軽にメールでお問い合わせください。
          </p>

          <div className="bg-green-50 rounded-xl px-5 py-4 space-y-1">
            <p className="text-xs text-gray-500 font-medium">お問い合わせ先</p>
            <a
              href="mailto:kazuki4831@gmail.com"
              className="text-green-700 font-medium hover:underline break-all"
            >
              kazuki4831@gmail.com
            </a>
          </div>

          <p className="text-xs text-gray-400">
            ※ お返事までに数日かかる場合があります。あらかじめご了承ください。
          </p>
        </div>

        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-green-600 transition-colors">利用規約</Link>
          <Link href="/privacy" className="hover:text-green-600 transition-colors">プライバシーポリシー</Link>
        </div>

      </div>
    </main>
  )
}
