import z from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(150, 'Name must be at most 150 characters'),
  sku: z
    .string()
    .min(1, 'SKU is required')
    .max(150, 'SKU must be at most 150 characters'),
  shortDescription: z
    .string()
    .max(255, 'Short description must be at most 255 characters')
    .optional(),
  description: z.string().min(120, 'Description is required'),
  price: z
    .number()
    .positive('Price must be greater than 0')
    .min(1, 'Price is required'),
  costPrice: z.number().optional(),
  stock: z
    .number()
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative')
    .min(1, 'Stock is required'),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  categoryId: z.number().optional(),
});

export type Product = z.infer<typeof productSchema>;
