import z from 'zod';

export const productParamsSchema = z
  .tuple([z.string(), z.string()])
  .transform(([id, slug]) => ({
    id: parseInt(id, 10),
    slug,
  }))
  .refine(({ id }) => !Number.isNaN(id), { message: 'Invalid product ID' });
