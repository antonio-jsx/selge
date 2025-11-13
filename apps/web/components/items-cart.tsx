'use client';

import { useShopping } from '@/store/shopping';
import { EmptyState } from './empty-state';
import { Button } from '@bakan/ui/components/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@bakan/ui/components/item';
import { ShoppingCartIcon, TrashIcon } from 'lucide-react';

export function ItemsCart() {
  const { cart, removeFromCart } = useShopping();

  if (cart.length <= 0) {
    return (
      <EmptyState
        Icon={ShoppingCartIcon}
        title="Your cart is empty"
        description="Looks like you haven’t added anything yet."
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
