'use client';

import type { Menu } from '@/lib/types';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@selge/ui/components/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MenuItems({ item }: { readonly item: Menu }) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={pathname === item.url}>
        <Link href={item.url}>
          <item.icon /> {item.title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
