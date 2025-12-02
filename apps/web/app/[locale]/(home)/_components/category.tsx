'use client';

import type { SelectCategory } from '@selge/database/schemas/category';
import { Link } from '@selge/i18n/navigation';
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@selge/ui/components/navigation-menu';

export function Category({ item }: { item: SelectCategory }) {
  return (
    <NavigationMenuItem key={item.id}>
      <NavigationMenuLink className="rounded-full border px-4" asChild>
        <Link href={`/category/${item.name}`}>{item.name}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
