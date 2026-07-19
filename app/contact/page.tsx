import type { Metadata } from 'next';
import ContactPage from './_client';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'FreshLock（フレッシュロック）カスタマーサポートへのお問い合わせはこちら。24時間以内にご返信いたします。メール: support@freshlocksealer.com',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactPage />;
}
