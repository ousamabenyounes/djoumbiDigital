import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ne redirige que si on est à la racine
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
}; 