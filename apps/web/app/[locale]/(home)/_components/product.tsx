import { AddToCart } from '@/components/add-to-cart';
import { slugify } from '@/lib/utils';
import type { SelectProduct } from '@selge/database/schemas/products';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@selge/ui/components/item';
import Link from 'next/link';
export function Product({
  item,
  locale,
}: {
  item: SelectProduct;
  locale: string;
}) {
  const slug = slugify(item.name);

  return (
    <Item variant="outline">
      <ItemHeader>
        <Link
          className="block w-full"
          href={`/${locale}/product/${item.id}/${slug}`}
        >
          <div className="aspect-square h-[220px] w-full bg-muted"></div>
        </Link>
      </ItemHeader>

      <ItemContent>
        <Link className="block w-full" href={`/product/${item.id}/${slug}`}>
          <ItemTitle>{item.name}</ItemTitle>
        </Link>
        <ItemDescription>${item.price}</ItemDescription>
        <AddToCart product={item} />
      </ItemContent>
    </Item>
  );
}
