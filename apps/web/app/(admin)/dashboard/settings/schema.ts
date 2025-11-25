import z from 'zod';

export const settingSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be at most 50 characters'),
  description: z.string().nonempty('Description is required'),
  phone: z
    .e164('Phone number must be a valid format (e.g. +123456789)')
    .optional(),
  email: z.email('Email must be a valid email address').optional(),
  address: z.string().optional(),
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

export const shippingSchema = z.object({
  title: z.string().min(1, 'Delivery time is required'),
  free: z.boolean(),
  limit: z.number().min(0, 'Limit must be zero or greater'),
});

export type Shipping = z.infer<typeof shippingSchema>;
