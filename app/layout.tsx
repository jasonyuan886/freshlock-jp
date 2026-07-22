import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/cart-context';
import { generateOrganizationSchema, generateWebsiteSchema, SITE_URL } from '@/lib/schema';

const siteName = 'FreshLock（フレッシュロック）';
const title = 'FreshLock Pro | 液体・調味液・釣った魚も真空パックできるハンディ真空パック機';
const description =
  'FreshLock Pro コードレスハンディ真空パック機。透明な機械式自動排水カップで液体・ソース・調味液・煮汁・釣った魚のドリップもモーター故障なしで吸引可能。専用袋はリンゴ色一体型ジップスライダー付きでクリップ紛失なし。USB-C充電・ワンタッチ操作・繰り返し使える真空保存バッグ。食材の鮮度を最大5倍長持ち、冷凍焼け・酸化を防止。';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords:
    'ハンディ真空パック機,真空シーラー,液体対応真空パック,真空保存バッグ,コードレス真空シーラー,ハンディ真空ポンプ,食品真空保存,真空調理,sous vide,冷凍焼け防止,釣り 真空パック,アウトドア 真空保存,作り置き 真空パック,キャンプ 保存,FreshLock,フレッシュロック',
  applicationName: siteName,
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32' }, { url: '/logo.svg', type: 'image/svg+xml' }],
    apple: '/logo.svg',
  },
  alternates: {
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
        alt: 'FreshLock Pro ハンディ真空パック機',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/products/sealer-main.jpg'],
  },
  verification: {
    google: 's5k1bV4GOf6JitkZAj0KewRM2B2TgAO5N_6aDIZ59cM',
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N16R0F2B1Y" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N16R0F2B1Y');
          `}
        </Script>
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
