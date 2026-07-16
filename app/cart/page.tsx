'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/data';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const formatPrice = (price: number) => `¥${Math.round(price).toLocaleString()}`;
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-primary mb-4">カートは空です</h1>
        <p className="text-gray-500 mb-8">まだ商品が追加されていません。</p>
        <Link href="/products" className="btn-primary">
          製品を見る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">ショッピングカート</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.slug}
              className="bg-white rounded-xl p-4 sm:p-6 shadow flex gap-4 sm:gap-6"
            >
              <Link href={`/products/${item.product.slug}`}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.slug}`}>
                  <h2 className="font-bold text-primary hover:underline">{item.product.name}</h2>
                </Link>
                <p className="text-accent font-bold mt-1">{formatPrice(item.product.price)}（税込）</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.slug)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    削除
                  </button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-bold text-lg">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow h-fit sticky top-24">
          <h2 className="font-bold text-primary text-lg mb-4">ご注文内容</h2>
          <div className="space-y-2 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">小計</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">送料</span>
              <span>{shippingFee === 0 ? <span className="text-accent font-medium">無料</span> : formatPrice(shippingFee)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>合計</span>
            <span>{formatPrice(grandTotal)}（税込）</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full block text-center">
            ご購入手続きへ
          </Link>
          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-primary mt-4">
            ← 買い物を続ける
          </Link>
          {totalPrice < FREE_SHIPPING_THRESHOLD && (
            <p className="text-xs text-gray-400 mt-4 text-center">
              あと{formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)}で送料無料！
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
