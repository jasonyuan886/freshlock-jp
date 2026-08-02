import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ご注文完了',
  description:
    'FreshLockのご注文が完了しました。注文確認メールと追跡情報をご確認ください。',
  robots: { index: false, follow: false },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
