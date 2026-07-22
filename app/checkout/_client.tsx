'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/data';
import Image from 'next/image';

const STANDARD_FEE = 800;
const EXPRESS_FEE = 1500;
const EXPRESS_UPGRADE = 800;

const prefectures = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県',
  '三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県',
  '鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県',
  '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県',
];

// Hokkaido/Okinawa remote surcharge ¥500
const REMOTE_PREFECTURES = ['北海道', '沖縄県'];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, shippingMethod, setShippingMethod, getShippingCost } = useCart();
  const [form, setForm] = useState({
    lastName: '', firstName: '', email: '', phone: '',
    postal: '', prefecture: '', city: '', address1: '', address2: '',
  });
  const isRemote = REMOTE_PREFECTURES.includes(form.prefecture);
  const remoteSurcharge = isRemote ? 500 : 0;
  const shipping = getShippingCost() + remoteSurcharge;
  const total = totalPrice + shipping;

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const formatPrice = (p: number) => `¥${Math.round(p).toLocaleString()}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    try {
      const shippingCost = getShippingCost() + remoteSurcharge;
      if (paymentMethod === 'stripe') {
        const res = await fetch('/api/checkout', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, shippingInfo: { email: form.email }, shippingMethod, shippingCost }),
        });
        const data = await res.json();
        if (data.url) { window.location.href = data.url; }
        else if (data.error) { setError(data.error); setProcessing(false); }
        else { alert('⚠️ 現在決済システム準備中です。デモモードにてご注文を送信しました。'); clearCart(); setProcessing(false); }
      } else if (paymentMethod === 'paypay') {
        alert('⚠️ PayPayは近日対応予定です。クレジットカード/Apple Pay/Google Pay決済をご利用ください。');
        setProcessing(false);
      }
    } catch (err: any) {
      setError(err.message || '決済に失敗しました'); setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">カートが空です</h1>
        <p className="text-gray-500 mb-8">お会計する商品がありません。</p>
        <Link href="/products" className="btn-primary">製品を見る</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">お会計</h1>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">エラー：{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">お客様情報</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="山田"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">名</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="太郎"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="example@email.com"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="090-1234-5678"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">配送先住所</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
                  <input type="text" name="postal" value={form.postal} onChange={handleChange} required maxLength={8} placeholder="123-4567"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">都道府県</label>
                  <select name="prefecture" value={form.prefecture} onChange={handleChange} required
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white appearance-none">
                    <option value="">選択してください</option>
                    {prefectures.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">市区町村</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="渋谷区渋谷"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">町名・番地</label>
                  <input type="text" name="address1" value={form.address1} onChange={handleChange} required placeholder="1-2-3"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">建物名・部屋番号（任意）</label>
                  <input type="text" name="address2" value={form.address2} onChange={handleChange} placeholder="○○マンション 101号室"
                    className="w-full border rounded-lg px-4 py-2.5 min-h-[44px] text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">国</label>
                  <input type="text" value="日本" readOnly className="w-full border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-4">配送方法</h2>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition min-h-[44px] ${shippingMethod === 'standard' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="shipmethod" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="mt-1 accent-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">国際航空便（追跡あり）</span>
                      <span className="font-semibold">{totalPrice >= FREE_SHIPPING_THRESHOLD ? <span className="text-accent">無料</span> : '¥800'}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">7–12営業日 · 中国深センより国際航空便で発送（リチウム電池対応）</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition min-h-[44px] ${shippingMethod === 'express' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="shipmethod" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="mt-1 accent-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">速達配送（DHL 国際エクスプレス）</span>
                      <span className="font-semibold">{totalPrice >= FREE_SHIPPING_THRESHOLD ? '¥800' : '¥1,500'}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">2–4営業日 · DHLエクスプレス</p>
                  </div>
                </label>
              </div>
              {isRemote && (
                <p className="text-xs text-orange-600 mt-3 p-2 bg-orange-50 rounded">
                  ⚠️ 北海道・沖縄は遠隔地追加料金+¥500が適用されます。
                </p>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
              <h2 className="font-bold text-primary text-lg mb-2">お支払い方法</h2>
              <p className="text-xs text-gray-500 mb-3">Apple Pay・Google Pay・VISA・Mastercard、主要クレジットカードに対応。PayPay は近日対応予定です。</p>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition min-h-[44px] ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary" />
                  <div>
                    <span className="font-medium">💳 クレジットカード / デビットカード / Apple Pay / Google Pay</span>
                    <p className="text-xs text-gray-500 mt-0.5">Visa・Mastercard・Amex — Stripeによる安全な決済</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition min-h-[44px] opacity-50 ${paymentMethod === 'paypay' ? 'border-primary bg-primary/5' : ''}`}>
                  <input type="radio" name="payment" value="paypay" checked={paymentMethod === 'paypay'} onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary" disabled />
                  <div>
                    <span className="font-medium">🅿️ PayPay（近日対応）</span>
                    <p className="text-xs text-gray-500 mt-0.5">まもなくご利用いただけます</p>
                  </div>
                </label>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-start gap-2">
                <span className="text-green-600">🔒</span>
                <p className="text-xs text-green-700">お支払い情報は暗号化されて安全に処理されます。カード情報は当社サーバーに保存されません。</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow sticky top-24">
              <h2 className="font-bold text-primary text-lg mb-4">ご注文内容</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-3">
                    <Image src={item.product.image} alt={`${item.product.name}`} className="w-14 h-14 rounded-lg object-cover" width={56} height={56} loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">数量：{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">小計</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">送料（{shippingMethod === 'express' ? '速達' : '通常'}）</span>
                  <span>{getShippingCost() === 0 && !isRemote ? <span className="text-accent font-medium">無料</span> : formatPrice(getShippingCost())}</span>
                </div>
                {isRemote && (
                  <div className="flex justify-between text-orange-600">
                    <span>遠隔地追加料金</span><span>+¥500</span>
                  </div>
                )}
                {totalPrice < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-accent font-medium">あと{formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}で国際航空便が送料無料に！</p>
                )}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>合計</span><span>{formatPrice(total)}（税込）</span>
              </div>
              <button type="submit" disabled={processing}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]">
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    処理中...
                  </span>
                ) : `${formatPrice(total)}（税込）を支払う`}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">🔒 安全なお会計 — データは暗号化されています</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
