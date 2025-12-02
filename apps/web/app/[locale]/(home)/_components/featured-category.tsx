import { getFeaturedCategory } from '@/server/query/category';
import { Category } from './category';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@selge/ui/components/navigation-menu';
import { cacheLife, cacheTag } from 'next/cache';

export async function FeaturedCategory() {
  'use cache';
  cacheTag('featured_category');
  cacheLife('days');

  const category = await getFeaturedCategory();

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {category.map((item) => (
          <Category item={item} key={item.id} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
