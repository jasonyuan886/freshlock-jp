import { NextResponse } from 'next/server';
import { loadJpOrder } from '@/lib/airwallex';
import { finalizeAirwallexJpOrder } from '@/lib/airwallex-finalize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = (searchParams.get('order_number') || '').trim();
    if (!orderNumber) return NextResponse.json({ error: 'order_number required' }, { status: 400 });
    const record = await loadJpOrder(orderNumber);
    if (!record) return NextResponse.json({ paid: false, orderNumber: null, customer_email: null, amount_total: null });
    return NextResponse.json({
      paid: record.status === 'PAID',
      orderNumber: record.order_number,
      orderId: record.airwallex_intent_id,
      customer_email: record.customer.email,
      amount_total: record.status === 'PAID' ? record.total : null,
    });
  } catch (err) {
    console.error('jp status GET error:', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const intentId = (body?.intent_id || '').toString().trim();
    if (!intentId) return NextResponse.json({ error: 'intent_id required' }, { status: 400 });
    const r = await finalizeAirwallexJpOrder(intentId);
    return NextResponse.json({
      paid: r.paid,
      orderNumber: r.orderNumber || null,
      customer_email: r.customerEmail || null,
      amount_total: r.paid ? r.totalYen ?? null : null,
    });
  } catch (err) {
    console.error('jp status POST error:', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
