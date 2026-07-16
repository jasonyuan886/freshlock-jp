import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs } from '@/lib/data';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'よくあるご質問',
  description:
    'FreshLock（フレッシュロック）のハンディ真空ポンプ・専用袋の使い方、送料、返品・交換、バッテリー持続時間など、よくあるご質問をまとめました。',
  alternates: { canonical: '/faq' },
};

const faqSchema = generateFAQSchema(faqs);

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="section-title">よくあるご質問</h1>
          <p className="section-subtitle">
            FreshLock製品・配送・サポートについて、よくいただくご質問をまとめました。
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.question} className="bg-white rounded-xl p-6 shadow-sm group">
              <summary className="font-semibold text-primary cursor-pointer list-none flex justify-between items-center">
                {f.question}
                <span className="ml-4 text-accent group-open:rotate-180 transition-transform text-xl" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">その他のご質問</h2>
          <p className="text-gray-300 mb-6">
            お探しの回答が見つからない場合は、お気軽にお問い合わせください。24時間以内にご返信いたします。
          </p>
          <Link href="/contact" className="btn-primary">
            お問い合わせ
          </Link>
        </div>
      </div>
    </>
  );
}
