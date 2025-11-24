import 'server-only';

import { auth } from '@selge/auth';
import { headers } from 'next/headers';

export async function getUsers(currentPage: number) {
  const users = auth.api.listUsers({
    query: {
      limit: 10,
      offset: (currentPage - 1) * 10,
    },
    headers: await headers(),
  });

  return users;
}
