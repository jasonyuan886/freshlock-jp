'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, products } from '@/lib/data';
import Image from 'next/image';
import { useMemo } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://jp.freshlocksealer.com/cart',
  },
};


export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, addToCart } = useCart();

  const formatPrice = (price: number) => `¥${Math.round(price).toLocaleString()}`;
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shippingFee;

  const cartSlugs = useMemo(() => items.map((i) => i.product.slug), [items]);

  // 送料無料までの金額に応じておすすめ商品を選ぶ
  const recs = useMemo(() => {
    const gap = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
    if (gap === 0) return [];

    const bagProducts = products.filter(
      (p) => p.category === 'bags' && !cartSlugs.includes(p.slug),
    );
    const cheapestBag = products
      .filter((p) => p.category === 'bags')
      .sort((a, b) => a.price - b.price)[0];

    const list: Array<{ slug: string; name: string; price: number; image: string; reason: string }> = [];

    const closesGap = bagProducts.filter((p) => p.price >= gap - 1).sort((a, b) => a.price - b.price);
    if (closesGap.length > 0) {
      const p = closesGap[0];
      list.push({
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        reason: `追加で送料無料達成！（${formatPrice(SHIPPING_FEE)}おトク）`,
      });
    }

    const cheapBagNotShown =
      cheapestBag && !list.some((r) => r.slug === cheapestBag.slug) && !cartSlugs.includes(cheapestBag.slug);
    if (cheapBagNotShown) {
      const qty = Math.ceil(gap / cheapestBag.price);
      list.push({
        slug: cheapestBag.slug,
        name: cheapestBag.name,
        price: cheapestBag.price,
        image: cheapestBag.image,
        reason: qty === 1
          ? `あと1点追加 — 追加後あと${formatPrice(Math.max(0, gap - cheapestBag.price))}で無料`
          : `${qty}点追加で送料無料`,
      });
    }

    if (list.length === 0 && cheapestBag) {
      list.push({
        slug: cheapestBag.slug,
        name: `${cheapestBag.name}（もう1点）`,
        price: cheapestBag.price,
        image: cheapestBag.image,
        reason: cheapestBag.price >= gap
          ? 'もう1点追加で送料無料'
          : `あと1点追加 — 追加後あと${formatPrice(Math.max(0, gap - cheapestBag.price))}で無料`,
      });
    }

    return list.slice(0, 2);
  }, [totalPrice, cartSlugs]);

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

  const isFree = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const pct = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const away = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

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
                <Image src={item.product.image}
                  alt={`${item.product.name} — FreshLock（フレッシュロック）`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                  width={128}
                  height={128}
                  loading="lazy" />
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

          {/* 送料無料プログレスバー */}
          <div className={`rounded-xl p-4 mb-4 border-2 ${isFree ? 'bg-green-50 border-green-400' : 'bg-amber-50 border-amber-300'}`}>
            {isFree ? (
              <p className="text-sm font-semibold text-green-700 text-center">
                🎉 送料無料を達成しました！
              </p>
            ) : (
              <>
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  🚚 あと<span className="text-accent">{formatPrice(away)}</span>で送料無料
                  <span className="text-xs text-amber-700 font-normal">（{formatPrice(SHIPPING_FEE)}おトク）</span>
                </p>
                <div className="w-full bg-amber-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">小計</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">送料</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-green-600 font-medium">無料</span>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>合計</span>
            <span>{formatPrice(grandTotal)}（税込）</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full block text-center">
            ご購入手続きへ
          </Link>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
            <span className="inline-flex items-center font-bold text-[#003087] bg-[#ffc439] px-2 py-0.5 rounded text-xs tracking-wide">PayPal</span>
            <span>🛡️ 買い手保護制度対象</span>
          </div>
          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-primary mt-2">
            ← 買い物を続ける
          </Link>

          {/* 送料無料おすすめ商品 */}
          {recs.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                🎁 追加で送料無料
              </p>
              <div className="space-y-3">
                {recs.map((rec) => {
                  const fullProduct = products.find((p) => p.slug === rec.slug);
                  return (
                    <div key={rec.slug} className="flex gap-3 items-center">
                      <Image src={rec.image} alt={rec.name} width={56} height={56} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-primary truncate">{rec.name}</p>
                        <p className="text-xs text-green-700">{rec.reason}</p>
                      </div>
                      <button
                        onClick={() => { if (fullProduct) addToCart(fullProduct); }}
                        className="shrink-0 bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-accent/90 transition"
                      >
                        + {formatPrice(rec.price)}を追加
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4 text-center">
            🔒 SSL暗号化・30日間返品保証・本体2年保証
          </p>
        </div>
      </div>
    </div>
  );
}
