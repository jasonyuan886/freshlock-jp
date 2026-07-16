export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">利用規約</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. 規約の同意</h2>
            <p className="text-gray-600 leading-relaxed">
              本ウェブサイト（以下「本サイト」）にアクセスまたはご利用いただくことにより、本利用規約（以下「本規約」）およびすべての適用法令に同意いただいたものとみなされます。本規約のいずれかの条項に同意いただけない場合は、本サイトのご利用をお控えください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. ご利用資格</h2>
            <p className="text-gray-600 leading-relaxed">
              ご購入には、18歳以上であること、または保護者の同意が必要です。ご注文を行うことにより、お客様はこれらの要件を満たし、法的拘束力のある契約を締結する能力を有することを表明したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. 製品・価格について</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              製品の説明・画像・仕様は情報提供を目的としています。正確性を期しておりますが、以下の点にご留意ください：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>価格は日本円（税込）表記です</li>
              <li>価格誤りがあった場合、当社は正しい価格に訂正する権利を有します</li>
              <li>画面設定により実際の製品の色味が異なる場合があります</li>
              <li>予告なく製品の仕様変更・販売終了をする場合があります</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. ご注文・お支払い</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              ご注文に際しては：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>正確かつ最新の情報をご提供ください</li>
              <li>ご注文確認メールをもって受注確認となります</li>
              <li>商品発送をもって契約成立となります</li>
              <li>お支払いは決済代行業者（Stripe、PayPal）を通じて安全に処理されます</li>
              <li>当社の判断により、ご注文を拒否またはキャンセルする場合があります</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. 配送について</h2>
            <p className="text-gray-600 leading-relaxed">
              配送日数・送料は目安であり、保証するものではありません。配送業者の事情や天候・交通事情による遅延につきましては、当社は責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 返品・交換</h2>
            <p className="text-gray-600 leading-relaxed">
              返品・交換については、<a href="/returns" className="text-accent hover:underline">返品・交換ポリシー</a>をご覧ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 保証・免責事項</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              製品には記載の通りメーカー保証が付帯します。明示的な保証を除き：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>本サイトおよび製品は「現状有姿」で提供され、明示または黙示の保証をいたしません</li>
              <li>商品性・特定目的適合性の黙示保証を含め、一切の保証を否認します</li>
              <li>本サイトが中断なく・安全に・エラーなく動作することを保証いたしません</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. 責任の制限</h2>
            <p className="text-gray-600 leading-relaxed">
              法律で認められる最大限の範囲において、FreshLock Japanは本サイトまたは製品のご利用により生じた間接的・偶発的・特別・結果的損害（利益・データ・信用の損失を含む）について責任を負いません。当社の責任総額は、当該請求の原因となった製品の代金額を上限とします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. 知的財産権</h2>
            <p className="text-gray-600 leading-relaxed">
              本サイト上のすべてのコンテンツ（文章・グラフィック・ロゴ・画像・ソフトウェア等）はFreshLock Japanまたはそのライセンサーの財産であり、著作権法・商標法その他の知的財産法により保護されています。書面による許可なく、複製・配布・二次的著作物の作成を禁止します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. 利用者の行動規範</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              お客様は以下の行為を行わないものとします：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>違法な目的での本サイト利用</li>
              <li>適用法令・規則への違反</li>
              <li>他人の知的財産権の侵害</li>
              <li>ウイルス・マルウェア等の有害コードの送信</li>
              <li>当社システムへの不正アクセスの試み</li>
              <li>本サイトまたはサーバーの妨害・混乱</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">11. プライバシー</h2>
            <p className="text-gray-600 leading-relaxed">
              お客様の個人情報の取り扱いについては、<a href="/privacy" className="text-accent hover:underline">プライバシーポリシー</a>をご覧ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">12. 準拠法・管轄</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約は日本法に準拠し、解釈されるものとします。本規約に関する紛争は、日本の裁判所を第一審の専属的管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">13. 規約の変更</h2>
            <p className="text-gray-600 leading-relaxed">
              当社は、本規約をいつでも変更する権利を有します。変更後の規約は本サイトに掲載された時点で効力を生じます。変更後に本サイトを継続利用された場合、変更後の規約に同意いただいたものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">14. お問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約に関するご質問は、support@freshlocksealer.com までご連絡ください。
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
