import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '返品・交換ポリシー — 30日間返品保証｜FreshLock Japan',
  description:
    'FreshLock Japanの返品・交換ポリシー。商品到着後30日以内であれば理由を問わず返品・交換可能。本体2年保証付き。',
  alternates: { canonical: '/returns' },
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
