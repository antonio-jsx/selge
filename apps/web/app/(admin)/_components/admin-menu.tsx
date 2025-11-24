'use client';

import type { Menu } from '@/lib/types';
import { MenuItems } from './menu-items';
import {
  BoxIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  TagsIcon,
  UsersIcon,
} from 'lucide-react';

const dashboard: Menu = {
  title: 'Dashboard',
  url: '/dashboard',
  icon: LayoutDashboardIcon,
};

const adminMenu: Menu[] = [
  dashboard,
  { title: 'Category', url: '/dashboard/category', icon: TagsIcon },
  { title: 'Products', url: '/dashboard/products', icon: BoxIcon },
  { title: 'Users', url: '/dashboard/users', icon: UsersIcon },
  { title: 'Orders', url: '/dashboard/orders', icon: FileTextIcon },
  { title: 'Settings', url: '/dashboard/settings', icon: SettingsIcon },
];

const userMenu: Menu[] = [dashboard];

export function AdminMenu({ isAdmin }: { isAdmin: boolean }) {
  return isAdmin
    ? adminMenu.map((item) => <MenuItems item={item} key={item.title} />)
    : userMenu.map((item) => <MenuItems item={item} key={item.title} />);
}
