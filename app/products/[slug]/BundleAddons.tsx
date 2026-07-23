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
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  const sealer = products.find((p) => p.slug === 'freshlock-pro');
  const bagsSmall = products.find((p) => p.slug === 'vacuum-seal-bags-25-pack');
  const bagsMed = products.find((p) => p.slug === 'vacuum-seal-bags-30-pack');
  const bagsLrg = products.find((p) => p.slug === 'vacuum-seal-bags-50-pack');
  if (!sealer) return null;

  const handleAdd = (items: Product[], msg: string) => {
    items.forEach((p) => addToCart(p, 1));
    setAddedMsg(msg);
    setTimeout(() => setAddedMsg(null), 2500);
  };

  // Pro本体ページ：3サイズの袋バンドルを表示
  if (product.slug === 'freshlock-pro') {
    const bundles = [
      { bag: bagsSmall, label: 'お試しセット', desc: '小25枚 — おやつ・小分け用' },
      { bag: bagsMed, label: '人気セット', desc: '中30枚 — 日常使いに最適' },
      { bag: bagsLrg, label: 'お徳用セット', desc: '大50枚 — 家族分・まとめ買いに' },
    ].filter((b) => b.bag) as { bag: Product; label: string; desc: string }[];
    if (bundles.length === 0) return null;

    return (
      <section aria-label="お得なセット" className="bg-accent/5 border border-accent/20 rounded-xl p-4 sm:p-5 mb-4">
        <h3 className="font-semibold text-base text-primary mb-3 flex items-center gap-2">
          🎁 <span>セットで買うと送料無料に</span>
        </h3>
        <div className="space-y-3">
          {bundles.map(({ bag, label, desc }) => {
            const total = sealer.price + bag.price;
            const isFree = total >= FREE_SHIPPING_THRESHOLD;
            return (
              <div key={bag.slug} className="flex gap-3 items-center bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex -space-x-2 flex-shrink-0">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
                    <Image src={sealer.image} alt={sealer.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
                    <Image src={bag.image} alt={bag.name} fill className="object-cover" sizes="56px" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    Pro + {bag.name.replace(/^真空チャック袋\s*/, '')}
                    {isFree && <span className="ml-2 inline-block bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">送料無料</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  <p className="text-accent font-bold text-sm mt-0.5">
                    {formatPrice(total)} <span className="text-[10px] text-gray-400 font-normal">（税込）</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd([sealer, bag], `Pro + ${bag.name}をカートに追加しました！`)}
                  className="btn-primary text-xs px-3 py-2 min-h-[44px] whitespace-nowrap"
                  aria-live="polite"
                >
                  {addedMsg?.includes(bag.slug) ? '✓ 追加済' : '追加'}
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-gray-500 mt-3">
          {formatPrice(FREE_SHIPPING_THRESHOLD)}以上で通常配送（国際航空便・追跡あり）送料無料
        </p>
      </section>
    );
  }

  // 袋ページ：本体とのセットを表示
  if (product.category === 'bags') {
    const total = sealer.price + product.price;
    const isFree = total >= FREE_SHIPPING_THRESHOLD;
    return (
      <section aria-label="本体とのセット" className="bg-accent/5 border border-accent/20 rounded-xl p-4 sm:p-5 mb-4">
        <h3 className="font-semibold text-base text-primary mb-3 flex items-center gap-2">
          🎁 <span>本体とセットですぐ使える</span>
        </h3>
        <div className="flex gap-3 items-center">
          <div className="flex -space-x-3 flex-shrink-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-white shadow-sm bg-white">
              <Image src={sealer.image} alt={sealer.name} fill className="object-cover" sizes="80px" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
              FreshLock Pro + {product.name}
              {isFree && <span className="ml-2 inline-block bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">送料無料</span>}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              本体と袋をまとめて買ってすぐに真空保存を始められます。
            </p>
            <p className="mt-1">
              <span className="text-accent font-bold text-base sm:text-lg">{formatPrice(total)}</span>{' '}
              <span className="text-gray-400 text-xs">（税込{isFree ? '・送料無料' : ''}）</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleAdd([product, sealer], 'セットでカートに追加しました！')}
          className="btn-primary w-full text-sm sm:text-base min-h-[44px] mt-3"
          aria-live="polite"
        >
          {addedMsg ? '✓ 2点をカートに追加しました！' : '2点まとめてカートに入れる'}
        </button>
      </section>
    );
  }

  return null;
}
