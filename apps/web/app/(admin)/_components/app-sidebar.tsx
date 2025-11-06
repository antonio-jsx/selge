import { Logo } from '@/components/logo';
import { requireAdmin } from '@/lib/user-auth';
import { AdminMenu } from './admin-menu';
import { MenuLoader } from './menu-loader';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from '@bakan/ui/components/sidebar';
import { Suspense } from 'react';

async function Menu() {
  const isAdmin = await requireAdmin();

  return <AdminMenu isAdmin={isAdmin} />;
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo className="size-7 fill-black dark:fill-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<MenuLoader />}>
                <Menu />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
