import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ショッピングカート',
  description:
    'FreshLockのカート内容をご確認ください。¥5,500以上で全国送料無料、30日間返品保証、本体2年保証。',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
