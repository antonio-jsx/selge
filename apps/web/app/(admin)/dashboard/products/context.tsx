'use client';

import type { ProductContextValue } from '@/lib/types';
import type { SelectCategory } from '@bakan/database/schemas/category';
import { createContext, use, useContext } from 'react';

export const ProductsContext = createContext<ProductContextValue | null>(null);

export function ProductsProvider({
  children,
  category,
}: {
  children: React.ReactNode;
  category: Promise<SelectCategory[]>;
}) {
  const allCategory = use(category);

  return (
    <ProductsContext value={{ category: allCategory }}>
      {children}
    </ProductsContext>
  );
}

export function useProductContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductContext must be used within ProductsProvider');
  }
  return context;
}
