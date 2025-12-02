import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(60, 'Name must be at most 50 caharacters'),
  isFeatured: z.boolean(),
});

export type Category = z.infer<typeof categorySchema>;
