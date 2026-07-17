import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/cart-context';
import { generateOrganizationSchema, generateWebsiteSchema, SITE_URL } from '@/lib/schema';

const siteName = 'FreshLock（フレッシュロック）';
const title = 'FreshLock（フレッシュロック）公式 | ハンディ真空ポンプで食材の鮮度を5倍長持ち';
const description =
  'FreshLock公式サイト。コードレス・ワンタッチのハンディ真空ポンプで、食材の鮮度を最大5倍長持ち。繰り返し使える専用真空チャック袋付き、USB-C充電。¥8,000以上のご注文で全国送料無料。30日間返品保証。';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords:
    '真空パック機,ハンディ真空ポンプ,真空保存機,コードレス真空パック,食品真空保存,真空チャック袋,繰り返し使える保存袋,食品保存,作り置き,食品ロス削減,FreshLock,フレッシュロック,キッチン家電',
  applicationName: siteName,
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: '/',
    languages: {
      'ja': 'https://jp.freshlocksealer.com',
      'en': 'https://www.freshlocksealer.com',
      'x-default': 'https://www.freshlocksealer.com',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName,
    title,
    description,
    locale: 'ja_JP',
    images: [
      {
        url: '/images/products/sealer-main.jpg',
        width: 1200,
        height: 630,
        alt: 'FreshLock ハンディ真空ポンプ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/products/sealer-main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const orgSchema = generateOrganizationSchema();
const websiteSchema = generateWebsiteSchema();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
