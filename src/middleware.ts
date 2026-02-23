import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // We exclude login and registration paths from checking
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware JWT Error:', error);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  //  path checking internally (as above), 
  // leave checking all paths:
   matcher: ['/dashboard/:path*', '/cart/:path*', '/favorites/:path*'],
};