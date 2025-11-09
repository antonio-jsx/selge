import { slugify } from '@/lib/utils';
import type { SelectProduct } from '@bakan/database/schemas/products';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@bakan/ui/components/item';
import Link from 'next/link';

export function Product({ item }: { item: SelectProduct }) {
  const slug = slugify(item.name);

  return (
    <Item variant="outline">
      <ItemHeader>
        <Link className="block w-full" href={`/product/${item.id}/${slug}`}>
          <div className="aspect-square h-[220px] w-full bg-muted"></div>
        </Link>
      </ItemHeader>

      <ItemContent>
        <Link className="block w-full" href={`/product/${item.id}/${slug}`}>
          <ItemTitle>{item.name}</ItemTitle>
        </Link>
        <ItemDescription>${item.price}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
