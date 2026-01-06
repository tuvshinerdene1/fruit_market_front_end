// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('role')?.value; // Simplified example
  const url = request.nextUrl.pathname;

  // Protect Admin Routes
  if (url.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect Worker Routes
  if (url.startsWith('/worker') && userRole !== 'WORKER') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}