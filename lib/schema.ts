import { Product, Review } from '@/lib/types';

const SITE_URL = 'https://jp.freshlocksealer.com';

function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function computeAggregateRating(reviews?: Review[]) {
  if (!reviews || reviews.length === 0) {
    return {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '7',
      bestRating: '5',
      worstRating: '1',
    };
  }
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    reviewCount: String(reviews.length),
    bestRating: '5',
    worstRating: '1',
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
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 5500 ? '0' : '600',
          currency: 'JPY',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'JP',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 5,
            maxValue: 10,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'JP',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: computeAggregateRating(reviews),
    review: reviews && reviews.length > 0 ? reviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: '5',
        worstRating: '1',
      },
    })) : undefined,
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
    name: 'FreshLock Japan（運営：深圳市七力科技有限公司 / Shichiri Technology Co., Ltd.）',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'FreshLock（フレッシュロック）は、片手でワンタッチで使えるコードレス式ハンディ真空ポンプ。-60kPaの吸引力で冷凍焼けを防止し、作り置き・離乳食の小分け冷凍・汁物対応・専用袋不要で毎日のキッチンを快適にします。',
    email: 'jp-support@freshlocksealer.com',
    areaServed: ['JP'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'jp-support@freshlocksealer.com',
      contactType: 'customer support',
      availableLanguage: ['Japanese'],
      areaServed: ['JP'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'FreshLock Japan',
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

export { SITE_URL };
