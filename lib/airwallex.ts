// Airwallex online payments — JP site (JPY). Credentials from Vercel env only.
const API_BASE = 'https://api.airwallex.com';
const ORDERS_REPO_OWNER = 'jasonyuan886';
const ORDERS_REPO_NAME = 'freshlock-orders';
const ORDERS_BRANCH = 'main';

type TokenCache = { token: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

export function airwallexConfigured(): boolean {
  return Boolean(
    process.env.AIRWALLEX_CLIENT_ID &&
      process.env.AIRWALLEX_API_KEY &&
      process.env.AIRWALLEX_ACCOUNT_ID &&
      process.env.AIRWALLEX_ENABLED !== 'false',
  );
}

export async function getAirwallexToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;
  const clientId = process.env.AIRWALLEX_CLIENT_ID;
  const apiKey = process.env.AIRWALLEX_API_KEY;
  if (!clientId || !apiKey) throw new Error('Airwallex credentials not configured');
  const res = await fetch(`${API_BASE}/api/v1/authentication/login`, {
    method: 'POST',
    headers: { 'x-client-id': clientId, 'x-api-key': apiKey, 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!res.ok) throw new Error(`Airwallex auth failed: HTTP ${res.status}`);
  const data = await res.json();
  if (!data?.token) throw new Error('Airwallex auth response missing token');
  tokenCache = { token: data.token, expiresAt: Date.now() + Number(data.expires_in || 1800) * 1000 };
  return tokenCache.token;
}

export async function createAirwallexPaymentIntent(params: {
  requestId: string;
  amount: number; // JPY 整数（円）
  currency: string;
  orderNumber: string;
  customer: { email: string; firstName?: string; lastName?: string; phone?: string };
  returnUrl: string;
}): Promise<{ id: string; clientSecret: string; status: string }> {
  const token = await getAirwallexToken();
  const res = await fetch(`${API_BASE}/api/v1/pa/payment_intents/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request_id: params.requestId,
      amount: params.amount,
      currency: params.currency,
      merchant_order_id: params.orderNumber,
      descriptor: 'FRESHLOCK JP',
      return_url: params.returnUrl,
      customer: {
        email: params.customer.email,
        first_name: params.customer.firstName || undefined,
        last_name: params.customer.lastName || undefined,
        phone_number: params.customer.phone || undefined,
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`create intent failed: HTTP ${res.status} ${JSON.stringify(data).slice(0, 200)}`);
  if (!data?.id || !data?.client_secret) throw new Error('create intent missing fields');
  return { id: data.id, clientSecret: data.client_secret, status: data.status || '' };
}

export async function getAirwallexPaymentIntent(intentId: string) {
  const token = await getAirwallexToken();
  const res = await fetch(`${API_BASE}/api/v1/pa/payment_intents/${encodeURIComponent(intentId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`get intent failed: HTTP ${res.status}`);
  return { id: data.id, status: data.status || '', merchantOrderId: data.merchant_order_id || undefined };
}

export type AirwallexJpOrderRecord = {
  order_number: string;
  airwallex_intent_id: string;
  status: 'PENDING' | 'PAID';
  payment_method: 'airwallex';
  source: 'airwallexjp';
  created_at: string;
  paid_at?: string;
  customer: { email: string; first_name?: string; last_name?: string; phone?: string };
  shipping_address: { name?: string; address?: string; postal_code?: string; country?: string };
  items: Array<{ name: string; slug?: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  currency: 'JPY';
  confirmation_email_status?: 'sent' | 'failed';
};

export function airwallexJpOrderPath(orderNumber: string): string {
  return `orders/airwallexjp-${orderNumber}.json`;
}

async function ghOrders(path: string, init?: RequestInit): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not configured');
  const url = `https://api.github.com/repos/${ORDERS_REPO_OWNER}/${ORDERS_REPO_NAME}/contents/${encodeURIComponent(path)}?ref=${ORDERS_BRANCH}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      ...(init?.headers || {}),
    },
  });
}

export async function saveJpOrder(record: AirwallexJpOrderRecord): Promise<void> {
  const path = airwallexJpOrderPath(record.order_number);
  const content = Buffer.from(JSON.stringify(record, null, 2), 'utf8').toString('base64');
  const existing = await ghOrders(path);
  const body: any = { message: `airwallex-jp order ${record.order_number} (${record.status})`, content, branch: ORDERS_BRANCH };
  if (existing.ok) {
    const ed = await existing.json();
    if (ed?.sha) body.sha = ed.sha;
  }
  const res = await ghOrders(path, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`saveJpOrder failed: HTTP ${res.status}`);
}

export async function loadJpOrder(orderNumber: string): Promise<AirwallexJpOrderRecord | null> {
  const res = await ghOrders(airwallexJpOrderPath(orderNumber));
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`loadJpOrder failed: HTTP ${res.status}`);
  const data = await res.json();
  try {
    return JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

export function generateJpOrderNumber(): string {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AWXJP-${ymd}-${rand}`;
}
