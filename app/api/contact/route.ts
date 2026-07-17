import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const FROM_EMAIL_NAME = 'FreshLock サポート';
const FROM_EMAIL_ADDRESS = SMTP_USER;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    if (!SMTP_PASS) {
      console.error('SMTP_PASS env var not configured');
      return NextResponse.json({ error: 'サーバー設定エラー' }, { status: 500 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 });
    }

    const name: string = (body.name || '').toString().trim();
    const email: string = (body.email || '').toString().trim();
    const subject: string = (body.subject || '').toString().trim();
    const message: string = (body.message || '').toString().trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'すべての項目を入力してください' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'お名前が長すぎます' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'メールアドレスが正しくありません' }, { status: 400 });
    }
    if (subject.length > 200) {
      return NextResponse.json({ error: '件名が長すぎます' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'メッセージは5000文字以内で入力してください' }, { status: 400 });
    }

    const fromHeader = `${FROM_EMAIL_NAME} <${FROM_EMAIL_ADDRESS}>`;

    const html = `
      <div style="font-family: 'Hiragino Sans', 'Yu Gothic', Meiryo, Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #222;">
        <h2 style="color:#0f4c3a; border-bottom:2px solid #0f4c3a; padding-bottom:8px;">JPサイトからの新規お問い合わせ</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; width:120px; vertical-align:top;">お名前:</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; vertical-align:top;">メール:</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; vertical-align:top;">お問い合わせ種別:</td><td style="padding:6px 0;">${escapeHtml(subject)}</td></tr>
        </table>
        <div style="background:#f7f7f7; border-left:4px solid #0f4c3a; padding:12px 16px; margin: 16px 0; white-space: pre-wrap;">${escapeHtml(message)}</div>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0 8px;">
        <p style="color:#888; font-size:12px; margin:0;">このメッセージは <strong>jp.freshlocksealer.com</strong> のお問い合わせフォームから送信されました。このメールに返信するとお客様へ直接ご連絡いただけます。</p>
      </div>
    `;

    await sendEmail({
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: fromHeader,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[FreshLock JP] ${subject} — ${name} 様より`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API error:', error?.message || error);
    return NextResponse.json({ error: '送信に失敗しました。しばらくしてからもう一度お試しください。' }, { status: 500 });
  }
}
