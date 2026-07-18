import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold">FreshLock</span>
            </div>
            <p className="text-gray-300 text-sm">
              日本の食卓に、もっと長い鮮度を。話題のハンディ真空保存機「FreshLock」公式サイト。
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">ショップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition">
                  全製品
                </Link>
              </li>
              <li>
                <Link href="/products?category=devices" className="text-gray-300 hover:text-white transition">
                  真空ポンプ本体
                </Link>
              </li>
              <li>
                <Link href="/products?category=bags" className="text-gray-300 hover:text-white transition">
                  真空チャック袋
                </Link>
              </li>
              <li>
                <Link href="/products?category=kits" className="text-gray-300 hover:text-white transition">
                  セット・キット
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition">
                  返品・交換について
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition">
                  配送について
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">法的情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  会社情報
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} FreshLock. All rights reserved.</p>
            <p className="mt-2 md:mt-0">日本へ国際配送・30日間返品保証</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
