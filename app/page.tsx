import Link from 'next/link';
import { products, reviews, faqs, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import { generateFAQSchema } from '@/lib/schema';
import Image from 'next/image';

const faqSchema = generateFAQSchema(faqs);

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="bg-primary text-white" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-accent/20 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-4">
              🇯🇵 話題のハンディ真空保存機・公式サイト
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              鮮度を閉じ込める。<br />
              <span className="text-accent">美味しさを長持ち。</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              FreshLock（フレッシュロック）の<strong>ハンディ真空ポンプ</strong>で、食材の鮮度を最大5倍長持ち。コードレス・ワンタッチで、毎日のキッチンにもアウトドアにもぴったりです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary text-lg">
                今すぐ購入
              </Link>
              <Link href="#features" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
                詳しく見る
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-center mt-8 md:mt-0">
            <Image src="/images/products/sealer-main.jpg"
              alt="FreshLock Pro ハンディ真空ポンプ パールホワイト シルバートップ グリーンジッパーの専用袋付き"
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

/* ───────── About FreshLock ───────── */
function AboutFreshLock() {
  return (
    <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2 id="about-heading" className="section-title">FreshLockとは</h2>
        </header>
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            <strong>FreshLock（フレッシュロック）</strong>は、片手で使えるコードレス式のハンディ真空ポンプです。「もったいない」をなくしたい——その想いから生まれました。作り置きのおかず、お肉の小分け、離乳食の保存、コーヒー豆やお菓子の酸化防止まで、毎日のキッチンで手軽に真空保存ができます。
          </p>
          <p>
            大がかりなヒートバー式や据え置き型と違い、専用チャック袋の白色空気弁にノズルを当ててボタンを押すだけ。1分足らずで空気を約95%抜き取り、片一方向弁が自動ロックして密封状態をキープ。酸化・湿気・冷凍焼けから食材を守ります。
          </p>
          <p>
            USB-C充電でフル充電約40回以上使用可能。キッチンの引き出しにすっきり収まり、BBQやキャンプ、旅行先にも持ち運べます。世界10,000世帯以上のご家庭で、毎日の「もったいない」を減らしています。
          </p>
        </article>
      </div>
    </section>
  );
}

/* ───────── Features ───────── */
const featureList = [
  {
    icon: '🛡️',
    title: '鮮度5倍長持ち',
    text: '強力ポンプが空気を95%除去。酸化や菌の繁殖を抑え、食材を数週間新鮮に保ちます。',
  },
  {
    icon: '📦',
    title: '省スペース収納',
    text: '真空密封した袋は冷蔵庫・冷凍庫・パントリーでスッキリ積み重ね。収納スペースを最大40%節約。',
  },
  {
    icon: '👆',
    title: 'ワンタッチ簡単',
    text: '難しい設定は一切なし。袋をセットしてボタンを押すだけ。ご家族どなたでも使えます。',
  },
  {
    icon: '🔋',
    title: 'コードレスで持ち運び',
    text: 'USB-C充電式。フル充電で40回以上使用可能。BBQ・キャンプ・旅行先でも大活躍。',
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="features-heading" className="section-title">選ばれる理由</h2>
          <p className="section-subtitle">
            日本の食卓に合わせて設計。シンプル・パワフル・長持ち。
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

/* ───────── Product Showcase ───────── */
function ProductShowcase() {
  const featured = products.slice(0, 4);
  return (
    <section className="py-20 bg-white" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="products-heading" className="section-title">製品一覧</h2>
          <p className="section-subtitle">
            毎日のキッチン使いからアウトドアまで、あらゆるシーンに対応。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
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
          <Link href="/products" className="btn-secondary">
            全製品を見る
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── Social Proof ───────── */
function SocialProof() {
  return (
    <section className="py-12 bg-primary text-white" aria-label="ご利用実績">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['10,000+', '世界のご愛用世帯'],
            ['4.8 ★', '平均レビュー評価'],
            ['全国', `¥${FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で送料無料`],
            ['30日間', '返金保証'],
          ].map(([stat, label]) => (
            <div key={label as string}>
              <p className="text-3xl font-bold text-accent">{stat}</p>
              <p className="text-sm text-gray-300 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Reviews ───────── */
function Reviews() {
  const topReviews = reviews.slice(0, 3);
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="reviews-heading" className="section-title">お客様の声</h2>
          <p className="section-subtitle">
            日本全国のお客様にご愛用いただいています。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {topReviews.map((r) => (
            <article key={r.name} className="bg-white rounded-xl p-6 shadow-sm" itemScope itemType="https://schema.org/Review">
              <div className="flex items-center mb-3" aria-label={`評価 ${r.rating}/5`}>
                {'★'.repeat(r.rating)}
                <span className="ml-1 text-gray-400 text-sm">{r.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-4 italic" itemProp="reviewBody">&ldquo;{r.text}&rdquo;</p>
              <p className="font-semibold text-primary text-sm" itemProp="author">{r.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── GEO Q&A Block ───────── */
const qaItems = [
  {
    q: '食材はどのくらい長持ちしますか？',
    a: '真空密封により袋内の空気を約95%除去するため、冷蔵庫で通常の保存（チャック袋・ラップ等）と比べて3〜5倍、冷凍庫では最長6ヶ月、食材の鮮度をキープできます。酸化や菌の繁殖、冷凍焼けを大幅に抑えられます。',
  },
  {
    q: 'ハンディ真空ポンプの使い方は簡単ですか？',
    a: 'はい、とても簡単です。食材を専用チャック袋に入れ、緑色スライダーでチャックを閉じ、白色の空気弁に本体ノズルを当ててボタンを押すだけ。数秒で空気が抜け、片一方向弁が自動でロックされます。ヒートバー（熱溶着）不要で、どなたでもすぐに使えます。',
  },
  {
    q: '専用の袋は繰り返し使えますか？',
    a: 'はい。ダブルトラックチャック式なので何度でも開け閉めして再密封できます。生肉・魚・脂分の多い食材は衛生面から新しい袋のご使用をおすすめしますが、お米・パスタ・コーヒー豆・お菓子などの乾物は洗って繰り返しお使いいただけます。',
  },
];

function QABlock() {
  return (
    <section className="py-20 bg-white" aria-labelledby="qa-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="qa-heading" className="section-title">気になる疑問にお答えします</h2>
          <p className="section-subtitle">FreshLockについてよくいただくご質問をまとめました。</p>
        </header>
        <div className="space-y-6">
          {qaItems.map((item) => (
            <article key={item.q} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{item.q}</h3>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ Preview ───────── */
function FaqPreview() {
  const preview = faqs.slice(0, 4);
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="faq-heading" className="section-title">よくあるご質問</h2>
        </div>
        <div className="space-y-6">
          {preview.map((f) => (
            <details key={f.question} className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="font-semibold text-primary cursor-pointer list-none flex justify-between items-center">
                {f.question}
                <span className="ml-4 text-accent group-open:rotate-180 transition-transform" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/faq" className="text-primary font-semibold hover:underline">
            すべてのご質問を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── CTA ───────── */
function Cta() {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          食材の鮮度、もっと長持ちさせませんか？
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          世界10,000世帯以上が愛用。¥{FREE_SHIPPING_THRESHOLD.toLocaleString()}以上のご注文で全国送料無料。
        </p>
        <Link href="/products" className="btn-primary text-lg">
          FreshLockを今すぐチェック
        </Link>
      </div>
    </section>
  );
}

/* ───────── Page ───────── */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <AboutFreshLock />
      <Features />
      <ProductShowcase />
      <SocialProof />
      <Reviews />
      <QABlock />
      <FaqPreview />
      <Cta />
    </>
  );
}
