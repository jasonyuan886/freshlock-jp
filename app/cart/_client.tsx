'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import Image from 'next/image';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, shippingMethod, setShippingMethod, getShippingCost } = useCart();
  const shipping = getShippingCost();
  const grandTotal = totalPrice + shipping;
  const formatPrice = (price: number) => `¥${Math.round(price).toLocaleString()}`;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-primary mb-4">カートは空です</h1>
        <p className="text-gray-500 mb-8">まだ商品が追加されていません。</p>
        <Link href="/products" className="btn-primary">製品を見る</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">ショッピングカート</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.slug} className="bg-white rounded-xl p-4 sm:p-6 shadow flex gap-4 sm:gap-6">
              <Link href={`/products/${item.product.slug}`}>
                <Image src={item.product.image} alt={`${item.product.name} — FreshLock（フレッシュロック）`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover" width={128} height={128} loading="lazy" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.slug}`}>
                  <h2 className="font-bold text-primary hover:underline">{item.product.name}</h2>
                </Link>
                <p className="text-accent font-bold mt-1">{formatPrice(item.product.price)}（税込）</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.slug, item.quantity - 1)} className="w-10 h-10 min-h-[44px] flex items-center justify-center text-base hover:bg-gray-100 transition rounded-l-lg" aria-label="数量を減らす">−</button>
                    <span className="px-2 text-sm font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1)} className="w-10 h-10 min-h-[44px] flex items-center justify-center text-base hover:bg-gray-100 transition rounded-r-lg" aria-label="数量を増やす">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.slug)} className="text-red-500 text-sm hover:underline py-2 px-1 -ml-1 min-h-[44px] inline-flex items-center">削除</button>
                </div>
              </div>
              <p className="font-bold text-base sm:hidden mt-1 text-accent">{formatPrice(item.product.price * item.quantity)}</p>
              <div className="text-right hidden sm:block self-start">
                <p className="font-bold text-lg">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow h-fit lg:sticky lg:top-24">
          <h2 className="font-bold text-primary text-lg mb-4">ご注文内容</h2>

          {/* Free-shipping nudge (top, prominent) */}
          {totalPrice < FREE_SHIPPING_THRESHOLD ? (
            <div className="mb-4 rounded-lg bg-accent/10 border border-accent/20 p-3 text-sm">
              <p className="font-semibold text-accent">
                あと <span className="text-base">{formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}</span> で<span className="font-bold">送料無料</span>！ 🎉
              </p>
              <p className="text-gray-600 mt-1.5 text-xs leading-relaxed">
                <Link href="/products/vacuum-seal-bags-30-pack" className="underline text-primary font-medium hover:text-primary-700">真空チャック袋30枚（¥2,980）</Link>
                {' '}を追加すると、送料無料ラインに近づきます。
              </p>
            </div>
          ) : (
            <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm">
              <p className="font-semibold text-green-700">🎉 送料無料（国際航空便・追跡あり）が適用されました！</p>
            </div>
          )}

          <div className="space-y-2 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">小計</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* Shipping method */}
          <div className="mb-4">
            <p className="font-semibold text-sm text-gray-700 mb-2">配送方法</p>
            <div className="space-y-2">
              <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition min-h-[44px] ${shippingMethod === 'standard' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">国際航空便（追跡あり）</span>
                    <span className="font-semibold text-sm">{totalPrice >= FREE_SHIPPING_THRESHOLD ? <span className="text-accent">無料</span> : '¥800'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">7–12営業日・中国深センより国際航空便で発送</p>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition min-h-[44px] ${shippingMethod === 'express' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">速達配送（DHL）</span>
                    <span className="font-semibold text-sm">{totalPrice >= FREE_SHIPPING_THRESHOLD ? '¥800' : '¥1,500'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">2–4営業日・DHLエクスプレス（国際速達）</p>
                </div>
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">※北海道・沖縄・一部離島は遠隔地追加料金¥500がかかる場合があります</p>
          </div>

          <div className="space-y-2 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">送料</span>
              <span>{shipping === 0 ? <span className="text-accent font-medium">無料</span> : formatPrice(shipping)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>合計</span>
            <span>{formatPrice(grandTotal)}（税込）</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full block text-center min-h-[44px] inline-flex items-center justify-center">ご購入手続きへ</Link>
          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-primary mt-4 py-2">← 買い物を続ける</Link>
        </div>
      </div>
    </div>
  );
}
