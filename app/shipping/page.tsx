export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">配送ポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="text-gray-900 font-semibold">
                🚚 全国一律 <span className="text-accent">¥680（税込）</span>。<span className="text-accent">¥8,000（税込）以上</span>のご注文で全国送料無料。平日12時までのご注文は翌営業日までに発送いたします。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. お届け対象地域</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock Japan（jp.freshlocksealer.com）では、<strong>日本国内</strong>（沖縄・離島を含む）の住所にお届けいたします。海外への発送は現在承っておりません。海外からのご購入はグローバルサイト（www.freshlocksealer.com）をご利用ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 発送の目安</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>ご注文確定後（決済完了後）、<strong>1〜3営業日以内</strong>に発送いたします（土日祝・年末年始・GW・お盆を除く）。</li>
              <li>平日正午（12:00 JST）までのご注文は、できる限り翌営業日の発送を心がけております。</li>
              <li>発送完了後、追跡番号を記載した「発送完了メール」をお送りいたします。</li>
              <li>セール期間中や連休前後は、通常より発送にお時間をいただく場合があります。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. お届け日数の目安</h2>
            <p className="text-gray-600 leading-relaxed mb-3">発送後の配達日数の目安は以下の通りです。</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-left text-gray-600 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 font-semibold">お届け先</th>
                    <th className="border px-4 py-2 font-semibold">通常配送</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">本州（関東・中部・関西・中国・四国・東北・九州の主要都市圏）</td>
                    <td className="border px-4 py-2">発送後 2〜4営業日</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">北海道・九州地方（一部地域）</td>
                    <td className="border px-4 py-2">発送後 3〜5営業日</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">沖縄・離島</td>
                    <td className="border px-4 py-2">発送後 5〜12営業日</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-3">
              ご注文確定からお届けまでの合計日数は、<strong>5〜12営業日程度</strong>が目安となります。天候・交通事情・配送業者の混雑状況などにより前後する場合があり、これらは保証されるものではありませんのであらかじめご了承ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. 送料</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-left text-gray-600 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 font-semibold">ご注文金額（税込）</th>
                    <th className="border px-4 py-2 font-semibold">送料（全国一律・税込）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">¥8,000 未満</td>
                    <td className="border px-4 py-2">¥680</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">¥8,000 以上</td>
                    <td className="border px-4 py-2"><strong className="text-accent">無料</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-3">
              送料はチェックアウト時に自動計算され、お支払い前に確定した金額を表示いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. 配送業者</h2>
            <p className="text-gray-600 leading-relaxed">
              配送は日本郵便（ゆうパック等）・佐川急便、または当社提携の配送業者がお届けいたします。配送業者はお届け先や商品サイズに応じて当社で選定させていただきます（業者のご指定は承っておりません）。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 追跡番号・配送状況</h2>
            <p className="text-gray-600 leading-relaxed">
              発送が完了しましたら、ご登録のメールアドレス宛に「発送完了のお知らせ」メールをお送りし、荷物の追跡番号をご案内いたします。メール内のリンクから最新の配送状況をご確認いただけます。発送完了メールが届かない場合は、迷惑メールフォルダをご確認のうえ、お問い合わせください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 置き配・日時指定について</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>配送業者のサービス範囲内で「置き配」をご指定いただける場合があります。ご希望の場合はチェックアウト時の備考欄にその旨をご記入ください（対応可否は配送業者に準じます）。</li>
              <li>日時指定は配送業者のサービス提供状況により対応できない場合がありますので、ご希望に添えない際はご容赦ください。</li>
              <li>配送業者により「配達完了」と記録された後の紛失・破損につきましては、お客様と配送業者との間でご確認をお願いする場合があります。「配達完了」となっているにもかかわらず商品が届いていない場合は、すみやかに当社までご連絡ください。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. 長期不在・住所不備</h2>
            <p className="text-gray-600 leading-relaxed">
              長期不在や住所不備により配送業者の保管期間を超過した場合、商品は当社に返送されます。その場合、再発送には追加送料（実費）をご請求させていただくほか、ご連絡が取れないまま一定期間が経過した場合はキャンセル・返金処理をさせていただくことがあります。あらかじめ正確な住所のご入力と、不在票のご確認をお願いいたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. 配送中の事故・破損・未着</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              万が一、配送中の事故による破損・誤送、または追跡上「配達完了」となっているにもかかわらず商品が届かない場合は、すみやかに <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> までご連絡ください。状況確認のうえ、以下の通り対応いたします：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>配送業者への調査依頼を当社より行います。</li>
              <li>紛失と確認された場合、または破損・誤送が認められた場合は、無料で再送または全額返金いたします。</li>
              <li>破損の場合は、到着後7日以内に梱包材・商品のお写真をご提供いただきますようお願いいたします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. 関税・税金について</h2>
            <p className="text-gray-600 leading-relaxed">
              日本国内への発送はすべて国内倉庫からの出荷であり、表示価格には消費税が含まれています。追加の関税や輸入税は発生しません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">11. 配送に関するお問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              配送に関するご質問や、お届けが大幅に遅れている場合などは、ご注文番号をご用意のうえ <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> までご連絡ください。平日24時間以内にご返信いたします。
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
