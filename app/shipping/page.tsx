import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '配送ポリシー | FreshLock Japan',
  description: 'FreshLockの配送ポリシー。ハンディ真空パック機・真空パック袋のお届け日数・送料・配送エリアについて。',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">配送ポリシー</h1>
        <p className="section-subtitle">
          お届け日数・送料・配送エリアについてご案内いたします。
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>配送元について</h2>
        <p>FreshLock Japanは越境DTC（Direct-to-Consumer）ブランドです。ご注文いただいた商品は、アジアの提携物流センターから国際航空便（追跡あり）で日本へ直送いたします。価格は日本のお客様の利便性のため日本円（税込）表示となっております。</p>

        <h2>ご注文の処理</h2>
        <p>ご注文は土日祝日を除く1〜2営業日以内に発送手配いたします。日本時間14時以降のご注文は翌営業日の処理となります。</p>

        <h2>配送方法・お届け日数</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">配送種別</th>
                <th className="border border-gray-300 px-4 py-2 text-left">お届け日数（発送後）</th>
                <th className="border border-gray-300 px-4 py-2 text-left">送料</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">国際通常配送（追跡あり）</td>
                <td className="border border-gray-300 px-4 py-2">5〜12営業日</td>
                <td className="border border-gray-300 px-4 py-2">8,000円以上で送料無料<br />8,000円未満は全国一律680円</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 italic">※お届け日数は発送後の目安です。日本国内での税関手続き・天候・交通事情により数日程度前後する場合がございます。通関時の輸入消費税・関税が発生した場合はお客様のご負担となります（少額貨物のため課税されないケースが大半です）。</p>

        <h2>送料無料</h2>
        <p>商品合計金額が<strong>8,000円（税込）以上</strong>の場合、全国どこでも<strong>国際通常配送料が無料</strong>となります。チェックアウト時に自動適用されます。</p>

        <h2>配送追跡</h2>
        <p>商品発送後、追跡番号を記載した発送完了メールをお送りいたします。メールに記載の追跡リンクより配送状況をご確認いただけます。発送後3営業日を過ぎても追跡メールが届かない場合は、<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までお問い合わせください。</p>

        <h2>配送先住所の変更</h2>
        <p>ご注文完了後に配送先住所の誤りにお気づきになった場合は、ご注文から2時間以内にご連絡ください。発送前であれば住所変更を承ります。発送後の住所変更・転送は承ることができません。</p>

        <h2>紛失・破損について</h2>
        <p>商品到着時に破損していた場合、または配送中に紛失した可能性がある場合は、お届け予定日から7日以内に<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までご連絡ください。配送業者と協力のうえ、再送または返金にて対応いたします。</p>

        <h2>お問い合わせ</h2>
        <p>配送に関するご質問は下記までお気軽にお問い合わせください。</p>
        <ul>
          <li>メール：<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a></li>
          <li>対応時間：平日24時間以内に返信いたします</li>
        </ul>
      </div>
    </div>
  );
}
