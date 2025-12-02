'use client';

import { useShopping } from '@/store/shopping';
import { EmptyState } from './empty-state';
import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@selge/ui/components/item';
import { ShoppingCartIcon, TrashIcon } from 'lucide-react';

export function ItemsCart() {
  const t = useTranslations('Cart');

  const { cart, removeFromCart } = useShopping();

  if (cart.length <= 0) {
    return (
      <EmptyState
        Icon={ShoppingCartIcon}
        title={t('empty_title')}
        description={t('empty_subtitle')}
      />
    );
  }

  return cart.map((item) => (
    <Item variant="outline" key={item.id}>
      <ItemMedia>
        <div className="size-12 bg-muted"></div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item.name}</ItemTitle>
        <ItemDescription>${item.price}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          aria-label="Remove product"
          className="rounded-full"
          size="icon-sm"
          variant="secondary"
          onClick={() => removeFromCart(item.id)}
        >
          <TrashIcon />
        </Button>
      </ItemActions>
    </Item>
  ));
}
