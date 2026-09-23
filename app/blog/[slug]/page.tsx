import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 記事個別のアイキャッチ画像はまだ無いため、当面は共通の製品画像を使う。
// 画像が無いと BlogPosting のリッチリザルト対象外になり、SNS 共有時にも
// プレビューが出ない（JP サイトは流入の98%が自然検索なので、ここは効く）。
const OG_IMAGE = 'https://jp.freshlocksealer.com/images/products/sealer-main.jpg';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    // hreflang は日本語版の自己参照のみにする。
    // 以前は en-US / th-TH を「同じ slug が英語版・タイ語版にも存在する」前提で
    // 出力していたが、3サイトの slug 体系は独立しており、実測すると
    // **JP の全41記事について EN/TH 側は 404**（2026-09-22 確認。
    // vacuum-seal-bread のような英語形 slug も含め、一致は1件も無し）。
    // 到達しない hreflang は「無意味」ではなく有害で、相互参照が取れない
    // クラスタは Google に破棄され、存在しない URL を繰り返しクロールさせる。
    // 翻訳対応表が無い以上、自己参照と x-default だけを残すのが正しい。
    // 将来 EN/TH と記事を対応付けるなら、記事ごとの明示的なマッピングを持つこと
    // （slug の一致に依存させない）。
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'ja-JP': `https://jp.freshlocksealer.com/blog/${slug}`,
        'x-default': `https://jp.freshlocksealer.com/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://jp.freshlocksealer.com/blog/${slug}`,
      siteName: 'FreshLock Japan',
      images: [{ url: OG_IMAGE, width: 1200, height: 1200, alt: 'FreshLock ハンディ真空パック機' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    // image はリッチリザルトの必須項目。欠けていると Article 系の
    // リッチリザルト対象外になる（2026-09-22 実測で欠落を確認）。
    image: [OG_IMAGE],
    inLanguage: 'ja-JP',
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'FreshLock Japan',
      url: 'https://jp.freshlocksealer.com',
    },
    mainEntityOfPage: `https://jp.freshlocksealer.com/blog/${slug}`,
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link href="/blog" className="text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center mb-6">
          ← 記事一覧に戻る
        </Link>
        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ja-JP', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
            <span>・</span>
            <span>{post.readingTime}</span>
            {post.tags.length > 0 && (
              <>
                <span>・</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600">{post.description}</p>
          <p className="text-sm text-gray-500 mt-4">{post.author}</p>
        </header>
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-primary-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">FreshLockをはじめてみませんか？</h3>
            <p className="text-gray-600 mb-4">
              コードレス・ハンディタイプの真空保存機FreshLockは、ワンタッチで食材を最長5倍長持ちさせます。
            </p>
            <Link
              href="/products/freshlock-starter-kit"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              スターターキットを見る →
            </Link>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16" aria-labelledby="related-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              関連記事
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{rp.description}</p>
                  <p className="text-xs text-gray-400">{rp.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
