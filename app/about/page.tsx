export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">FreshLockについて</h1>
        <p className="section-subtitle">
          「もったいない」をなくしたい。日本の食卓から食品ロスを減らす、それが私たちの想いです。
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">ストーリー</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            FreshLockは、「せっかく買った食材をムダにしたくない」という想いから生まれました。忙しい毎日の中で、新鮮な食材や作り置きのおかずが気づけば傷んでいる——そんな経験は誰にでもあるはずです。
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            業務用の真空パック技術を家庭でも手軽に使えるように——と研究を重ね、大きな本体もコードも複雑な操作も不要な、ハンディでコードレスな真空ポンプを開発しました。専用のチャック袋の空気弁に当ててボタンを押すだけ。誰でも、どこでも、すぐに使えます。
          </p>
          <p className="text-gray-600 leading-relaxed">
            現在、FreshLockは世界10,000世帯以上で愛用されています。週末に作り置きするご家庭、キャンプやアウトドアで食材を新鮮に保ちたい方、一人暮らしで食品ロスを減らしたい方——FreshLockは、毎日の「もったいない」をなくすお手伝いをします。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🌱', title: '食品ロス削減', text: '日本の家庭から出る食品ロスは年間約244万トン（令和4年度推計）。真空保存でその削減に貢献します。' },
            { icon: '🇯🇵', title: '日本仕様', text: '日本のキッチンや食生活に合わせて設計。コンパクトで使いやすく、専用袋は食品衛生法に適合しています。' },
            { icon: '♻️', title: 'サステナブル', text: '専用袋は繰り返し使用可能。パッケージはプラスチック削減に取り組んでいます。' },
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
              <span><strong>全国送料対応</strong> — ¥8,000以上のご注文で全国送料無料。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>日本語サポート</strong> — メールでのお問い合わせは24時間以内にご返答いたします。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span><strong>安心の品質保証</strong> — 全製品は出荷前に検品済み。本体は1〜2年保証付き。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
