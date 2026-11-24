import { NextRequest, NextResponse } from 'next/server';

const EN_BASE = 'https://www.freshlocksealer.com';
const SHARED_EXACT = new Set(['/', '/contact', '/shipping', '/returns', '/faq', '/about', '/privacy', '/terms', '/cart']);
const SHARED_PRODUCTS = new Set(['/products/freshlock-pro', '/products/freshlock-starter-kit', '/products/vacuum-seal-bags-30-pack', '/products/vacuum-seal-bags-50-pack']);

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  const shared = SHARED_EXACT.has(path) || SHARED_PRODUCTS.has(path);
  const self = `https://jp.freshlocksealer.com${path}`;
  // 修正：自指必须标 ja（原来错标 en），x-default 指向 EN 主站
  const links = [`<${self}>; rel="alternate"; hreflang="ja"`];
  if (shared) links.push(`<${EN_BASE}${path}>; rel="alternate"; hreflang="en"`);
  links.push(`<${EN_BASE}${shared ? path : '/'}>; rel="alternate"; hreflang="x-default"`);
  res.headers.set('Link', links.join(', '));

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|llms.txt|google-shopping-feed.xml).*)'],
};
