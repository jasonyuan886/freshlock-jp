import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { finalizeAirwallexJpOrder } from '@/lib/airwallex-finalize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function timingSafeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'hex'); const bb = Buffer.from(b, 'hex');
  if (ba.length !== bb.length || ba.length === 0) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function headerMatchesSecret(request: Request, secret: string): boolean {
  for (const [, value] of request.headers.entries()) {
    if (value === secret) return true;
  }
  return false;
}

export async function POST(request: Request) {
  const secret = process.env.AIRWALLEX_WEBHOOK_SECRET;
  if (!secret) {
    console.error('jp webhook: AIRWALLEX_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }
  const rawBody = await request.text();
  const timestamp = request.headers.get('x-timestamp') || '';
  const signature = request.headers.get('x-signature') || '';

  if (!timestamp || !signature) return NextResponse.json({ error: 'missing signature headers' }, { status: 400 });
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > 5 * 60 * 1000) {
    return NextResponse.json({ error: 'stale timestamp' }, { status: 400 });
  }
  let verified = headerMatchesSecret(request, secret);
  if (!verified) {
    for (const payload of [`${timestamp}.${rawBody}`, `${timestamp}${rawBody}`]) {
      const expected = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
      if (timingSafeEqualHex(expected, signature)) { verified = true; break; }
    }
  }
  if (!verified) return NextResponse.json({ error: 'invalid signature' }, { status: 400 });

  let event: any;
  try { event = JSON.parse(rawBody); } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
  if (event?.name === 'payment_intent.succeeded' && event?.data?.object?.id) {
    try {
      await finalizeAirwallexJpOrder(event.data.object.id);
    } catch (err) {
      console.error('jp webhook finalize error:', err);
      return NextResponse.json({ error: 'finalize failed' }, { status: 500 });
    }
  }
  return NextResponse.json({ received: true });
}
