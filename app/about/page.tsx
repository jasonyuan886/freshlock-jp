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
            現在、FreshLockは世界で10,000世帯以上にご愛用いただいています。週末に作り置きをするご家庭、一人暮らしで食材を長持ちさせたい方、キャンプやアウトドアで食材を新鮮に持ち運びたい方——FreshLockは、日本のキッチンに寄り添う「鮮度の相棒」を目指しています。
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">製品のこだわり</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FreshLockのハンディ真空ポンプは、毎日キッチンに出しっぱなしにしたくなるデザインと使いやすさを追求しました。
          </p>
          <ul className="space-y-2 text-gray-600 list-disc pl-6">
            <li>
              <strong>ミルキーホワイトのくびれ円柱ボディ</strong>に、三角キルト（ダイヤ柄）の滑り止め加工。手になじむフィット感です。
            </li>
            <li>
              <strong>シルバーのトップキャップ</strong>に縦に並ぶ3つのワンタッチボタン（吸引・停止・開放）。どのボタンか迷いません。
            </li>
            <li>
              <strong>シルバーリング付きの透明な水滴カップ</strong>。水分や汁気をキャッチしてポンプ本体を守り、丸ごと取り外して洗えます。
            </li>
            <li>
              <strong>USB-C充電式</strong>のコードレス設計。キッチンのどこでもサッと使えます。
            </li>
            <li>
              専用の<strong>クリアなエンボス加工真空チャック袋</strong>は、明るいグリーンのチャックと白い丸い空気弁が目印。くり返し使えて電子レンジ解凍にも対応、食品衛生法に適合しています。
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
              <span><strong>¥8,000以上のご注文で全国送料無料</strong> — 日本国内どこでも送料無料でお届けします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>日本語メールサポート</strong> — support@freshlocksealer.com までメールをいただければ、平日24時間以内にご返信いたします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>安心の1〜2年メーカー保証</strong> — 全製品は出荷前に検品済み。万が一の不具合にも日本語で丁寧に対応いたします。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
