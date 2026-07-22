import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, reviews, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import { generateProductSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/schema';
import AddToCartClient from './AddToCartClient';
import BundleAddons from './BundleAddons';
import ProductGallery from './ProductGallery';
import Image from 'next/image';

type Params = { slug: string };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  const url = `${SITE_URL}/products/${product.slug}`;
  const seoTitles: Record<string, string> = {
    'freshlock-pro': 'FreshLock Pro（フレッシュロック プロ）｜液体・煮汁・魚のドリップも吸えるハンディ真空パック機',
    'freshlock-starter-kit': 'FreshLock スターターキット｜ハンディ真空パック機 Pro + 専用袋30枚セット',
    'vacuum-seal-bags-30-pack': 'FreshLock 真空チャック袋30枚（中サイズ）｜繰り返し使える BPAフリー',
    'vacuum-seal-bags-50-pack': 'FreshLock 真空チャック袋50枚（大サイズ）｜まとめ買い・家族分・低温調理に',
  };
  const title = seoTitles[product.slug] || product.name;
  const description = product.shortDescription + ` ¥${FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で国際航空便（追跡あり）送料無料、30日間返品保証。`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      url,
      title: `${product.name} | FreshLock（フレッシュロック）公式`,
      description,
      images: product.images.map((src) => ({
        url: src,
        width: 1200,
        height: 630,
        alt: product.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  // クロスセル最適化：本体→袋、袋→本体+他の袋
  let related;
  if (product.slug === 'freshlock-pro') {
    related = products.filter((p) => p.category === 'bags');
  } else if (product.category === 'bags') {
    const sealer = products.find((x) => x.slug === 'freshlock-pro');
    const otherBag = products.find((x) => x.category === 'bags' && x.slug !== product.slug);
    related = [sealer, otherBag].filter(Boolean) as typeof products;
  } else {
    related = products.filter((x) => x.slug !== product.slug && x.category === product.category).slice(0, 2);
  }
  const relatedHeading = product.slug === 'freshlock-pro' ? 'セットで揃える' : 'こちらもおすすめ';

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  const productSchema = generateProductSchema(product, reviews);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'ホーム', url: '/' },
    { name: '製品一覧', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '真空パックで食材はどのくらい長持ちしますか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'FreshLock専用チャック袋を使用すると、通常の保存と比較して冷蔵庫で3〜5倍、冷凍庫で最長6ヶ月鮮度をキープ。空気を95%除去することで酸化や冷凍焼けを防ぎます。'
              }
            },
            {
              '@type': 'Question',
              name: 'FreshLockは熱溶着式（ヒートバー式）ですか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'いいえ。FreshLockはポンプ式のハンディ真空保存機で、一方向空気弁付きチャック袋から空気を吸引します。ヒートバーは使わず、弁の気密性で真空を維持します。'
              }
            },
            {
              '@type': 'Question',
              name: 'バッテリーは充電式ですか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'はい。USB-C充電式で、約2時間のフル充電で40回以上使用可能です。'
              }
            },
            {
              '@type': 'Question',
              name: '専用袋は繰り返し使えますか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'はい。緑色のダブルトラックチャック仕様で、洗って何度でも再利用可能。生肉・魚は都度新しい袋を推奨、乾物は繰り返し使えます。'
              }
            }
          ]
        }) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8" aria-label="パンくずリスト">
          <ol className="flex flex-wrap items-center">
            <li><Link href="/" className="hover:text-primary">ホーム</Link></li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-primary">製品一覧</Link></li>
            <li className="mx-2" aria-hidden="true">/</li>
            <li className="text-gray-900" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <article className="grid md:grid-cols-2 gap-12" itemScope itemType="https://schema.org/Product">
          {/* Images */}
          <ProductGallery
            images={product.images && product.images.length > 0 ? product.images : [product.image]}
            productName={product.name}
            shortDescription={product.shortDescription}
          />

          {/* Info */}
          <section>
            {product.badge && (
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" itemProp="name">{product.name}</h1>
            <p className="text-3xl font-bold text-accent mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="JPY" />
              <meta itemProp="price" content={String(product.price)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              {formatPrice(product.price)}{' '}
              <span className="text-sm text-gray-400 font-normal">（税込）</span>
            </p>
            <p className="text-gray-600 leading-relaxed mb-8" itemProp="description">{product.description}</p>

            {/* Features */}
            <section className="mb-8">
              <h2 className="font-semibold text-primary mb-3 text-lg">主な特長</h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-accent mt-0.5" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <AddToCartClient product={product} />

            <BundleAddons product={product} />

            {/* Specs */}
            <section className="bg-gray-50 rounded-xl p-6 mt-6">
              <h2 className="font-semibold text-primary mb-3 text-lg">仕様</h2>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <dt className="text-gray-500">{key}</dt>
                    <dd className="font-medium text-gray-900">{val}</dd>
                  </div>
                ))}
              </dl>
            </section>

                        {/* Q&A for SEO + GEO */}
            <section className="mt-8">
              <h2 className="font-semibold text-primary mb-3 text-lg">よくあるご質問</h2>
              <div className="space-y-4 text-sm text-gray-600">
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800" itemProp="name">真空パックで食材はどのくらい長持ちしますか？</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="leading-relaxed" itemProp="text">FreshLock専用チャック袋を使用すると、通常の保存と比較して冷蔵庫で3〜5倍、冷凍庫で最長6ヶ月鮮度をキープ。空気を95%除去することで酸化や冷凍焼けを防ぎます。</p>
                  </div>
                </div>
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800" itemProp="name">FreshLockは熱溶着式（ヒートバー式）ですか？</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="leading-relaxed" itemProp="text">いいえ。FreshLockはポンプ式のハンディ真空保存機で、一方向空気弁付きの繰り返し使えるチャック袋から空気を吸引します。熱溶着（ヒートバー）は使わず、弁の気密性で真空を維持するため、袋を洗って何度も再利用できます。</p>
                  </div>
                </div>
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800" itemProp="name">バッテリーは充電式ですか？</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="leading-relaxed" itemProp="text">はい。USB-C充電式で、約2時間のフル充電で40回以上の真空引きが可能。毎日のキッチン使いで数日〜1週間持ちます。</p>
                  </div>
                </div>
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-semibold text-gray-800" itemProp="name">専用袋は繰り返し使えますか？</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="leading-relaxed" itemProp="text">はい。緑色のダブルトラックチャック仕様で、開け閉めして洗って何度でも再利用可能。生肉や魚は都度新しい袋を推奨しますが、コーヒー豆・お米・パスタ・お菓子などの乾物は何度も繰り返し使えます。</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust badges */}
            <div className="mt-6 space-y-2" aria-label="安心の保証">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1.5 text-sm">🚚 追跡可能配送 7–12日</span>
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1.5 text-sm">🔒 安全決済</span>
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1.5 text-sm">↩️ 30日間返品保証</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 rounded-full px-3 py-1.5 text-xs">💳 Apple Pay</span>
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 rounded-full px-3 py-1.5 text-xs">Google Pay</span>
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 rounded-full px-3 py-1.5 text-xs">VISA</span>
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 rounded-full px-3 py-1.5 text-xs">Mastercard</span>
                <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-400 rounded-full px-3 py-1.5 text-xs">PayPay 近日対応</span>
              </div>
            </div>
          </section>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 sm:mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="section-title mb-8">{relatedHeading}</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition flex"
                >
                  <Image src={p.image}
                    alt={`${p.name} - ${p.shortDescription}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-l-xl flex-shrink-0"
                    width={128}
                    height={128}
                    loading="lazy" />
                  <div className="p-3 sm:p-4 flex-1 min-w-0">
                    <h3 className="font-bold text-primary mb-1 text-sm sm:text-base leading-snug line-clamp-2">{p.name}</h3>
                    <p className="text-accent font-bold">{formatPrice(p.price)}（税込）</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
