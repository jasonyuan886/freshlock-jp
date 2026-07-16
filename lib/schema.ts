import { Product } from '@/lib/types';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images || [product.image],
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'FreshLock',
    },
    offers: {
      '@type': 'Offer',
      url: `https://jp.freshlocksealer.com/products/${product.slug}`,
      priceCurrency: 'JPY',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'FreshLock Japan',
    url: 'https://jp.freshlocksealer.com',
    logo: 'https://jp.freshlocksealer.com/logo.svg',
    description: '日本の食卓に鮮度を長持ちさせる、コードレスハンディ真空保存ブランド。',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
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
