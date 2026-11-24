// Server-verified finalize for Airwallex JP orders. Idempotent. Used by webhook + client fallback.
import {
  getAirwallexPaymentIntent,
  loadJpOrder,
  saveJpOrder,
  type AirwallexJpOrderRecord,
} from '@/lib/airwallex';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function yen(n: number): string {
  return '\u00a5' + Number(n || 0).toLocaleString('ja-JP');
}

export type JpFinalizeResult = {
  paid: boolean;
  orderNumber?: string;
  orderId?: string;
  customerEmail?: string;
  confirmationEmailStatus?: 'sent' | 'failed' | 'skipped';
  totalYen?: number;
};

export async function finalizeAirwallexJpOrder(intentId: string): Promise<JpFinalizeResult> {
  const intent = await getAirwallexPaymentIntent(intentId);
  if (intent.status !== 'SUCCEEDED') return { paid: false, orderId: intent.id };

  const orderNumber = intent.merchantOrderId || '';
  if (!orderNumber) return { paid: true, orderId: intent.id };

  let record: AirwallexJpOrderRecord | null = null;
  try {
    record = await loadJpOrder(orderNumber);
  } catch (err) {
    console.error('finalize jp: load failed', err);
  }
  if (!record) {
    console.error('finalize jp: record missing for', orderNumber);
    return { paid: true, orderNumber, orderId: intent.id };
  }
  if (record.status === 'PAID') {
    return {
      paid: true, orderNumber, orderId: intent.id,
      customerEmail: record.customer.email,
      confirmationEmailStatus: record.confirmation_email_status || 'sent',
      totalYen: record.total,
    };
  }

  record.status = 'PAID';
  record.paid_at = new Date().toISOString();
  record.confirmation_email_status = 'skipped';

  try {
    const { sendEmail } = await import('@/lib/smtp');
    if (!SMTP_PASS) throw new Error('SMTP_PASS missing');
    const rows = record.items
      .map(it => `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">${esc(it.name)} × ${it.quantity}</td><td style="padding:6px 8px;text-align:right;border-bottom:1px solid #eee;">${yen(it.price * it.quantity)}</td></tr>`)
      .join('');
    const html = `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#222;">
      <h2 style="color:#0f4c3a;border-bottom:2px solid #0f4c3a;padding-bottom:8px;">ご注文ありがとうございます！</h2>
      <p>${esc(record.customer.first_name || '')} 様、お支払いを確認いたしました。商品を準備いたします。</p>
      <p><strong>注文番号:</strong> ${esc(record.order_number)}</p>
      <table style="width:100%;border-collapse:collapse;margin:12px 0;">${rows}
        <tr><td style="padding:6px 8px;">小計</td><td style="padding:6px 8px;text-align:right;">${yen(record.subtotal)}</td></tr>
        <tr><td style="padding:6px 8px;">送料</td><td style="padding:6px 8px;text-align:right;">${record.shipping === 0 ? '無料' : yen(record.shipping)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-top:2px solid #0f4c3a;">合計</td><td style="padding:8px;font-weight:bold;text-align:right;border-top:2px solid #0f4c3a;">${yen(record.total)}</td></tr>
      </table>
      <p style="color:#888;font-size:12px;">ご質問はこのメールにご返信ください。<br/>FreshLock JP ・ support@freshlocksealer.com</p>
    </div>`;
    const text = [
      'ご注文ありがとうございます（FreshLock JP）', '',
      `注文番号: ${record.order_number}`,
      ...record.items.map(it => `${it.name} x${it.quantity} - ${yen(it.price * it.quantity)}`),
      `小計: ${yen(record.subtotal)}`, `送料: ${record.shipping === 0 ? '無料' : yen(record.shipping)}`, `合計: ${yen(record.total)}`,
      '', 'ご質問はご返信ください。',
    ].join('\n');
    await sendEmail({
      host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASS,
      from: `FreshLock JP <${SMTP_USER}>`,
      to: record.customer.email,
      subject: `ご注文確認（${record.order_number}）FreshLock JP`,
      html, text, replyTo: SMTP_USER,
    });
    record.confirmation_email_status = 'sent';
  } catch (err) {
    console.error('finalize jp: email failed', err);
    record.confirmation_email_status = 'failed';
  }

  // 管理员收款通知（2026-11-24 EN 案例后补同款）
  try {
    const { sendEmail: notifyAdminJp } = await import('@/lib/smtp');
    await notifyAdminJp({
      host: SMTP_HOST, port: SMTP_PORT, user: SMTP_USER, pass: SMTP_PASS!,
      from: `FreshLock JP Website <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `💰 JP订单已付款: ${record.order_number} | ${yen(record.total)} JPY`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#222;">
        <h2 style="color:#0f4c3a;border-bottom:2px solid #0f4c3a;padding-bottom:6px;">💰 JP 收款通知</h2>
        <p><strong>单号:</strong> ${record.order_number}<br/>
        <strong>金额:</strong> ${yen(record.total)} JPY<br/>
        <strong>渠道:</strong> Airwallex JP（卡 / Google Pay）<br/>
        <strong>客户:</strong> ${esc(record.customer.email)}</p>
      </div>`,
    });
  } catch (e) {
    console.error('finalize jp: admin notify failed', e);
  }

  try {
    await saveJpOrder(record);
  } catch (err) {
    console.error('finalize jp: save failed', err);
  }

  return {
    paid: true, orderNumber, orderId: intent.id,
    customerEmail: record.customer.email,
    confirmationEmailStatus: record.confirmation_email_status,
    totalYen: record.total,
  };
}
