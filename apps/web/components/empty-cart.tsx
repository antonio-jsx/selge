import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@bakan/ui/components/empty';
import { ShoppingCartIcon } from 'lucide-react';

export function EmptyCart() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCartIcon />
        </EmptyMedia>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Looks like you haven’t added anything yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
