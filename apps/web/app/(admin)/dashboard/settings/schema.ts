import z from 'zod';

export const settingSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be at most 50 caharacters'),
  description: z.string().nonempty('Description is required'),
});

export type Settings = z.infer<typeof settingSchema>;
