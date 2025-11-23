import { withProtectedRoute } from '@selge/auth/proxy';
import { securityHeaders } from '@selge/security';

export const proxy = withProtectedRoute(() => {
  return securityHeaders();
});
