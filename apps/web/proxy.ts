import { withProtectedRoute } from '@selge/auth/proxy';
import createMiddleware from '@selge/i18n/proxy';
import { routing } from '@selge/i18n/routing';
import { securityHeaders } from '@selge/security';
import type { NextRequest } from 'next/server';

export default withProtectedRoute(async (request: NextRequest) => {
  const handleI18nRouting = createMiddleware(routing);
  const i18nResponse = handleI18nRouting(request);

  const securityResponse = await securityHeaders();

  securityResponse.headers.forEach((value, key) => {
    i18nResponse.headers.set(key, value);
  });

  return i18nResponse;
});

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
