export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">利用規約</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. 規約への同意</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約は、FreshLock Japan（以下「当社」）が運営するウェブサイト jp.freshlocksealer.com（以下「本サイト」）の閲覧・ご利用、ならびに本サイトを通じた商品のご購入に適用されます。本サイトをご利用いただくことにより、お客様は本規約および適用されるすべての法令に同意いただいたものとみなされます。本規約に同意いただけない場合は、本サイトのご利用をお控えください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 事業者について</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock Japanは、ハンディ真空ポンプ式保存機「FreshLock」および専用真空チャック袋を日本国内のお客様に販売するオンラインストアです。カスタマーサポートは <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> にて承っております。日本国内への発送に対応しています。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. ご利用資格</h2>
            <p className="text-gray-600 leading-relaxed">
              ご購入には、18歳以上であること、または保護者の同意が必要です。ご注文を行うことにより、お客様はこれらの要件を満たし、法的拘束力のある契約を締結する能力を有することを表明したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. 商品・価格について</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              商品の説明・画像・仕様は正確を期しておりますが、以下の点にご留意ください：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>価格は日本円（税込）表記です。</li>
              <li>万が一、表示価格に誤りがあった場合、当社は正しい価格に訂正し、必要に応じてご注文確定前にご連絡いたします。</li>
              <li>画面の設定により実際の商品の色味が多少異なる場合があります。</li>
              <li>予告なく商品仕様の変更・販売終了を行う場合があります。</li>
              <li>FreshLock本体は空気を吸引する<strong>ポンプ式</strong>です。ヒートバー（熱溶着式）ではなく、専用袋に付いた弁から空気を抜き、チャックで密封する製品であることをあらかじめご了承ください。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. ご注文・お支払い</h2>
            <p className="text-gray-600 leading-relaxed mb-3">ご注文に際しては以下をご確認ください：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>正確かつ最新の配送先・請求情報をご提供ください。</li>
              <li>ご注文後、自動送信の注文確認メールをお送りします。</li>
              <li>売買契約は、当社が商品を発送し発送完了メールをお送りした時点で成立します。</li>
              <li>お支払いはStripeまたはPayPalなどの決済代行業者を通じて安全に処理されます。</li>
              <li>在庫切れ・価格誤り・不正利用の疑いなど、当社の判断によりご注文をキャンセルさせていただく場合があります。その場合、速やかに全額返金いたします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 配送について</h2>
            <p className="text-gray-600 leading-relaxed">
              配送の詳細は <a href="/shipping" className="text-accent hover:underline">配送ポリシー</a> をご覧ください。配送日数・送料は目安であり、天候・交通事情・配送業者の都合などによる遅延について、当社は責任を負いかねる場合があります。商品が配送業者に引き渡された時点で、紛失・破損のリスクは配送業者に移転します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 返品・交換・保証</h2>
            <p className="text-gray-600 leading-relaxed">
              返品・交換の手続き・条件については <a href="/returns" className="text-accent hover:underline">返品・交換ポリシー</a> をご確認ください。初期不良・配送中の破損・誤送については、当社負担で良品との交換または全額返金いたします。また商品には商品ページ記載のメーカー保証（本体1〜2年）が付帯します。これらの規約は、特定商取引法・消費者契約法その他の日本の消費者関連法令に基づくお客様の権利を制限するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. 商品のご使用について</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock製品は家庭での食品保存を目的として設計されています。付属の取扱説明書に従って正しくご使用ください。誤使用（液体の多い食品を直接吸引する、規格外のサードパーティ製バッグを使用する、本体を水没させるなど）による故障・損害は保証対象外となりますのでご注意ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. 免責事項</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              商品ページに記載された明示保証および法令により排除できない黙示保証を除き、以下の点についてあらかじめご了承ください：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>本サイトおよびコンテンツは「現状有姿」で提供され、一切の明示または黙示の保証をいたしません。</li>
              <li>本サイトが中断なく・安全に・エラーなく動作することを保証いたしません。</li>
              <li>商品説明・画像等の誤記については速やかに訂正いたしますが、それにより生じた損害については法令の範囲内で対応いたします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. 責任の制限</h2>
            <p className="text-gray-600 leading-relaxed">
              法律で認められる最大限の範囲において、当社は本サイトまたは商品のご利用により生じた間接的・偶発的・特別・結果的損害（逸失利益・データ損失・信用毀損などを含む）について責任を負いません。当社の責任総額は、当該請求の原因となった商品の代金相当額を上限とします。ただし、当社の故意または重過失による場合、および法令上免除できない責任についてはこの限りではありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">11. 知的財産権</h2>
            <p className="text-gray-600 leading-relaxed">
              本サイト上のすべてのコンテンツ（文章・グラフィック・ロゴ・画像・動画・ソフトウェア等）はFreshLockまたはそのライセンサーに帰属し、著作権法・商標法その他の知的財産法により保護されています。書面による事前の許可なく、複製・転載・配布・二次的著作物の作成を禁止します。FreshLockの名称・ロゴは当社の商標です。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">12. 禁止行為</h2>
            <p className="text-gray-600 leading-relaxed mb-3">お客様は以下の行為を行わないものとします：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>違法な目的・法令に違反する行為</li>
              <li>当社または第三者の知的財産権・プライバシー権等の侵害</li>
              <li>当社システムへの不正アクセス・ウイルス等の有害コード送信</li>
              <li>本サイトの運営を妨害する行為</li>
              <li>虚偽情報の入力・不正利用・転売目的の大量注文</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">13. プライバシー</h2>
            <p className="text-gray-600 leading-relaxed">
              お客様の個人情報の取り扱いについては <a href="/privacy" className="text-accent hover:underline">プライバシーポリシー</a> をご覧ください。同ポリシーは本規約の一部を構成します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">14. 外部リンク</h2>
            <p className="text-gray-600 leading-relaxed">
              本サイトにはSNS・決済サービスなど外部サイトへのリンクが含まれる場合があります。外部サイトの内容やプライバシー方針について当社は責任を負いかねますので、各サイトの規約等をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">15. 準拠法・管轄</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約は日本法に準拠し解釈されるものとします。本規約に関する紛争については、当社本店所在地を管轄する日本の裁判所を第一審の専属的合意管轄裁判所とします（ただし消費者契約法上の管轄が優先される場合はこの限りではありません）。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">16. 規約の変更</h2>
            <p className="text-gray-600 leading-relaxed">
              当社は本規約を随時変更することがあります。変更後の規約は本サイトに掲載された時点で効力を生じ、変更後も本サイトを継続利用された場合は変更後の規約に同意いただいたものとみなします。重要な変更については本サイト上でお知らせいたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">17. お問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              本規約に関するご質問は下記までご連絡ください。
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>メール：</strong>
              <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>
              <br />
              <strong>返信目安：</strong>平日24時間以内
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
