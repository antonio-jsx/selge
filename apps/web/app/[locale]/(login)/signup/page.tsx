import { SignUp } from '@/app/(login)/_components/sign-up';
import Card from '@/components/card';
import { type Locale, useTranslations } from '@selge/i18n';
import { getTranslations, setRequestLocale } from '@selge/i18n/server';
import type { Metadata } from 'next';
import { use } from 'react';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/signup'>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'Auth.Signup.Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Register({ params }: PageProps<'/[locale]/signup'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('Auth.Signup');

  return (
    <Card
      title={t('title')}
      description={t('description')}
      className="min-w-sm"
    >
      <SignUp />
    </Card>
  );
}
