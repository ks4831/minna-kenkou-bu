import Link from 'next/link'

export const metadata = {
  title: '利用規約 | みんなの健康部',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">

        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-green-800 mt-4 mb-2">利用規約</h1>
          <p className="text-xs text-gray-400">最終更新日：2026年6月22日</p>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 space-y-6 text-sm text-gray-700 leading-relaxed">

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第1条（サービスの概要）</h2>
            <p>みんなの健康部（以下「本サービス」）は、毎日の健康習慣を記録・継続するためのサービスです。歩く・水を飲む・ストレッチ・体重測定などの習慣を記録し、継続をサポートします。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第2条（医療行為ではないことについて）</h2>
            <p>本サービスは健康習慣の記録・管理を目的としたものであり、医療行為・医療相談・診断・治療にあたるものではありません。体調不良や疾患に関するご相談は、必ず医師または医療機関にご相談ください。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第3条（利用資格）</h2>
            <p>本サービスは、利用規約に同意した方であればどなたでもご利用いただけます。未成年の方は保護者の同意を得た上でご利用ください。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第4条（禁止事項）</h2>
            <p>以下の行為を禁止します。</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>虚偽の情報を登録する行為</li>
              <li>他のユーザーに不利益を与える行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>法令または公序良俗に反する行為</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第5条（免責事項）</h2>
            <p>本サービスの利用により生じた損害について、当運営は一切の責任を負いません。また、サービスの継続性・正確性・完全性を保証するものではありません。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">第6条（規約の変更）</h2>
            <p>本規約は予告なく変更する場合があります。変更後も本サービスをご利用いただいた場合、変更後の規約に同意したものとみなします。</p>
          </section>

        </div>

        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-green-600 transition-colors">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-green-600 transition-colors">お問い合わせ</Link>
        </div>

      </div>
    </main>
  )
}
