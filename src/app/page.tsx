import Link from "next/link";

export default function TopPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="text-4xl font-bold text-green-800 tracking-wide">
            みんなの健康部
          </h1>
          <p className="text-xl text-green-600 font-medium">
            みんなで続ける健康習慣
          </p>
          <p className="text-base text-gray-500 italic">
            健康の本質は継続である
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 text-left space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            健康になりたい人のための<br />
            健康習慣プラットフォームです。
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { icon: '🚶', label: '歩く' },
              { icon: '💧', label: '水を飲む' },
              { icon: '🤸', label: 'ストレッチ' },
              { icon: '⚖️', label: '体重を測る' },
            ].map((habit) => (
              <div
                key={habit.label}
                className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3"
              >
                <span className="text-2xl">{habit.icon}</span>
                <span className="text-gray-700 font-medium">{habit.label}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center mt-2 leading-relaxed">
            毎日の小さな習慣を<br />
            みんなで続けていきましょう。
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/signup"
            className="block w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-md transition-colors"
          >
            入部する
          </Link>
          <Link
            href="/login"
            className="block w-full bg-white hover:bg-gray-50 text-green-700 text-lg font-medium py-3 px-8 rounded-2xl border-2 border-green-200 transition-colors"
          >
            ログイン
          </Link>
        </div>
      </div>
    </main>
  );
}
