'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import type { Product } from '@/lib/types';

type BundleItem = {
  product: Product;
  selected: boolean;
  discount?: number;
};

export default function FrequentlyBoughtTogether({
  mainProduct,
  bundleProducts,
  discountPercent = 10,
}: {
  mainProduct: Product;
  bundleProducts: Product[];
  discountPercent?: number;
}) {
  const { addToCart } = useCart();
  const [items, setItems] = useState<BundleItem[]>(
    bundleProducts.map((p) => ({ product: p, selected: true, discount: discountPercent }))
  );
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  const toggleItem = (idx: number) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, selected: !it.selected } : it)));
  };

  const selectedItems = items.filter((it) => it.selected);
  const bundleTotal = [mainProduct, ...selectedItems.map((it) => it.product)].reduce(
    (sum, p) => sum + p.price,
    0
  );
  const savings = selectedItems.reduce((sum, it) => sum + it.product.price * (it.discount ?? 0) / 100, 0);
  const finalPrice = bundleTotal - savings;

  const formatYen = (n: number) => '¥' + Math.round(n).toLocaleString('ja-JP');

  const handleAddAll = async () => {
    setAdding(true);
    addToCart(mainProduct, 1);
    for (const it of selectedItems) {
      addToCart(it.product, 1);
    }
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section className="mt-12 border-t pt-10" aria-labelledby="fbt-heading">
      <h2 id="fbt-heading" className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        🛒 よく一緒に購入されています
      </h2>

      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-start gap-3 flex-wrap">
            {/* Main product */}
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                <Image src={mainProduct.image} alt={mainProduct.name} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <Link href={`/products/${mainProduct.slug}`} className="font-semibold text-sm text-primary hover:underline line-clamp-2">
                  {mainProduct.name}
                </Link>
                <p className="text-accent font-bold text-sm mt-1">{formatYen(mainProduct.price)}</p>
              </div>
            </div>

            {selectedItems.length > 0 && <span className="text-2xl text-gray-400 hidden sm:block self-center" aria-hidden="true">+</span>}

            {items.map((it, idx) => (
              <div key={it.product.slug} className="flex items-center gap-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={it.selected}
                    onChange={() => toggleItem(idx)}
                    className="mt-1.5 accent-primary w-4 h-4"
                  />
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border flex-shrink-0">
                    <Image src={it.product.image} alt={it.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <Link href={`/products/${it.product.slug}`} className="font-semibold text-sm text-gray-800 hover:underline line-clamp-2">
                      {it.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-accent font-bold text-sm">{formatYen(it.product.price)}</span>
                      {it.discount ? (
                        <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold">
                          -{it.discount}% おまとめ
                        </span>
                      ) : null}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="sm:w-56 flex flex-col justify-between gap-3 pt-3 sm:pt-0 sm:border-l sm:pl-4">
            <div>
              {savings > 0 ? (
                <p className="text-xs text-green-700 font-semibold mb-1">
                  💰 セット価格: <span className="line-through text-gray-400 font-normal">{formatYen(bundleTotal)}</span>
                </p>
              ) : null}
              <p className="text-2xl font-bold text-primary">{formatYen(finalPrice)}</p>
              {savings > 0 ? (
                <p className="text-xs text-green-700 mt-0.5">{formatYen(savings)}お得</p>
              ) : null}
            </div>
            <button
              onClick={handleAddAll}
              disabled={adding || added}
              className="btn-primary w-full text-sm py-3 disabled:opacity-70"
              aria-label={`${1 + selectedItems.length}点をまとめてカートに追加`}
            >
              {added ? '✓ カートに追加しました' : adding ? '追加中...' : `${1 + selectedItems.length}点をまとめてカートに入れる`}
            </button>
            <p className="text-[11px] text-gray-500 text-center leading-tight">
              ¥5,500以上で送料無料・7日間返品保証
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
