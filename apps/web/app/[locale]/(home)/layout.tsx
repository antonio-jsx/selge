import { Cart } from '@/components/cart';
import { Logo } from '@/components/logo';
import { Profile } from '@/components/profile';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'FAQs', href: '#' },
];

export default function Layout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <>
      <header>
        <nav className="fixed z-20 h-18 w-full bg-background/50 backdrop-blur-lg">
          <div className="mx-auto max-w-6xl px-4 md:px-0">
            <div className="flex items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Logo className="size-8 fill-black dark:fill-white" />
              </div>

              <div className="hidden size-fit lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <Profile />
                <Cart />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-18">{children}</main>
    </>
  );
}
