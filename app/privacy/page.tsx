export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">プライバシーポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. はじめに</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock Japan（以下「当社」といいます）は、jp.freshlocksealer.com（以下「本サイト」といいます）を運営し、お客様のプライバシーと個人情報の保護を尊重いたします。本プライバシーポリシーは、お客様が本サイトを閲覧またはご購入される際に、当社がどのように情報を収集・利用・共有・保護するかをご説明するものです。
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              当社は、日本の「個人情報の保護に関する法律」（APPI）をはじめ、EU域内のお客様についてはGDPR（一般データ保護規則）など、適用されるデータ保護法令を遵守いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. 収集する情報</h2>
            <p className="text-gray-600 leading-relaxed mb-3">当社は以下の情報を収集する場合があります：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>個人情報：</strong>お名前、メールアドレス、電話番号、配送先住所、請求先住所（ご注文・お問い合わせ時にご提供いただいたもの）</li>
              <li><strong>決済情報：</strong>クレジットカード情報・PayPalアカウント情報（決済代行業者により安全に処理され、当社がカード番号本体を保持することはありません）</li>
              <li><strong>ご注文情報：</strong>購入履歴、注文内容、ご利用の設定、配送状況、お問い合わせ履歴</li>
              <li><strong>技術情報：</strong>IPアドレス、ブラウザ・端末情報、閲覧したページ・滞在時間、参照元URL、その他の診断データ</li>
              <li><strong>通信情報：</strong>お問い合わせフォーム・メール等でいただいたメッセージ内容</li>
              <li><strong>マーケティング設定：</strong>メールマガジン購読の有無、配信メールの開封・クリック履歴</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. 情報の利用目的</h2>
            <p className="text-gray-600 leading-relaxed mb-3">収集した情報は以下の目的で利用いたします：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>ご注文の処理・発送、ならびに注文確認・配送通知の送信</li>
              <li>カスタマーサポートのご提供とお問い合わせ対応</li>
              <li>商品・キャンペーン・新製品情報のご案内（<strong>お客様の同意がある場合に限ります</strong>。配信停止はいつでも可能です）</li>
              <li>ウェブサイトの使いやすさ・表示・コンテンツの改善</li>
              <li>不正アクセス・不正利用の防止およびセキュリティの確保</li>
              <li>法令上の義務の遵守</li>
              <li>アクセス解析によるサービス向上</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. Cookie（クッキー）について</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              本サイトでは、閲覧体験の向上やサービス提供のためにCookieおよび類似の技術を使用しています。Cookieとは、端末に保存される小さなテキストファイルで、以下の目的で利用します：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>必須Cookie：</strong>ショッピングカート・チェックアウト・ログイン状態の保持など、サイトの基本機能に必要です。</li>
              <li><strong>解析Cookie：</strong>Google Analyticsなどのアクセス解析ツールを用い、個人を特定しない形で閲覧傾向を把握し、サイト改善に役立てます。</li>
              <li><strong>広告Cookie：</strong>お客様の同意に基づき、Google広告・Meta広告・TikTok広告などの外部広告プラットフォームにて関連性の高い広告を表示するために利用する場合があります。</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              お使いのブラウザ設定からCookieを無効にすることができます。ただし必須Cookieを無効にすると、カート機能やチェックアウトなど本サイトの一部機能がご利用いただけなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. 第三者提供・外部サービス</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              当社はお客様の個人情報を第三者に販売することは一切ありません。ただし、本サイトの運営やサービス提供に必要な範囲で、以下の信頼できる外部事業者に限り必要最小限の情報を提供することがあります：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Vercel（ホスティング・CDN）：</strong>本サイトの表示・配信に伴い、IPアドレスや技術情報が処理されます（セキュリティ・パフォーマンス向上目的）。</li>
              <li><strong>Google Analytics：</strong>サイトの利用状況を匿名化した形で分析します。Googleのオプトアウトアドオンで無効化できます。</li>
              <li><strong>Stripe・PayPal（決済代行）：</strong>安全な決済処理のため、決済情報を送信します。</li>
              <li><strong>配送業者（日本郵便・佐川急便など）：</strong>商品のお届けに必要な範囲で、お名前・住所・連絡先を提供します。</li>
              <li><strong>メール配信サービス：</strong>注文確認・配送通知・メールマガジン（購読者のみ）の送信に利用します。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. その他の情報提供</h2>
            <p className="text-gray-600 leading-relaxed mb-3">前項のほか、以下の場合に情報を開示することがあります：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>法令・裁判所命令・行政機関の要請に基づく場合</li>
              <li>当社またはお客様の権利・財産・安全を保護するために必要な場合</li>
              <li>合併・買収・事業譲渡などに伴う場合（その場合も情報は同様の保護水準で扱われます）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. 情報の保管期間</h2>
            <p className="text-gray-600 leading-relaxed">
              個人情報は、利用目的に必要な期間に限り保管いたします。ご注文情報は、法令上の保管義務（税務・会計等）および保証対応のため、原則として最長7年間保持します。メールマガジンの購読情報は、購読解除のご連絡をいただくまで保持いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. 情報セキュリティ</h2>
            <p className="text-gray-600 leading-relaxed">
              本サイトはSSL/TLS暗号化通信に対応し、決済はPCI-DSSに準拠した決済代行業者により処理されます。また、個人情報へのアクセス制限・定期的なセキュリティ監視など、合理的かつ適切な安全管理措置を講じています。ただし、インターネット上の通信や電子保管が100%安全であることを保証するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. 国外へのデータ移転</h2>
            <p className="text-gray-600 leading-relaxed">
              ホスティング・解析・決済などの一部の外部サービスは日本国外（米国など）のサーバーでデータを処理する場合があります。その場合でも、適用法令に基づき、お客様の情報が十分な保護水準で取り扱われるよう必要な措置を講じます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. お客様の権利</h2>
            <p className="text-gray-600 leading-relaxed mb-3">お客様は以下の権利を有します：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>当社が保有するお客様の個人情報へのアクセス・開示請求</li>
              <li>情報の誤りがある場合の訂正・追加請求</li>
              <li>法令上の範囲における削除・利用停止の請求</li>
              <li>データポータビリティ権の行使</li>
              <li>メールマガジン等のマーケティング配信の停止（配信メール内の「配信停止」リンクからいつでも可能です）</li>
              <li>個人情報保護委員会などの監督機関への苦情申立て</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              これらの権利行使は、下記のお問い合わせ窓口までご連絡ください。ご本人確認のうえ、合理的な期間内（原則30日以内）に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">11. 未成年者の情報について</h2>
            <p className="text-gray-600 leading-relaxed">
              本サイトは18歳未満の方を対象としておらず、未成年者から意図的に個人情報を取得することはありません。万が一、未成年者からの情報提供が判明した場合は、速やかに削除いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">12. ポリシーの変更</h2>
            <p className="text-gray-600 leading-relaxed">
              当社は、本ポリシーを必要に応じて改定することがあります。改定後は本ページに掲載した時点で効力を生じます。重要な変更については本サイト上でお知らせいたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">13. お問い合わせ窓口</h2>
            <p className="text-gray-600 leading-relaxed">
              プライバシーポリシーに関するご質問・ご請求・苦情は下記までご連絡ください。
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>メール：</strong>
              <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">
                support@freshlocksealer.com
              </a>
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
