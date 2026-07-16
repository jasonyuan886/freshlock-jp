import type { Metadata } from 'next';
import { products } from '@/lib/data';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'ハンディ真空ポンプ・真空保存袋の公式通販',
  description:
    'FreshLock（フレッシュロック）公式オンラインストア。コードレス式ハンディ真空ポンプ、スターターキット、繰り返し使える真空チャック袋を販売。¥8,000以上で全国送料無料。',
  alternates: { canonical: '/products' },
};

const itemListSchema = {
  '@context': 'https://schema.org/',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://jp.freshlocksealer.com/products/${p.slug}`,
    name: p.name,
    image: `https://jp.freshlocksealer.com${p.image}`,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProductsClient />
    </>
  );
}
