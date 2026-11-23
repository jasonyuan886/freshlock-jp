import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const FROM_HEADER = `FreshLock JP Checkout <${SMTP_USER}>`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE = 'https://jp.freshlocksealer.com';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function yen(n: number): string {
  return '¥' + Number(n || 0).toLocaleString('ja-JP');
}
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).hostname === new URL(request.url).hostname;
  } catch { return false; }
}
const hitsMap = new Map<string, number[]>();
function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (hitsMap.get(key) || []).filter((t) => now - t < 60 * 60 * 1000);
  hits.push(now);
  hitsMap.set(key, hits);
  return hits.length > 3;
}

export async function POST(request: Request) {
  try {
    if (!SMTP_PASS) return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    if (!isSameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json().catch(() => ({}));
    const email = (body.email || '').toString().trim();
    const action = (body.action || 'capture').toString().trim();
    if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (rateLimited(`${action}:${email}`)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const cartItems = (body.cartItems || []).slice(0, 20);
    const cartTotal = Number(body.cartTotal || 0);
    const itemsHtml = cartItems
      .map((item: any) => `<tr><td style="padding:4px 0;">${esc(item.name || item.product?.name || 'Item')} ×${item.quantity || 1}</td><td style="padding:4px 0; text-align:right;">${yen((item.price || item.product?.price || 0) * (item.quantity || 1))}</td></tr>`)
      .join('');

    if (action === 'recovery') {
      const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#222;">
        <div style="background:#0f4c3a;padding:24px;text-align:center;"><h1 style="color:#fff;margin:0;font-size:22px;">カートの商品をご用意しております 🛒</h1></div>
        <div style="padding:24px;">
          <p>こんにちは、</p>
          <p>カートに商品が残っていることを確認いたしました。在庫は確保しておりますので、このままお進みいただけます。</p>
          <div style="background:#fff3cd;border:1px solid #ffe08a;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0;font-size:14px;">🚚 <strong>5,500円以上のご注文で送料無料</strong> ｜ 💳 PayPalアカウント不要でカード決済が可能です</p>
          </div>
          <div style="background:#f0f7f4;border-radius:8px;padding:16px;margin:20px 0;">
            <table style="width:100%;border-collapse:collapse;">${itemsHtml}
              <tr style="border-top:2px solid #0f4c3a;"><td style="padding:8px 0;font-weight:bold;">合計</td><td style="padding:8px 0;text-align:right;font-weight:bold;">${yen(cartTotal)}</td></tr>
            </table>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${SITE}/checkout" style="background:#0f4c3a;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">ご注文を完了する →</a>
          </div>
          <p style="color:#666;font-size:13px;">ご質問はこのメールにご返信ください。FreshLock JP ・ support@freshlocksealer.com</p>
        </div></div>`;
      await sendEmail({ host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASS, from: FROM_HEADER, to: [email], subject: 'カートに商品が残っています — FreshLock JP', html });
      return NextResponse.json({ success: true, action: 'recovery_sent' });
    }

    const notifyHtml = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#222;">
      <h2 style="color:#0f4c3a;border-bottom:2px solid #0f4c3a;padding-bottom:8px;">JP チェックアウト開始 — カート捕捉</h2>
      <p><strong>Customer Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><strong>Cart Total:</strong> ${yen(cartTotal)}</p>
      <table style="width:100%;border-collapse:collapse;margin:12px 0;">
        <tr style="border-bottom:1px solid #eee;"><th style="text-align:left;padding:4px 0;">Item</th><th style="text-align:right;padding:4px 0;">Price</th></tr>
        ${itemsHtml}
      </table>
      <p style="color:#888;font-size:12px;">注文確認メールが続かない場合、このカートは離脱したものとしてフォローアップを検討してください。</p>
    </div>`;
    await sendEmail({ host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASS, from: FROM_HEADER, to: [TO_EMAIL], subject: `[FreshLock JP] Checkout Started: ${email} — ${yen(cartTotal)}`, html: notifyHtml });
    return NextResponse.json({ success: true, action: 'captured' });
  } catch (err: any) {
    console.error('jp abandoned-cart error:', err?.message || err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
