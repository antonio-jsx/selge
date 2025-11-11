import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

type MiddlewareHandler = (
  request: NextRequest
) => NextResponse | Response | Promise<NextResponse | Response>;

export function withProtectedRoute(
  handler?: MiddlewareHandler
): MiddlewareHandler {
  return async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard')) {
      const cookie = getSessionCookie(request);
      if (!cookie) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    }

    if (!handler) {
      return NextResponse.next();
    }

    return handler(request);
  };
}
