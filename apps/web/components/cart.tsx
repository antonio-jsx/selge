import { Badge } from '@bakan/ui/components/badge';
import { Button } from '@bakan/ui/components/button';
import { ShoppingCartIcon } from 'lucide-react';

export function Cart() {
  return (
    <Button className="relative" variant="ghost" aria-label="Shoping cart">
      <ShoppingCartIcon className="size-6" />
      <Badge
        className="-top-2 -translate-x-1/2 absolute left-full min-w-5 px-1"
        variant="secondary"
      >
        9
      </Badge>
    </Button>
  );
}
