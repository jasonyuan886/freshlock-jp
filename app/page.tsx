import Link from 'next/link';
import { products, reviews, faqs, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { generateFAQSchema } from '@/lib/schema';
import Image from 'next/image';
import Script from 'next/script';
import FomoCountdownTimer from '@/components/FomoCountdownTimer';

const faqSchema = generateFAQSchema(faqs.slice(0, 3));

function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating}つ星のうち${rating}つ`}>
      {'★'.repeat(rating)}
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export const metadata = {
  alternates: { canonical: '/' },
};

function Hero() {
  return (
    <section className="bg-primary text-white" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-4">
              💧 煮物・カレー・マリネ液も真空できる — モーターを傷めない機械式ドレン構造
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              FreshLock Pro<br />
              <span className="text-accent">ハンディ真空ポンプ</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-lg">
              <strong>機械式ドレンカップ（汁受け）</strong>で煮物・たれ・マリネ液を
              モーターの<em>手前で</em>キャッチ。ポンプ詰まりも、モーター焼損もありません。
              <strong>-60kPa</strong>のワンタッチ真空で食品を<strong>5倍長持ち</strong>。
              <strong>USB-C充電</strong>・<strong>専用袋不要</strong>で市販のエンボスバルブ袋に対応します。
            </p>
            <div className="flex flex-wrap gap-2 mb-8 text-sm">
              {[
                '💧 機械式ドレンカップ（汁物対応・丸洗いOK）',
                '🔌 USB-C・80〜100回/充電',
                '🔇 音が静か（約60dB）',
                '♻️ 専用袋不要・市販袋OK',
                '🛡️ 本体2年保証',
              ].map((b) => (
                <span key={b} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-full border border-white/20">
                  {b}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products/freshlock-pro" className="btn-primary text-lg">
                FreshLock Proを見る — ¥8,980（税込）
              </Link>
              <Link href="#features" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                特長を見る
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>🚚 ¥{FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で送料無料</span>
              <span>↩️ 30日間返品保証</span>
              <span>🔒 SSL暗号化で安心決済</span>
            </div>
          </div>
          <div className="flex justify-center md:justify-center mt-8 md:mt-0">
            <Image src="/images/products/sealer-main.jpg"
              alt="FreshLock Pro ハンディ真空ポンプ 本体。パールホワイトのダイヤ柄ボディにクロムメッキのダイヤモンドカット天面、ブラックの半透明パネルにブルーLED数表示、シルバーの電源ボタン。着脱式の透明なドリップトレイ（汁受けカップ）と、リンゴ緑のzip-sliderが付いた90μmエンボスバッグを併置。"
              className="rounded-2xl shadow-2xl w-64 md:w-full max-w-md md:max-w-none"
              width={600}
              height={600}
              priority
              sizes="(max-width: 768px) 256px, 600px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutFreshLock() {
  return (
    <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2 id="about-heading" className="section-title">日本のキッチンのために。</h2>
        </header>
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            <strong>FreshLock（フレッシュロック）</strong>は、「毎日のキッチンをラクにしたい」という思いから生まれたコードレス式ハンディ真空ポンプです。日曜日にまとめて作り置きをする方、赤ちゃんの離乳食を小分け冷凍するママ、まとめ買いしたお肉や魚を美味しく長持ちさせたい方、キャンプやBBQで下味冷凍を持ち出したい方に選ばれています。
          </p>
          <p>
            据え置き型の大きな真空パック機と違い、FreshLock Proは片手でワンタッチで使える<strong>レバーが軽い</strong>設計。ヒートバー（熱溶着）は不要で、付属の<strong>着脱式ドリップトレイ</strong>が煮物・カレー・マリネ液などの水分をキャッチするので<strong>汁物対応</strong>、トレイは<strong>丸洗いOK</strong>です。
          </p>
          <p>
            <strong>専用袋不要</strong>で、市販のエンボス加工・片一方向バルブ付きチャック袋（90μm以上推奨）に幅広く対応。USB-Cで約2.5時間フル充電、1回の充電で約80〜100回吸引でき、運転音は約60dBと<strong>音が静か</strong>。コンパクトな約210gで引き出しにもすっきり収まります。本体2年保証・付属品6ヶ月保証で安心して長くお使いいただけます。
          </p>
        </article>
      </div>
    </section>
  );
}

const featureList = [
  {
    icon: '🧊',
    title: '冷凍焼け防止',
    text: '-60kPaの吸引力で空気をしっかり抜き、酸化や氷結晶を抑えてお肉・魚・お総菜・離乳食を数ヶ月美味しく保ちます。小分け冷凍に最適です。',
  },
  {
    icon: '💧',
    title: '汁物対応・ドリップトレイ',
    text: '着脱式の透明なドリップトレイ（汁受けカップ）が煮物・カレー・マリネ液の水分をキャッチ。トレイは丸洗いOKでいつでも清潔。',
  },
  {
    icon: '👆',
    title: '片手でワンタッチ',
    text: 'ノズルを白い丸バルブに当ててボタンを押すだけ。レバーが軽く、お子さんからご年配の方までどなたでもラクに使えます。',
  },
  {
    icon: '🔌',
    title: 'USB-C充電',
    text: '1200mAhバッテリー、約2.5時間でフル充電。1回の充電で80〜100回の真空引きが可能。スマホと同じUSB-Cケーブルで充電できます。',
  },
  {
    icon: '🔇',
    title: '音が静か（約60dB）',
    text: '約60dB（普通の会話程度）の静音設計。早朝・夜間・お子さまのお昼寝中でも、家族を起こさずに使えます。',
  },
  {
    icon: '♻️',
    title: '専用袋不要',
    text: '市販のエンボス加工・片一方向バルブ付きチャック袋（90μm以上推奨）に幅広く対応。メーカーロックインがなく経済的です。',
  },
  {
    icon: '⚖️',
    title: 'コンパクト・約210g',
    text: '約210gの軽量ボディ、サイズは約65×65×135mm。キッチンの引き出しにすっきり収まり、BBQやキャンプにも気軽に持ち出せます。',
  },
  {
    icon: '🛡️',
    title: '本体2年保証',
    text: 'お買い上げ日から本体は2年、付属品は6ヶ月の保証付き。BPAフリー素材を採用し、FCC・CE・RoHS相当の設計基準を満たしています。',
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="features-heading" className="section-title">選ばれる理由</h2>
          <p className="section-subtitle">
            毎日キッチンに立つ人にとって「ほんとうに使える」機能だけを詰め込みました。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f) => (
            <article
              key={f.title}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4" aria-hidden="true">{f.icon}</div>
              <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-20 bg-white" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="products-heading" className="section-title">製品ラインナップ</h2>
          <p className="section-subtitle">
            本体単品からオールインワンキット、徳用バッグまで、用途に合わせてお選びください。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative overflow-hidden">
                <Image src={p.image}
                  alt={`${p.name} — ${p.shortDescription}`}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                  width={400}
                  height={400}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-primary mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{p.shortDescription}</p>
                <p className="text-xl font-bold text-accent">¥{p.price.toLocaleString()}（税込）</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="btn-secondary">全製品を見る</Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12 bg-primary text-white" aria-label="数字で見る実績">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {([
            ['4.7 ★', '平均ユーザー評価'],
            ['-60kPa', '吸引力'],
            ['送料無料', `¥${FREE_SHIPPING_THRESHOLD.toLocaleString()}以上のご注文`],
            ['30日間', '返品保証'],
          ] as const).map(([stat, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-accent">{stat}</p>
              <p className="text-sm text-gray-300 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="reviews-heading" className="section-title">購入者の声</h2>
          <p className="section-subtitle">
            実際にご使用いただいているお客さまのリアルなレビューです（<strong>{avg} ★ / 5.0</strong>）。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((r) => (
            <article key={r.name} className="bg-white rounded-xl p-5 shadow-sm" itemScope itemType="https://schema.org/Review">
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content="FreshLock Pro ハンディ真空ポンプ" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-sm" itemProp="author">{r.name}</p>
                  <p className="text-xs text-gray-400">
                    <StarRating rating={r.rating} />
                    {' '}<time dateTime={r.date} itemProp="datePublished">{new Date(r.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  </p>
                </div>
                {r.verified && (
                  <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200">
                    ✓ 購入済み
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed" itemProp="reviewBody">{r.text}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products/freshlock-pro#reviews" className="btn-secondary">
            すべてのレビューを見る
          </Link>
          <a href="mailto:freshlocksealer@gmail.com?subject=FreshLock%20レビューを書く" className="btn-primary">
            レビューを書く
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 bg-white" aria-labelledby="howitworks-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="howitworks-heading" className="section-title">使い方は3ステップ</h2>
          <p className="section-subtitle">ヒートバーいらず、難しい設定はありません。</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '1', t: '食材を袋に入れてチャックを閉じる', d: 'バルブ付きエンボス袋に食材を入れ、リンゴ緑のzip-sliderでダブルトラックチャックをしっかり閉じます。' },
            { n: '2', t: 'ノズルをバルブに当ててボタンを押す', d: '白い丸バルブにノズルを当て、電源ボタンをワンプッシュ。自動で空気を抜き取ります。' },
            { n: '3', t: '冷蔵・冷凍・持ち出しOK', d: '片一方向弁が自動ロックして真空をキープ。冷凍焼けを防止し、作り置きも離乳食も長持ちします。' },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">{s.n}</div>
              <h3 className="font-bold text-lg mb-2 text-primary">{s.t}</h3>
              <p className="text-gray-600 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50" aria-labelledby="home-faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="home-faq-heading" className="section-title">よくある質問</h2>
          <p className="section-subtitle">
            気になる点を事前にチェック。
          </p>
        </div>
        <div className="space-y-4">
          {faqs.slice(0, 5).map((f) => (
            <details key={f.question} className="bg-white rounded-xl p-5 shadow-sm group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                <span>{f.question}</span>
                <span className="text-accent text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="btn-secondary">すべての質問を見る</Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <FomoCountdownTimer variant="homepage" />
      <SocialProof />
      <AboutFreshLock />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Reviews />
      <HomeFAQ />
    </>
  );
}
