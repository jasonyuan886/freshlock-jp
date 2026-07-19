import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'FreshLockのプライバシーポリシー。個人情報の収集・利用・保護方法についてご説明します。APPI・GDPR準拠。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">プライバシーポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. はじめに</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock Japan（以下「当社」といいます）は、お客様のプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーは、当社ウェブサイトのご利用およびご購入に際して、当社がどのように情報を収集・利用・保護するかを説明するものです。
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              当社は、日本の個人情報保護法（APPI）およびGDPR（EU域内のお客様向け）を遵守いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 収集する情報</h2>
            <p className="text-gray-600 leading-relaxed mb-3">当社は以下の情報を収集する場合があります：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>個人情報：</strong>お名前、メールアドレス、電話番号、配送先住所、請求先住所</li>
              <li><strong>決済情報：</strong>クレジットカード情報またはPayPalアカウント情報（決済代行業者により安全に処理されます）</li>
              <li><strong>ご注文情報：</strong>購入履歴、注文内容、ご利用の設定</li>
              <li><strong>技術情報：</strong>IPアドレス、ブラウザの種類、端末情報、Cookie</li>
              <li><strong>通信情報：</strong>当社とのメール・チャット等のやり取り</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. 情報の利用目的</h2>
            <p className="text-gray-600 leading-relaxed mb-3">収集した情報は以下の目的で利用いたします：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>ご注文の処理・発送</li>
              <li>注文確認メール・配送状況のご連絡</li>
              <li>カスタマーサポートのご提供</li>
              <li>マーケティング情報のご案内（お客様の同意がある場合）</li>
              <li>ウェブサイト・サービスの改善</li>
              <li>法令上の義務の遵守</li>
              <li>不正行為の防止とセキュリティ確保</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. 情報の第三者提供</h2>
            <p className="text-gray-600 leading-relaxed">
              当社は、お客様の個人情報を販売することはありません。ただし、以下の場合に限り情報を共有することがあります：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-3">
              <li><strong>サービス提供事業者：</strong>決済代行業者（Stripe、PayPal）、配送業者、ITサービス提供者など、業務遂行に必要な範囲内</li>
              <li><strong>法令に基づく場合：</strong>法的義務または権利保護のために必要な場合</li>
              <li><strong>事業譲渡：</strong>合併・買収・事業譲渡に伴う場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. Cookieについて</h2>
            <p className="text-gray-600 leading-relaxed">
              当ウェブサイトでは、ショッピングカート機能やサイト利用状況の分析のためにCookieを使用しています。ブラウザの設定でCookieを無効にすることができますが、一部機能がご利用いただけなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 情報セキュリティ</h2>
            <p className="text-gray-600 leading-relaxed">
              当社はSSL暗号化通信を採用し、お客様の個人情報を安全に保護するための適切な技術的・組織的措置を講じています。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. お客様の権利</h2>
            <p className="text-gray-600 leading-relaxed mb-3">お客様は以下の権利を有します：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>個人情報へのアクセス・訂正・削除の請求</li>
              <li>利用停止の請求</li>
              <li>データポータビリティ権</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              これらのご請求は、お問い合わせページよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. お問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、support@freshlocksealer.com までご連絡ください。
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8 pt-6 border-t">
            最終更新日：{new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}
