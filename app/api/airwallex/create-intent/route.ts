import { NextResponse } from 'next/server';
import { products } from '@/lib/data';
import { getAttribution } from '@/lib/attribution';
import {
  airwallexConfigured,
  createAirwallexPaymentIntent,
  generateJpOrderNumber,
  saveJpOrder,
} from '@/lib/airwallex';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FREE_SHIPPING_THRESHOLD = 5500; // 円
const SHIPPING_FEE = 600; // 円
const CURRENCY = 'JPY';

export async function POST(request: Request) {
  try {
    if (!airwallexConfigured()) {
      return NextResponse.json({ error: 'card_payment_not_configured' }, { status: 503 });
    }

    let body: any;
    try { body = await request.json(); } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const items: Array<{ slug?: string; quantity?: number }> = Array.isArray(body?.items) ? body.items : [];
    if (items.length === 0) return NextResponse.json({ error: 'カートが空です' }, { status: 400 });

    const lineItems: Array<{ name: string; slug?: string; quantity: number; price: number }> = [];
    let subtotal = 0;
    for (const raw of items) {
      const product = products.find((p: any) => p.slug === raw.slug);
      if (!product) return NextResponse.json({ error: `Unknown product: ${raw.slug}` }, { status: 400 });
      const quantity = Math.max(1, Math.min(20, Number(raw.quantity) || 1));
      subtotal += product.price * quantity;
      lineItems.push({ name: product.name, slug: product.slug, quantity, price: product.price });
    }
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = subtotal + shipping;

    const email: string = (body?.customer?.email || '').toString().trim();
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: '有効なメールアドレスを入力してください' }, { status: 400 });
    }

    const lastName = (body?.customer?.lastName || '').toString().trim().slice(0, 80);
    const firstName = (body?.customer?.firstName || '').toString().trim().slice(0, 80);
    const phone = (body?.customer?.phone || '').toString().trim().slice(0, 40);

    const orderNumber = generateJpOrderNumber();
    // 诊断/灰度用：允许请求体覆盖 return_url（默认 JP 成功页）
    const returnUrl = (body?.returnUrl || `https://jp.freshlocksealer.com/checkout/success?payment_method=airwallex&order_number=${encodeURIComponent(orderNumber)}`).toString().slice(0, 300);

    let intent: { id: string; clientSecret: string; status: string };
    try {
      intent = await createAirwallexPaymentIntent({
        requestId: crypto.randomUUID(),
        amount: total,
        currency: CURRENCY,
        orderNumber,
        customer: { email, firstName, lastName, phone },
        returnUrl,
      });
    } catch (err: any) {
      console.error('jp create-intent error:', err?.message || err);
      return NextResponse.json({ error: '決済の準備に失敗しました。時間をおいて再度お試しください。', detail: String(err?.message || err).slice(0, 260) }, { status: 502 });
    }

    const record = {
      order_number: orderNumber,
      airwallex_intent_id: intent.id,
      status: 'PENDING',
      payment_method: 'airwallex',
      source: 'airwallexjp',
      created_at: new Date().toISOString(),
      customer: { email, first_name: firstName, last_name: lastName, phone },
      shipping_address: {
        name: [lastName, firstName].filter(Boolean).join(' '),
        address: (body?.shippingAddress?.address || '').toString().slice(0, 200),
        postal_code: (body?.shippingAddress?.postalCode || '').toString().slice(0, 20),
        country: 'JP',
      },
      items: lineItems,
      subtotal,
      shipping,
      total,
      currency: CURRENCY,
      attribution: getAttribution(request),
    };

    try {
      await saveJpOrder(record as any);
    } catch (err) {
      console.error('jp order persist error:', err);
    }

    return NextResponse.json({
      intent_id: intent.id,
      client_secret: intent.clientSecret,
      order_number: orderNumber,
      currency: CURRENCY,
    });
  } catch (err) {
    console.error('jp create-intent fatal:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
