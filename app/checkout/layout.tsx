import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご注文手続き',
  description:
    'FreshLock公式サイトのご注文手続きページです。安全な決済、全国送料無料（¥5,500以上）、30日間返品保証。',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
