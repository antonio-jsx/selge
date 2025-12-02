'use client';

import { useShopping } from '@/store/shopping';
import type { SelectProduct } from '@selge/database/schemas/products';
import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';
import { toast } from '@selge/ui/components/sonner';
import { ShoppingCartIcon } from 'lucide-react';

export function AddToCart({ product }: { product: SelectProduct }) {
  const t = useTranslations('Cart');

  const { addToCart } = useShopping();

  const handleCard = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(t('msg_title'), {
      description: t('msg_desc'),
    });
  };

  return (
    <Button onClick={handleCard}>
      <ShoppingCartIcon /> {t('button')}
    </Button>
  );
}
