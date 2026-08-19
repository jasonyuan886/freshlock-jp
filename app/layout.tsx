import type { Metadata } from 'next';

import Script from 'next/script';

import './globals.css';

import Header from '@/components/Header';

import Footer from '@/components/Footer';

import FomoPurchaseNotification from '@/components/FomoPurchaseNotification';

import { CartProvider } from '@/lib/cart-context';

import { generateOrganizationSchema, generateWebsiteSchema, SITE_URL } from '@/lib/schema';



const siteName = 'FreshLock Japan（フレッシュロック）';

const title = 'FreshLock公式｜ハンディ真空ポンプで作り置き・小分け冷凍・冷凍焼け防止';

const description =

  'FreshLock（フレッシュロック）公式サイト。片手でワンタッチのコードレス式ハンディ真空ポンプ。-60kPa吸引力・USB-C充電・着脱式汁受けで汁物対応・専用袋不要・BPAフリー・音が静か。作り置き・離乳食の小分け冷凍・冷凍焼け防止に。¥5,500以上のご注文で送料無料対応、7日間返品保証、本体1年保証。';



export const metadata: Metadata = {

  metadataBase: new URL(SITE_URL),

  title: {

    default: title,

    template: `%s | ${siteName}`,

  },

  description,

  keywords:

    '真空パック機,ハンディ真空ポンプ,真空保存機,コードレス真空パック,食品真空保存,真空チャック袋,作り置き,離乳食,小分け冷凍,冷凍焼け防止,コンパクト,片手でワンタッチ,音が静か,汁物対応,専用袋不要,レバーが軽い,丸洗いOK,BPAフリー,USB-C,FreshLock,フレッシュロック,キッチン家電',

  applicationName: siteName,

  icons: {

    icon: '/favicon-32.png',

    apple: '/apple-touch-icon.png',

  },

  alternates: {},

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

  verification: {

    google: 's5k1bV4GOf6JitkZAj0KewRM2B2TgAO5N_6aDIZ59cM',

    other: {

      'p:domain_verify': '35f8877a03378002c70a19e5750a86c4',

    },

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

    <html lang="ja-JP">

      <head>

        
        
        
                <link rel="alternate" hrefLang="ja-JP" href="https://jp.freshlocksealer.com" />
        <link rel="alternate" hrefLang="en-US" href="https://www.freshlocksealer.com" />
        <link rel="alternate" hrefLang="th-TH" href="https://th.freshlocksealer.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.freshlocksealer.com" />
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

          <FomoPurchaseNotification />

        </CartProvider>

      </body>

    </html>

  );

}
