'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

export default function AddToCartClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border rounded-lg" role="group" aria-label="数量選択">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 text-lg hover:bg-gray-100 transition"
          aria-label="数量を減らす"
        >
          −
        </button>
        <span className="px-4 py-3 font-semibold min-w-[3rem] text-center" aria-live="polite">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 text-lg hover:bg-gray-100 transition"
          aria-label="数量を増やす"
        >
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className="btn-primary flex-1" aria-live="polite">
        {added ? '✓ カートに追加しました！' : 'カートに入れる'}
      </button>
    </div>
  );
}
