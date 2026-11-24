'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const paymentMethodSp = searchParams.get('payment_method');
  const orderNumberSp = searchParams.get('order_number');
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (paymentMethodSp === 'airwallex' && orderNumberSp) {
      let tries = 0;
      const poll = async () => {
        try {
          const r = await fetch(`/api/airwallex/status?order_number=${encodeURIComponent(orderNumberSp)}`);
          const d = await r.json();
          if (d?.paid) {
            setOrderInfo({ customer_email: d.customer_email, amount_total: d.amount_total, success: true });
            clearCart();
            return;
          }
          // 主动触发服务端核验（防 webhook 延迟/丢失）
          if (d?.orderId && tries < 3) {
            try {
              await fetch('/api/airwallex/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ intent_id: d.orderId }) });
              const r2 = await fetch(`/api/airwallex/status?order_number=${encodeURIComponent(orderNumberSp)}`);
              const d2 = await r2.json();
              if (d2?.paid) {
                setOrderInfo({ customer_email: d2.customer_email, amount_total: d2.amount_total, success: true });
                clearCart();
                return;
              }
            } catch {}
          }
        } catch {}
        if (++tries < 15) setTimeout(poll, 3000); else setLoading(false);
      };
      poll();
    } else if (sessionId) {
      fetch(`/api/checkout/success?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrderInfo(data);
            clearCart();
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart, paymentMethodSp, orderNumberSp]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">決済確認中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-primary mb-4">ご注文ありがとうございます！</h1>
      <p className="text-gray-600 mb-2">ご注文が正常に完了しました。</p>
      
      {orderInfo?.customer_email && (
        <p className="text-gray-500 mb-6">
          確認メールを <strong>{orderInfo.customer_email}</strong> に送信しました
        </p>
      )}

      {orderInfo?.amount_total && (
        <p className="text-2xl font-bold text-primary mb-8">
          合計：¥{Math.round(orderInfo.amount_total).toLocaleString()}（税込）
        </p>
      )}

      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
        <h2 className="font-bold text-primary mb-3">今後の流れ</h2>
        <ul className="space-y-2 text-gray-600">
          <li>📦 1〜2営業日以内にご注文商品を準備いたします</li>
          <li>🚚 通常配送は1〜3営業日でお届け（日本国内）</li>
          <li>📧 発送時に追跡番号をメールでお知らせします</li>
        </ul>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn-primary">
          ホームに戻る
        </Link>
        <Link href="/products" className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
          買い物を続ける
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-20 text-center"><div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div><p className="text-gray-500">読み込み中...</p></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
