'use server';

import { actionClient } from '@/lib/safe-action';
import { isAdminMiddleware } from '@/lib/user-auth';
import z from 'zod';

const remove = z.object({
  id: z.number().min(1),
  section: z.enum(['category', 'products']),
});

export const removeAction = actionClient
  .use(isAdminMiddleware)
  .metadata({ name: 'remove' })
  .inputSchema(remove)
  .action(async ({ parsedInput: { id, section } }) => {});
