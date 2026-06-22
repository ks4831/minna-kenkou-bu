import Link from 'next/link'

export const metadata = {
  title: 'プライバシーポリシー | みんなの健康部',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">

        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-green-600 transition-colors">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-green-800 mt-4 mb-2">プライバシーポリシー</h1>
          <p className="text-xs text-gray-400">最終更新日：2026年6月22日</p>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 p-6 space-y-6 text-sm text-gray-700 leading-relaxed">

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">1. 収集する情報</h2>
            <p>本サービスでは、以下の情報を収集します。</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>健康習慣の記録（歩く・水を飲む・ストレッチ・体重測定）</li>
              <li>取得バッジ・ポイント・継続日数などの利用状況</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">2. 利用目的</h2>
            <p>収集した情報は以下の目的にのみ使用します。</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>サービスの提供・運営</li>
              <li>ユーザーの認証・ログイン管理</li>
              <li>健康習慣の記録・継続状況の表示</li>
              <li>お問い合わせへの対応</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">3. 第三者への提供</h2>
            <p>収集した個人情報は、法令に基づく場合を除き、第三者に提供・販売・貸与することはありません。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">4. 外部サービスへの委託</h2>
            <p>本サービスは、データベースおよび認証の管理にSupabase（米国）を利用しています。Supabaseのプライバシーポリシーについては、Supabase公式サイトをご確認ください。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">5. セキュリティ</h2>
            <p>個人情報の保護のため、適切なセキュリティ対策を講じています。ただし、インターネット上の完全なセキュリティを保証するものではありません。</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-bold text-gray-800">6. お問い合わせ</h2>
            <p>個人情報の取り扱いに関するお問い合わせは、<Link href="/contact" className="text-green-600 underline">お問い合わせページ</Link>よりご連絡ください。</p>
          </section>

        </div>

        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-green-600 transition-colors">利用規約</Link>
          <Link href="/contact" className="hover:text-green-600 transition-colors">お問い合わせ</Link>
        </div>

      </div>
    </main>
  )
}
