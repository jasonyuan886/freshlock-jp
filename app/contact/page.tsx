'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        {/* Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-primary mb-2">送信完了しました</h2>
              <p className="text-gray-500">お問い合わせありがとうございます。担当者より折り返しご連絡いたします。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                <input
                  type="email"
                  required
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ種別</label>
                <select className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                  <option>一般的なご質問</option>
                  <option>ご注文について</option>
                  <option>返品・交換について</option>
                  <option>製品について</option>
                  <option>法人・卸売について</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
                <textarea
                  required
                  rows={5}
                  className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                送信する
              </button>
            </form>
          )}
        </div>

        {/* Info */}
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
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium">電話</p>
                  <p className="text-gray-600">050-1234-5678</p>
                  <p className="text-sm text-gray-400">平日 10:00〜17:00（日本時間）</p>
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
