'use client';

import { ItemsCart } from '@/components/items-cart';
import { useShopping } from '@/store/shopping';
import { Badge } from '@selge/ui/components/badge';
import { Button } from '@selge/ui/components/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@selge/ui/components/sheet';
import { ShoppingCartIcon } from 'lucide-react';

export function Cart() {
  const totalItems = useShopping((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = useShopping((state) =>
    state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" variant="ghost" aria-label="Shopping cart">
          <ShoppingCartIcon className="size-5" />
          <Badge
            className="-top-2 -translate-x-1/2 absolute left-full min-w-5 px-1"
            variant="secondary"
          >
            {totalItems}
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <ItemsCart />

          <div className="mt-4 text-right font-medium">
            Total: <span>{totalPrice}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
