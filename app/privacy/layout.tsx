import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー — FreshLock Japan',
  description:
    'FreshLock Japanのプライバシーポリシー。お客様の個人情報の収集・利用・保護について、個人情報保護法（APPI）およびGDPRに準拠して説明します。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
