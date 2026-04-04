import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_PATHS, ROUTES } from '@/lib/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if ((PUBLIC_PATHS as readonly string[]).includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    const hasToken =
      request.cookies.get('auth_token')?.value ||
      request.headers.get('authorization');

    if (!hasToken) {
      const loginUrl = new URL(ROUTES.AUTH, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
