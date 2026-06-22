import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-6 px-4 mt-auto">
      <div className="max-w-md mx-auto text-center space-y-2">
        <p className="text-xs text-gray-400">みんなの健康部</p>
        <div className="flex justify-center gap-5 flex-wrap">
          <Link href="/articles" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
            健康コラム
          </Link>
          <Link href="/terms" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="text-xs text-gray-400 hover:text-green-600 transition-colors">
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  )
}
