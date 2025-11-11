import { Product } from '@/app/(home)/_components/product';
import { getFeaturedProducts } from '@/server/query/products';
import { ItemGroup } from '@bakan/ui/components/item';
import { cacheLife, cacheTag } from 'next/cache';

export async function FeaturedProducts() {
  'use cache';
  cacheTag('featured');
  cacheLife('days');

  const products = await getFeaturedProducts();

  return (
    <ItemGroup className="gap4 grid grid-cols-4">
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </ItemGroup>
  );
}
