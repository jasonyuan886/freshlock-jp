import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ — FreshLock（フレッシュロック）サポート',
  description:
    'FreshLockカスタマーサポートへのお問い合わせページ。ご注文、配送、返品・交換、製品の使い方など、何でもお気軽にご相談ください。営業日内24時間以内にご返信します。',
  alternates: { canonical: '/contact' },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
