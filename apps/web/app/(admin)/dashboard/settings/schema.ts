import z from 'zod';

export const settingSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be at most 50 characters'),
  description: z.string().nonempty('Description is required'),
});

export type Settings = z.infer<typeof settingSchema>;

export const bannerSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be at most 50 characters'),
  description: z.string().nonempty('Description is required'),
  btnTitle: z.string().min(1, 'Title is required'),
  btnUrl: z.url(),
});

export type Banner = z.infer<typeof bannerSchema>;

export const taxesSchema = z.object({
  title: z
    .string()
    .min(1, 'Tax name is required')
    .max(50, 'Tax name must be at most 50 characters'),
  description: z.string().min(1, 'Describe the tax message'),
  taxValue: z.number().min(1),
});

export type Taxes = z.infer<typeof taxesSchema>;
