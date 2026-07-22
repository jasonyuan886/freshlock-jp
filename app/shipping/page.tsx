import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: '送料・配送について | FreshLock（フレッシュロック）公式' },
  description: 'FreshLock日本の配送ポリシー。¥5,000以上のご注文で国際航空便（追跡あり）送料無料。中国深センより発送、リチウム電池対応。',
  alternates: { canonical: '/shipping' },
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">送料・配送について</h1>
        <p className="section-subtitle">
          お届け日数・送料・配送エリアについてご案内いたします。
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>配送エリア</h2>
        <p>
          当サイト（jp.freshlocksealer.com）は<strong>日本国内</strong>向けに販売しており、価格は日本円（税込）表記です。
          オーストラリア・ニュージーランドのお客様は<a href="https://www.freshlocksealer.com" className="text-accent hover:underline">FreshLock 英語版（AUD）</a>をご利用ください。
          その他の国への発送をご希望の場合は、<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までお問い合わせください。
        </p>

        <h2>発送元</h2>
        <p>
          FreshLockはD2C（直販）ブランドです。ご注文の商品は<strong>中国・深センの倉庫</strong>より、リチウムイオン電池対応の国際航空便（追跡あり）にて日本へ発送いたします。ハンディ真空ポンプには充電式リチウム電池が内蔵されているため、電池輸送に対応した配送業者のみを使用しています（船便・SAL便は使用しません）。
        </p>

        <h2>出荷処理時間</h2>
        <p>
          ご注文は<strong>1〜2営業日以内</strong>（月〜金、日本時間）に出荷手配いたします。日本時間14:00以降のご注文は翌営業日の出荷となります。
        </p>

        <h2>配送方法・料金・お届け日数</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">配送方法</th>
                <th className="border border-gray-300 px-4 py-2 text-left">お届け日数（出荷後）</th>
                <th className="border border-gray-300 px-4 py-2 text-left">送料（税込）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>国際航空便（追跡あり）</strong></td>
                <td className="border border-gray-300 px-4 py-2">7〜12営業日</td>
                <td className="border border-gray-300 px-4 py-2">
                  <strong>¥5,000以上で無料</strong><br />
                  ¥5,000未満は全国一律¥800
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>速達配送（DHL 国際エクスプレス）</strong></td>
                <td className="border border-gray-300 px-4 py-2">2〜4営業日</td>
                <td className="border border-gray-300 px-4 py-2">
                  ¥5,000未満：¥1,500<br />
                  ¥5,000以上：¥800
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>北海道・沖縄・離島</h3>
        <p>
          北海道・沖縄県・一部離島への配送は、通常送料に加えて<strong>¥500の遠隔地追加料金</strong>がかかります。該当する場合は、ご注文確定前に当店より別途ご連絡いたします（通常1営業日以内）。
        </p>

        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg my-6">
          <p className="text-sm text-gray-700 m-0">
            <strong>💡 ひとことアドバイス：</strong>真空パック機本体（¥8,980）は単品でも<strong>自動的に送料無料</strong>（¥5,000以上）になります。袋も一緒に揃えたい方は「Pro+50枚セット」やスターターキット（本体+30枚セット）がおすすめです。
          </p>
        </div>

        <h2>送料無料について</h2>
        <p>
          商品合計金額（税込）が<strong>¥5,000以上</strong>の場合、国際航空便（追跡あり）の送料が<strong>無料</strong>となります（クーポン割引前の小計金額で計算）。送料無料はチェックアウト時に自動適用されます—クーポンコードは不要です。
        </p>

        <h2>追跡番号について</h2>
        <p>
          商品出荷後、2〜3営業日以内に追跡番号を記載した発送完了メールをお送りします。3営業日を過ぎても追跡メールが届かない場合は、<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までご連絡ください。
        </p>

        <h2>関税・輸入消費税について</h2>
        <p>
          個人輸入の場合、商品代金が¥16,666以下の場合、関税・輸入消費税は原則免除されます。それを超える場合でも、当店が発生する関税・税金を負担することはありません。まれに通関手続きによりお届けが数日遅れる場合がありますが、その際は必要な書類のご案内をいたします。
        </p>

        <h2>紛失・破損について</h2>
        <p>
          万が一、商品の到着時破損・配送中の紛失があった場合は、お届け予定日から7日以内に<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までご連絡ください。配送業者と協力のうえ、再送または全額返金にて対応いたします。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          配送に関するご質問は、<a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>までメールにてご連絡ください。営業日24時間以内に返信いたします。
        </p>
      </div>
    </div>
  );
}
// rebuild Sat Jul 18 11:24:10 PM CST 2026
