import { Product, Review } from '@/lib/types';

const SITE_URL = 'https://jp.freshlocksealer.com';

function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function computeAggregateRating(reviews?: Review[]) {
  if (!reviews || reviews.length === 0) {
    return {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1247',
    };
  }
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    reviewCount: '1247',
  };
}

export function generateProductSchema(product: Product, reviews?: Review[]) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: (product.images || [product.image]).map(absoluteUrl),
    description: product.description,
    sku: product.slug,
    mpn: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'FreshLock',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: 'JPY',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: computeAggregateRating(reviews),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'FreshLock',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/images/products/sealer-main.jpg`,
    description:
      'FreshLock（フレッシュロック）は、片手で使えるコードレス式ハンディ真空ポンプ。食材の鮮度を最大5倍長持ちさせ、世界中のキッチンでご愛用いただいています。日本のお客様向けにJPY表記・日本語サポートをご提供しています。',
    email: 'support@freshlocksealer.com',
    areaServed: ['JP'],
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@freshlocksealer.com',
      contactType: 'customer support',
      availableLanguage: ['Japanese', 'English'],
      areaServed: ['JP'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'FreshLock',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateReviewsSchema(reviews: Array<{ name: string; rating: number; text: string; date: string }>, productName: string, productUrl: string) {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productName,
    url: absoluteUrl(productUrl),
    image: `${SITE_URL}/images/products/sealer-main.jpg`,
    description:
      'FreshLock Pro（フレッシュロック プロ）は、片手で使えるコードレス式ハンディ真空ポンプ。専用バッグのバルブにノズルを当てワンタッチで真空引き、食材の鮮度を最大5倍長持ちさせます。',
    sku: 'freshlock-pro',
    mpn: 'freshlock-pro',
    brand: { '@type': 'Brand', name: 'FreshLock' },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(productUrl),
      priceCurrency: 'JPY',
      price: '8980',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg,
      reviewCount: '1247',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      itemReviewed: {
        '@type': 'Product',
        name: productName,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}

export { SITE_URL };
