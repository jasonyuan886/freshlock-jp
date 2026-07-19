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
                    <button onClick={() => updateQuantity(item.product.slug, item.quantity - 1)} className="px-3 py-1.5 text-sm hover:bg-gray-100 transition">−</button>
                    <span className="px-3 py-1.5 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.slug, item.quantity + 1)} className="px-3 py-1.5 text-sm hover:bg-gray-100 transition">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.slug)} className="text-red-500 text-sm hover:underline">削除</button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-bold text-lg">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow h-fit sticky top-24">
          <h2 className="font-bold text-primary text-lg mb-4">ご注文内容</h2>
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
              <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${shippingMethod === 'standard' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">通常配送（佐川急便）</span>
                    <span className="font-semibold text-sm">{totalPrice >= FREE_SHIPPING_THRESHOLD ? <span className="text-accent">無料</span> : '¥1,200'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">5–8営業日、中国深センより航空便</p>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${shippingMethod === 'express' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">速達配送（DHL）</span>
                    <span className="font-semibold text-sm">{totalPrice >= FREE_SHIPPING_THRESHOLD ? '¥800' : '¥2,000'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">2–4営業日、DHLエクスプレス</p>
                </div>
              </label>
            </div>
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
          <Link href="/checkout" className="btn-primary w-full block text-center">ご購入手続きへ</Link>
          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-primary mt-4">← 買い物を続ける</Link>
          {totalPrice < FREE_SHIPPING_THRESHOLD && (
            <p className="text-xs text-gray-400 mt-4 text-center">あと{formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}で通常配送送料無料！</p>
          )}
          <p className="text-xs text-gray-400 mt-2 text-center">※北海道・沖縄は追加料金¥500がかかります</p>
        </div>
      </div>
    </div>
  );
}
