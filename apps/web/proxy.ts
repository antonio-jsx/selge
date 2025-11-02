import { securityHeaders } from '@bakan/security';

export async function proxy() {
  return securityHeaders();
}
