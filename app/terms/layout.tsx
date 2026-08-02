import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 — FreshLock Japan',
  description:
    'FreshLock Japanの利用規約。ご注文、お支払い、配送、返品、知的財産、責任の制限などについて定めています。',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
