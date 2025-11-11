'use client';

import { useShopping } from '@/store/shopping';
import type { SelectProduct } from '@bakan/database/schemas/products';
import { Button } from '@bakan/ui/components/button';
import { ShoppingCartIcon } from 'lucide-react';

export function AddToCart({ product }: { product: SelectProduct }) {
  const { addToCart } = useShopping();

  return (
    <Button onClick={() => addToCart({ ...product, quantity: 1 })}>
      <ShoppingCartIcon /> Add to cart
    </Button>
  );
}
