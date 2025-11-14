'use client';

import { useShopping } from '@/store/shopping';
import type { SelectProduct } from '@bakan/database/schemas/products';
import { Button } from '@bakan/ui/components/button';
import { toast } from '@bakan/ui/components/sonner';
import { ShoppingCartIcon } from 'lucide-react';

export function AddToCart({ product }: { product: SelectProduct }) {
  const { addToCart } = useShopping();

  const handleCard = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success('Product added to cart', {
      description: 'You can view your cart to proceed to checkout.',
    });
  };

  return (
    <Button onClick={handleCard}>
      <ShoppingCartIcon /> Add to cart
    </Button>
  );
}
