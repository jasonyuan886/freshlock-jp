import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'FreshLock Japan — ハンディ真空保存機｜食材の鮮度を5倍長持ち',
  description:
    'FreshLock（フレッシュロック）公式サイト。コードレス・ワンタッチのハンディ真空ポンプで、食材の鮮度を最大5倍長持ち。全国一律送料、¥8,000以上で送料無料。30日間返品保証。',
  keywords: '真空パック機,ハンディ真空ポンプ,食品保存,FreshLock,フレッシュロック,真空保存,チャック袋,キッチン家電,作り置き,食品ロス削減',
  openGraph: {
    title: 'FreshLock Japan — ハンディ真空保存機',
    description: '食材の鮮度を最大5倍長持ち。コードレス・ワンタッチ。全国送料対応。',
    images: ['/images/products/sealer-main.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
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
