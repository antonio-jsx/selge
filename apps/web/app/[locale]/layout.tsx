import { Providers } from '@/components/providers';
import { hasLocale, NextIntlClientProvider } from '@selge/i18n';
import { routing } from '@selge/i18n/routing';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../style.css';
import { setRequestLocale } from '@selge/i18n/server';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-mono antialiased`}
      >
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
