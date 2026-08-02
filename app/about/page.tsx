import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreshLock（フレッシュロック）について｜ハンディ真空ポンプで食品ロス削減',
  description:
    'FreshLock（フレッシュロック）は深セン発のキッチン家電ブランド。-60kPaのハンディ真空ポンプで冷凍焼けを防ぎ、食材を5倍長持ちさせます。BPAフリー・USB-C充電・日本語サポート・30日間返品保証。',
  alternates: {
    canonical: '/about',
    languages: {
      'en-US': 'https://www.freshlocksealer.com/about',
      'ja-JP': 'https://jp.freshlocksealer.com/about',
      'x-default': 'https://www.freshlocksealer.com/about',
    },
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">FreshLockについて</h1>
        <p className="section-subtitle">
          日本の食卓から「もったいない」をなくす。毎日の鮮度を、もっと長く、もっと手軽に。
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">ストーリー</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            「せっかく買ったお肉や野菜をダメにしてしまった」「作り置きがいつの間にか傷んでいた」——そんな毎日の小さな「もったいない」からFreshLockは生まれました。日本の家庭から出る食品ロスは年間約244万トン（令和4年度推計）。その半分近くは家庭から出ていると言われています。
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            業務用の真空パック技術を、もっとシンプルに、もっと手軽に家庭で使えたら——。試行錯誤の末にたどり着いたのが、ハンディでコードレスな<strong>ポンプ式の真空保存機</strong>でした。専用の真空チャック袋についた白い空気弁に本体を当て、ボタンを押すだけ。大きな本体も電源コードも必要ありません。
          </p>
          <p className="text-gray-600 leading-relaxed">
            現在、FreshLockは世界各国のご家庭でご愛用いただいています。週末に作り置きをするご家庭、一人暮らしで食材を長持ちさせたい方、キャンプやアウトドアで食材を新鮮に持ち運びたい方——FreshLockは、日本のキッチンに寄り添う「鮮度の相棒」を目指しています。
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">深セン設計・世界で信頼される品質</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FreshLockは<strong>深圳市七力科技有限公司（Shichiri Technology Co., Ltd.）</strong>によって設計・製造されています。深センは40年以上にわたり世界の家電・電子機器のサプライチェーンとエンジニアリングをリードしてきた「ハードウェアの首都」。何十年も国際ブランドのキッチン家電をOEM生産してきたチームが、中間マージンをカットしてダイレクトにお届けします。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            日本に架空の住所やカスタマーセンターを設けるような見せかけはいたしません。本当の工場から、本当に良い製品を、適正な価格で。製品は全ロット出荷前に検品し、CE・RoHS・FCC認証済み、食品接触素材はBPAフリーです。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">🏭 販売業者</p>
              <p className="text-gray-600">深圳市七力科技有限公司</p>
              <p className="text-gray-500 text-xs mt-1">Shichiri Technology Co., Ltd.</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📍 所在地</p>
              <p className="text-gray-600 text-xs">中国広東省深セン市龍華区大浪街道創芸路安宏基工業園C棟3階</p>
              <p className="text-gray-500 text-xs mt-1">日本国内に住所・電話番号はございません。お問い合わせはメールにて承ります。</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">📧 カスタマーサポート</p>
              <p className="text-gray-600"><a href="mailto:jp-support@freshlocksealer.com" className="text-accent hover:underline">jp-support@freshlocksealer.com</a></p>
              <p className="text-gray-500 text-xs mt-1">平日24時間以内に日本語でご返信</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-primary mb-1">✅ 認証・適合</p>
              <p className="text-gray-600">CE・RoHS・FCC／BPAフリー（食品衛生法適合）</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">製品のこだわり</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FreshLockのハンディ真空ポンプは、毎日キッチンに出しっぱなしにしたくなるデザインと使いやすさを追求しました。
          </p>
          <ul className="space-y-2 text-gray-600 list-disc pl-6">
            <li>
              <strong>パールホワイトの菱形エンボスボディ</strong>に、クロムメッキのダイヤモンドカット天面。手になじむフィット感で、キッチンの引き出しにすっきり収まります。
            </li>
            <li>
              <strong>楕円形の電源ボタンひとつ</strong>でワンタッチ操作。青いLEDデジタル表示でバッテリー残量と動作状況がひと目でわかります。
            </li>
            <li>
              <strong>着脱式クリアな集液カップ</strong>。汁気やドリップをキャッチしてポンプ本体を守り、取り外して丸洗いできます。
            </li>
            <li>
              <strong>USB-C充電式</strong>1200mAhバッテリー。フル充電で80〜100回のシーリング、約2.5時間で満充電です。
            </li>
            <li>
              <strong>-60kPaの吸引力</strong>で数秒でしっかり真空。約60dBの図書館並みの静音設計です。
            </li>
            <li>
              専用袋不要で<strong>ほとんどのエンボス弁付き真空バッグに対応</strong>。当社のバッグは90μmエンボスPA+PE複層フィルム、BPAフリー、白い丸い空気弁とアップルグリーンのダブルチャックが目印です。
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            <em>※FreshLock本体は空気を吸引する「ポンプ式」の製品です。ヒートバー（熱溶着式）ではありません。専用袋の弁から空気を抜き、チャックで密封する仕組みです。</em>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🌱', title: '食品ロス削減', text: '真空保存で食材を長持ちさせ、毎日の「もったいない」を減らします。冷凍焼けやにおい移りも防ぎます。' },
            { icon: '🇯🇵', title: '日本のキッチン仕様', text: 'コンパクトで場所を取らず、日本の食生活に合わせて設計。専用袋は食品衛生法適合です。' },
            { icon: '♻️', title: 'くり返し使える', text: '専用チャック袋は水洗いして何度も再利用可能。環境にもお財布にもやさしい。' },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-primary mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">お約束</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>30日間返品保証</strong> — ご満足いただけない場合は、全額返金いたします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>¥5,500以上のご注文で全国送料無料</strong> — 日本国内どこでも送料無料でお届けします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>日本語メールサポート</strong> — support@freshlocksealer.com までメールをいただければ、平日24時間以内にご返信いたします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>安心の1年メーカー保証</strong> — 全製品は出荷前に検品済み。万が一の不具合にも日本語で丁寧に対応いたします。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
