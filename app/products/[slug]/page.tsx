import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, reviews, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import type { Product } from '@/lib/types';
import { generateProductSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/schema';
import AddToCartClient from './AddToCartClient';
import FrequentlyBoughtTogether from '@/components/FrequentlyBoughtTogether';
import ProductGallery from '@/components/ProductGallery';
import FomoLiveViewers from '@/components/FomoLiveViewers';
import FomoStockIndicator from '@/components/FomoStockIndicator';
import FomoCountdownTimer from '@/components/FomoCountdownTimer';
import Image from 'next/image';

type Params = { slug: string };

function StarRating({ rating, size = 'text-base' }: { rating: number; size?: string }) {
  return (
    <span className={size}>
      {'★'.repeat(rating)}
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewsSection() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const total = reviews.length;
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    dist[r.rating] = (dist[r.rating] || 0) + 1;
  });
  return (
    <section id="reviews" className="mt-16 border-t pt-12" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-2xl font-bold text-primary mb-6">カスタマーレビュー</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-primary">{avg}</div>
          <div className="flex justify-center md:justify-start mt-1">
            <StarRating rating={Math.round(Number(avg))} />
          </div>
          <p className="text-sm text-gray-500 mt-1">{total}件のレビュー（購入者様の声）</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = dist[star] || 0;
            const pct = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-gray-600">{star} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <article key={r.name + r.date} className="bg-white border rounded-xl p-5" itemScope itemType="https://schema.org/Review">
            <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
              <meta itemProp="name" content="FreshLock Pro ハンディ真空ポンプ" />
            </div>
            <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={String(r.rating)} />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <StarRating rating={r.rating} size="text-sm" />
              {r.verified && (
                <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">✓ 購入済み</span>
              )}
            </div>
            <p className="text-gray-700 text-sm mb-3 leading-relaxed" itemProp="reviewBody">&ldquo;{r.text}&rdquo;</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-primary" itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{r.name}</span>
              </span>
              <time dateTime={r.date}>
                {new Date(r.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            {r.images && r.images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {r.images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${r.name}様のレビュー写真`}
                    loading="lazy"
                    className="w-20 h-20 object-cover rounded border border-gray-200"
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="mailto:freshlocksealer@gmail.com?subject=FreshLock%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E9%80%81%E4%BF%A1&body=FreshLock%E3%81%94%E8%B3%BC%E5%85%A5%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86%E3%81%94%E3%81%96%E3%81%84%E3%81%BE%E3%81%99%E3%80%82%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%82%92%E3%81%8A%E8%81%9E%E3%81%8B%E3%81%9B%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84..."
          className="inline-block btn-secondary"
        >
          ✍️ レビューを書く
        </a>
        <p className="text-xs text-gray-500 mt-2">レビューは実際にご購入いただいたお客様の声です。好意的なレビューに報酬を支払うことはありません。</p>
      </div>
    </section>
  );
}

function StickyMobileATC({ productName, productPrice }: { productName: string; productPrice: string }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 truncate">{productName}</div>
        <div className="text-accent font-bold">{productPrice}</div>
      </div>
      <a href="#purchase" className="btn-primary text-sm px-5 py-2 whitespace-nowrap">
        カートに入れる
      </a>
    </div>
  );
}

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

  // よく一緒に購入されています
  const getBundleProducts = (): Product[] => {
    if (product.slug === 'freshlock-pro') {
      return products.filter((p) => p.slug === 'vacuum-seal-bags-30-pack');
    }
    if (product.slug === 'freshlock-starter-kit') {
      return products.filter((p) => p.slug === 'vacuum-seal-bags-50-pack');
    }
    if (product.slug === 'vacuum-seal-bags-30-pack') {
      return products.filter((p) => p.slug === 'freshlock-pro');
    }
    if (product.slug === 'vacuum-seal-bags-50-pack') {
      return products.filter((p) => p.slug === 'vacuum-seal-bags-30-pack');
    }
    return [];
  };
  const bundleProducts = getBundleProducts();

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
            <ProductGallery images={product.images.length > 0 ? product.images : [product.image]} name={product.name} shortDescription={product.shortDescription} />
          </section>

          {/* Info */}
          <section>
            {product.badge && (
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" itemProp="name">{product.name}</h1>

            {/* FOMO: Live viewers */}
            <FomoLiveViewers />

            <p className="text-3xl font-bold text-accent mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="JPY" />
              <meta itemProp="price" content={String(product.price)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              {formatPrice(product.price)}{' '}
              <span className="text-sm text-gray-400 font-normal">（税込）</span>
            </p>

            {/* FOMO: Stock indicator */}
            <FomoStockIndicator initialStock={15} />

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

            <div id="purchase">
              <FomoCountdownTimer variant="pdp" />
              <AddToCartClient product={product} />
            </div>

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
                    <p className="leading-relaxed" itemProp="text">はい。USB-C充電式で、約2時間のフル充電で80〜100回の真空引きが可能。毎日のキッチン使いで数日〜1週間持ちます。</p>
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
              <span>🚚 全国一律送料¥600（¥{FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で無料）</span>
              <span>↩️ 30日間返品保証</span>
              <span>🔒 安全なお支払い</span>
            </div>
          </section>

        {/* Customer Reviews */}
        <ReviewsSection />

        {bundleProducts.length > 0 && (
          <FrequentlyBoughtTogether
            mainProduct={product}
            bundleProducts={bundleProducts}
            discountPercent={10}
          />
        )}
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
                    className="w-32 h-32 object-contain bg-stone-50"
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
      <StickyMobileATC productName={product.name} productPrice={formatPrice(product.price)} />
      <div className="md:hidden h-20" />
    </>
  );
}
