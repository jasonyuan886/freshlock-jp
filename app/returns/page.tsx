export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">返品・交換ポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. 30日間返品保証</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock Japanでは、商品到着後30日以内であれば、理由を問わず返品・交換を承ります。「思っていたのと違った」「使い方が合わなかった」といった場合でも、安心してお申し付けください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 返品の条件</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              返品をご希望の場合は、以下の条件を満たしている必要があります：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>商品到着後30日以内であること</li>
              <li>商品が未使用・元のパッケージの状態であること</li>
              <li>付属品（ケーブル・説明書等）がすべて揃っていること</li>
              <li>事前にメール（support@freshlock.jp）にてご連絡いただいていること</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. 返品の手続き</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>メール（support@freshlock.jp）にて、ご注文番号と返品理由をご連絡ください。</li>
              <li>当社より返送先住所をご案内いたします（24時間以内にご返信）。</li>
              <li>商品を元払いにてご返送ください（不良品の場合は当社負担）。</li>
              <li>商品到着確認後、5営業日以内に返金処理を行います。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. 返金について</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              返金はご利用のお支払い方法に応じて処理されます：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>クレジットカード：</strong>処理後5〜10営業日でご返金</li>
              <li><strong>PayPal：</strong>処理後3〜5営業日でご返金</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              なお、お客様都合による返品の場合、元の送料は返金対象外となります。不良品・誤送の場合は当社負担となります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. 交換について</h2>
            <p className="text-gray-600 leading-relaxed">
              別の製品・カラーへの交換をご希望の場合は、メールにてご連絡ください。在庫状況により対応いたします。差額が発生する場合は、追加請求または差額返金いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. 初期不良・破損について</h2>
            <p className="text-gray-600 leading-relaxed">
              商品到着時に不良・破損があった場合は、到着後7日以内に写真を添えてご連絡ください。送料当社負担にて、すみやかに良品と交換または全額返金いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 製品保証について</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock製品は製品ごとに1〜2年のメーカー保証が付いています。通常使用における材質・製造上の不具合については、保証期間内に限り無償修理または交換対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. お問い合わせ</h2>
            <p className="text-gray-600 leading-relaxed">
              返品・交換に関するご連絡は下記までお願いいたします：
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>メール：</strong> support@freshlock.jp<br />
              <strong>受付時間：</strong> 24時間受付（24時間以内にご返信）
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
