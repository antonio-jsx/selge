import 'server-only';
import { auth } from '@bakan/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/signin');
  }

  return !!session && session.user.role === 'admin';
});
