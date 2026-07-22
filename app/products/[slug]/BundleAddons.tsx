'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { products, FREE_SHIPPING_THRESHOLD } from '@/lib/data';
import type { Product } from '@/lib/types';

const formatPrice = (price: number) => `¥${Math.round(price).toLocaleString()}`;

export default function BundleAddons({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Pro 本体ページでのみ表示
  if (product.slug !== 'freshlock-pro') return null;

  const bags50 = products.find((p) => p.slug === 'vacuum-seal-bags-50-pack');
  const bags30 = products.find((p) => p.slug === 'vacuum-seal-bags-30-pack');
  if (!bags50 || !bags30) return null;

  const bundleTotal = product.price + bags50.price;

  const handleAddBundle = () => {
    addToCart(product, 1);
    addToCart(bags50, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section aria-label="お得なセット" className="bg-accent/5 border border-accent/20 rounded-xl p-4 sm:p-5 mb-4">
      <h3 className="font-semibold text-base text-primary mb-3 flex items-center gap-2">
        🎁 <span>お得なセットで送料無料に</span>
      </h3>
      <div className="flex gap-3 sm:gap-4 items-center mb-3">
        <div className="flex -space-x-3 flex-shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
          </div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
            <Image src={bags50.image} alt={bags50.name} fill className="object-cover" sizes="80px" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
            FreshLock Pro + 真空チャック袋50枚セット
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            セットで <span className="text-accent font-semibold">送料無料</span>（{formatPrice(FREE_SHIPPING_THRESHOLD)}以上）対象！すぐに使い始められます。
          </p>
          <p className="mt-1">
            <span className="text-accent font-bold text-base sm:text-lg">{formatPrice(bundleTotal)}</span>{' '}
            <span className="text-gray-400 text-xs">（税込・国際航空便 送料無料）</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAddBundle}
        className="btn-primary w-full text-sm sm:text-base min-h-[44px]"
        aria-live="polite"
      >
        {added ? '✓ 2点をカートに追加しました！' : '2点まとめてカートに入れる'}
      </button>
      <p className="text-center text-xs text-gray-500 mt-2">
        袋だけ買い足したい方は{' '}
        <Link href={`/products/${bags30.slug}`} className="text-primary underline hover:text-primary-700">
          30枚入り（{formatPrice(bags30.price)}）
        </Link>
        {' '}もございます
      </p>
    </section>
  );
}
