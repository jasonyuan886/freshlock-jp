'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `送信に失敗しました (${res.status})`);
      }
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || '送信に失敗しました。しばらくしてからもう一度お試しください。');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">お問い合わせ</h1>
        <p className="section-subtitle">
          ご質問・ご相談など、お気軽にお問い合わせください。24時間以内にご返信いたします。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-primary mb-2">送信完了しました</h2>
              <p className="text-gray-500">お問い合わせありがとうございます。担当者より折り返しご連絡いたします。</p>
              <button
                onClick={() => { setStatus('idle'); setErrorMsg(''); }}
                className="mt-6 text-sm text-accent hover:underline"
              >
                別のメッセージを送信する
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
                <input
                  id="name" name="name" type="text" required maxLength={100}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                <input
                  id="email" name="email" type="email" required maxLength={200}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ種別</label>
                <select
                  id="subject" name="subject" required
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                >
                  <option>一般的なご質問</option>
                  <option>ご注文について</option>
                  <option>返品・交換について</option>
                  <option>製品について</option>
                  <option>法人・卸売について</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
                <textarea
                  id="message" name="message" required rows={5} maxLength={5000}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? '送信中…' : '送信する'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">お問い合わせ先</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">メール</p>
                  <p className="text-gray-600">support@freshlocksealer.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="font-medium">対応時間</p>
                  <p className="text-gray-600">24時間以内にご返信（年中無休）</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium">所在地</p>
                  <p className="text-gray-600">
                    FreshLock Japan 運営事務局<br />
                    （オンラインストアのため実店舗はございません）
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-primary mb-2">クイックリンク</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-accent hover:underline">よくあるご質問</a></li>
              <li><a href="/returns" className="text-accent hover:underline">返品・交換ポリシー</a></li>
              <li><a href="/contact" className="text-accent hover:underline">配送について</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
