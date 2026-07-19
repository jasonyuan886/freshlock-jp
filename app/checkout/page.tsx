import type { Metadata } from 'next';
import CheckoutPage from './_client';

export const metadata: Metadata = {
  title: 'お会計',
  description: 'FreshLockのご注文手続きページ。',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutPage />;
}
