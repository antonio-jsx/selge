import { AppSidebar } from '@/app/(admin)/_components/app-sidebar';
import { Remove } from '@/components/remove';
import { SidebarInset, SidebarProvider } from '@selge/ui/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="mx-auto w-full max-w-6xl md:p-6">
        {children}
        <Remove />
      </SidebarInset>
    </SidebarProvider>
  );
}
