export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">返品・交換ポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="text-gray-900 font-semibold">
                🎉 30日間返品保証 — 万が一ご満足いただけない場合は、商品到着後30日以内であれば理由を問わず返品・交換を承ります。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. 返品期間（お客様都合）</h2>
            <p className="text-gray-600 leading-relaxed">
              商品到着後 <strong>30日以内</strong> であれば、「思っていたのと違った」「使い方が合わなかった」などの理由でも返品・交換を承ります。ただし、商品が未使用・未開封で、元のパッケージ・付属品（充電ケーブル・説明書・付属の真空袋など）がすべて揃っている場合に限ります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 返品条件</h2>
            <p className="text-gray-600 leading-relaxed mb-3">お客様都合での返品には以下をご確認ください：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>商品到着後30日以内にご連絡をいただいていること</li>
              <li>商品が未使用・未開封で、元のパッケージ・付属品がすべて揃っていること</li>
              <li>当社から事前に返品承認（RMA番号）を受けていること</li>
              <li>ご注文番号（購入確認メールに記載）をご提示いただけること</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>返品を承れない場合：</strong>開封・使用済みの真空チャック袋、セール・アウトレット表記のある商品、誤使用・改造により破損した商品については返品をお受けできません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. 返品のお手続き</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>
                <strong>メールでご連絡ください：</strong>
                <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline"> support@freshlocksealer.com</a> まで、ご注文番号・返品ご希望の商品・理由をお知らせください。
              </li>
              <li><strong>返品承認：</strong>1〜2営業日以内に、RMA番号（返品承認番号）と返送先住所をご案内いたします。RMA番号のない返送は受付できない場合があります。</li>
              <li><strong>商品のご返送：</strong>元のパッケージに入れ、追跡可能な配送方法でご返送ください。配送中の紛失を防ぐため、追跡番号の保管をおすすめします。</li>
              <li><strong>検品・返金：</strong>当社にて商品到着・状態確認後（通常5営業日以内）、返金または交換手続きを行います。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. 返送料について</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>お客様都合の返品：</strong>返送料はお客様のご負担となります。元の送料も返金対象外となります。</li>
              <li><strong>初期不良・破損・誤送：</strong>商品到着後7日以内に写真を添えてご連絡ください。当社負担（着払いまたは返送料相当額の返金）で良品と交換、または全額返金いたします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. 返金について</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              検品完了後、ご利用のお支払い方法に応じて返金処理を行います。処理後の反映目安は以下の通りです：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>クレジットカード：</strong>処理後5〜10営業日でカード会社経由での返金となります（締め日により翌月以降の反映となる場合があります）。</li>
              <li><strong>PayPal：</strong>処理後3〜5営業日でご利用のPayPal口座に返金されます。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 交換について</h2>
            <p className="text-gray-600 leading-relaxed">
              別の商品・カラー・セットへの交換をご希望の場合は、メールにてその旨をお知らせください。在庫状況により対応いたします。差額が生じる場合は、追加でのご請求または差額の返金をいたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 初期不良・配送中の破損について</h2>
            <p className="text-gray-600 leading-relaxed">
              商品到着時点での不良・破損・誤送があった場合は、到着後 <strong>7日以内</strong> に <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> まで、注文番号と破損個所のお写真を添えてご連絡ください。速やかに良品との交換、または全額返金のいずれかをご案内いたします（送料は当社負担）。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. メーカー保証</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock製品には、商品ごとに1〜2年のメーカー保証が付いています。通常のご使用における材質・製造上の不具合については、保証期間内に限り無償修理または交換対応をいたします。30日返品期間経過後の不具合は保証対応となりますので、メールにてご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. 法令上の権利について</h2>
            <p className="text-gray-600 leading-relaxed">
              本ポリシーは特定商取引法・消費者契約法その他の日本の消費者関連法令に基づくお客様の権利（契約不適合責任など）を制限するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. お問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              返品・交換に関するご連絡は下記までお願いいたします：
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>メール：</strong>
              <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline"> support@freshlocksealer.com</a><br />
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
