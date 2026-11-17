import { NextRequest, NextResponse } from 'next/server';

const EN_BASE = 'https://www.freshlocksealer.com';
const SHARED_EXACT = new Set(['/', '/contact', '/shipping', '/returns', '/faq', '/about', '/privacy', '/terms', '/cart']);
const SHARED_PRODUCTS = new Set(['/products/freshlock-pro', '/products/freshlock-starter-kit', '/products/vacuum-seal-bags-30-pack', '/products/vacuum-seal-bags-50-pack']);

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  const enPath = SHARED_EXACT.has(path) || SHARED_PRODUCTS.has(path) ? path : null;
  const self = `https://jp.freshlocksealer.com${path}`;
  const links = [`<${self}>; rel="alternate"; hreflang="en"`, `<${self}>; rel="alternate"; hreflang="x-default"`];
  if (enPath) links.push(`<${EN_BASE}${enPath}>; rel="alternate"; hreflang="en"`);
  res.headers.set('Link', links.join(', '));

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|llms.txt|google-shopping-feed.xml).*)'],
};
