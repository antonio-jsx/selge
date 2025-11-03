import { withProtectedRoute } from '@bakan/auth/proxy';
import { securityHeaders } from '@bakan/security';

export const proxy = withProtectedRoute(() => {
  return securityHeaders();
});
