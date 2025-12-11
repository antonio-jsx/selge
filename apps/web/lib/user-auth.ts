import 'server-only';

import { ActionError } from '@/lib/safe-action';
import { auth } from '@selge/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createMiddleware } from 'next-safe-action';
import { cache } from 'react';

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/signin');
  }

  return !!session && session.user.role === 'admin';
});

export const isAdminMiddleware = createMiddleware().define(async ({ next }) => {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new ActionError('Unauthorized user');
  }
  return next();
});
