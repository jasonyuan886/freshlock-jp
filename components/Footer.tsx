import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust strip */}
        <div className="border-b border-gray-700 pb-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-lg">🚚</span>
              <div>
                <div className="font-semibold">¥5,500以上送料無料</div>
                <div className="text-gray-300 text-xs">全国一律¥600（沖縄・離島別途）</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🔄</span>
              <div>
                <div className="font-semibold">30日間返品保証</div>
                <div className="text-gray-300 text-xs">未使用品は全額返金</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🛡️</span>
              <div>
                <div className="font-semibold">本体1年保証</div>
                <div className="text-gray-300 text-xs">付属品6ヶ月</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🔒</span>
              <div>
                <div className="font-semibold">SSL暗号化</div>
                <div className="text-gray-300 text-xs">安心・安全な決済</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo-icon.png" alt="FreshLock" width={32} height={36} className="w-8 h-9" />
              <span className="text-xl font-bold">FreshLock</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              片手でワンタッチのコードレス式ハンディ真空ポンプ。作り置き・離乳食・小分け冷凍・冷凍焼け防止に。
            </p>
            <p className="text-gray-300 text-sm">
              📧 <a href="mailto:jp-support@freshlocksealer.com" className="hover:text-white underline">jp-support@freshlocksealer.com</a>
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">ショップ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition">全製品</Link></li>
              <li><Link href="/products/freshlock-pro" className="text-gray-300 hover:text-white transition">FreshLock Pro 本体</Link></li>
              <li><Link href="/products/freshlock-starter-kit" className="text-gray-300 hover:text-white transition">スターターキット</Link></li>
              <li><Link href="/products?category=bags" className="text-gray-300 hover:text-white transition">プレミアムエンボスバッグ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition">ブログ</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition">よくある質問</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">お問い合わせ</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition">返品・交換</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition">配送・送料</Link></li>
            </ul>
          </div>

          {/* Legal + Tokutei */}
          <div>
            <h3 className="font-semibold mb-4">法的情報・特定商取法</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition">利用規約</Link></li>
              <li><Link href="/about#tokutei" className="text-gray-300 hover:text-white transition">特定商取引法に基づく表記</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">会社情報</Link></li>
            </ul>
          </div>
        </div>

        {/* Payments + compliance badges */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs text-gray-400">お支払い方法</div>
                <span className="text-xs text-blue-300">🛡️ PayPal買い手保護</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['PayPal', 'Visa', 'Mastercard', 'American Express', 'JCB'].map((p) => (
                  <span
                    key={p}
                    className={
                      p === 'PayPal'
                        ? 'bg-[#ffc439] text-[#003087] text-xs px-3 py-1.5 rounded font-bold border border-[#ffc439]'
                        : 'bg-white/10 text-white text-xs px-3 py-1.5 rounded border border-white/20'
                    }
                  >{p}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2">安心・品質</div>
              <div className="flex flex-wrap gap-2">
                {['BPAフリー', 'PSE対象外', 'FCC', 'CE', 'RoHS', 'SSL'].map((b) => (
                  <span key={b} className="bg-white/10 text-white text-xs px-2 py-1 rounded">{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* PSE声明 */}
          <div className="bg-white/5 rounded-lg p-4 text-xs text-gray-300 mb-6">
            <p className="mb-1">⚡ PSEについて：本製品はリチウムイオン充電池（4.44Wh）を内蔵しており、電気用品安全法（PSE法）の対象外製品です。USB-Cケーブルは同梱のもの、または市販の定格5VのUSB充電器をご使用ください。</p>
          </div>

          {/* Tokutei short info */}
          <div className="bg-white/5 rounded-lg p-4 text-xs text-gray-300 space-y-1">
            <p className="font-semibold text-white mb-2">特定商取引法に基づく表記（概要）</p>
            <p>販売業者：深圳市七力科技有限公司（Shichiri Technology Co., Ltd.）</p>
            <p>運営責任者：カスタマーサポート</p>
            <p>所在地：中国広東省深セン市（日本国内に住所・電話番号はございません。お問い合わせはメールにて jp-support@freshlocksealer.com へお願いいたします。）</p>
            <p>支払方法：PayPal（Visa/Mastercard/Amex/JCBはPayPal経由でご利用いただけます）</p>
            <p>商品代金以外の必要料金：送料（全国一律¥600／¥5,500以上で無料）、沖縄・離島は別途お見積もり</p>
            <p>引渡時期：ご注文確定後1〜2営業日以内に発送、国際郵便（ヤマト提携）にて5〜10営業日でお届け</p>
            <p>返品・交換：商品到着後30日間の返品保証。初期不良・破損は送料当社負担で交換。<Link href="/about#tokutei" className="underline hover:text-white">詳しくはこちら</Link></p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} FreshLock / Shichiri Technology Co., Ltd. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-2 md:mt-0">日本への国際配送・30日間返品保証・本体1年保証</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
