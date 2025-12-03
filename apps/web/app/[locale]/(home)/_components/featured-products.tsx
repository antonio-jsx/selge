import { Product } from '@/app/(home)/_components/product';
import { getFeaturedProducts } from '@/server/query/products';
import { ItemGroup } from '@selge/ui/components/item';
import { cacheLife, cacheTag } from 'next/cache';

export async function FeaturedProducts({ locale }: { locale: string }) {
  'use cache';
  cacheTag('featured');
  cacheLife('days');

  const products = await getFeaturedProducts();

  return (
    <ItemGroup className="gap4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((item) => (
        <Product item={item} locale={locale} key={item.id} />
      ))}
    </ItemGroup>
  );
}
