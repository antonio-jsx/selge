import { getFeaturedCategory } from '@/server/query/category';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@selge/ui/components/navigation-menu';
import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';

export async function FeaturedCategory({ locale }: { locale: string }) {
  'use cache';
  cacheTag('featured_category');
  cacheLife('days');

  const category = await getFeaturedCategory();

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {category.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink className="rounded-full border px-4" asChild>
              <Link href={`/${locale}/category/${item.name}`}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
