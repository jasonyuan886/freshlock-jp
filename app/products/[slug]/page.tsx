import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, reviews, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import { generateProductSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/schema';
import AddToCartClient from './AddToCartClient';
import Image from 'next/image';

type Params = { slug: string };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  const url = `${SITE_URL}/products/${product.slug}`;
  const title = product.name;
  const description = product.shortDescription + ` ¥${FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で全国送料無料、30日間返品保証。`;
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

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 2);

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
          <section>
            <div className="rounded-xl overflow-hidden bg-white shadow mb-4">
              <Image src={product.images[0] || product.image}
                alt={`${product.name} — ${product.shortDescription}`}
                className="w-full aspect-square object-cover"
                itemProp="image"
                width={600}
                height={600}
                priority
                sizes="(max-width: 768px) 100vw, 600px" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3" role="list">
                {product.images.slice(1).map((img, i) => (
                  <div key={i} role="listitem">
                    <Image src={img}
                      alt={`${product.name} — その他の画像${i + 2}枚目`}
                      className="w-20 h-20 rounded-lg object-cover border-2 border-transparent"
                      loading="lazy"
                      width={80}
                      height={80} />
                  </div>
                ))}
              </div>
            )}
          </section>

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
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500" aria-label="安心の保証">
              <span>🚚 全国一律送料¥680（¥{FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で無料）</span>
              <span>↩️ 30日間返品保証</span>
              <span>🔒 安全なお支払い</span>
            </div>
          </section>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="section-title mb-8">関連製品</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition flex"
                >
                  <Image src={p.image}
                    alt={`${p.name} - ${p.shortDescription}`}
                    className="w-32 h-32 object-cover"
                    width={128}
                    height={128}
                    loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-1">{p.name}</h3>
                    <p className="text-accent font-bold">¥{p.price.toLocaleString()}（税込）</p>
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
