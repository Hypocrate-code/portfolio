import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { localesAvailable, defaultLocale } from '@/traductions/config';

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, localesAvailable, defaultLocale);
}
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // console.log("pathname : " + pathname)
  if (pathname.includes('/fr/fr')) {
    return NextResponse.next();
  }

  if (/^\/lezartsaki\/.*\.(ico|png|jpg|jpeg|svg|webp|css|js|map)$/.test(pathname)) {
    return NextResponse.next();
  }

  if (/\.(ico|png|jpg|jpeg|svg|webp|css|js|map)$/.test(pathname)) {
    return NextResponse.next();
  }
  const alreadyLocalized = localesAvailable.some(locale =>
    pathname === `/lezartsaki/${locale}` ||
    pathname.startsWith(`/lezartsaki/${locale}/`)
  );

  if (alreadyLocalized) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/lezartsaki')) {
    const accept = request.headers.get('accept') || '';
    if (!accept.includes('text/html')) {
      return NextResponse.next();
    }

    const locale = getLocale(request) || defaultLocale;

    const cleanPath = pathname.replace(/^\/lezartsaki/, '') || '/';

    return NextResponse.redirect(
      new URL(`/lezartsaki/${locale}${cleanPath}`, request.url)
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/lezartsaki/:path*'],
};