'use client';

import type { Menu } from '@/lib/types';
import { Link, usePathname } from '@selge/i18n/navigation';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@selge/ui/components/sidebar';

export function MenuItems({ item }: { readonly item: Menu }) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.url}
        tooltip={item.title}
      >
        <Link href={item.url}>
          <item.icon /> {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
