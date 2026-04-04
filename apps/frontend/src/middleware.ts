import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/auth', '/map', '/resources', '/feedback'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some(p => pathname === p) || pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    const hasToken =
      request.cookies.get('auth_token')?.value ||
      request.headers.get('authorization');

    if (!hasToken) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
