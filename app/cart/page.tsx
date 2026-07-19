import type { Metadata } from 'next';
import CartPage from './_client';

export const metadata: Metadata = {
  title: 'カート',
  description: 'FreshLock公式サイトのショッピングカート。',
  alternates: { canonical: '/cart' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
