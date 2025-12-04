import { SignIn } from '@/app/(login)/_components/sign-in';
import Card from '@/components/card';
import { type Locale, useTranslations } from '@selge/i18n';
import { getTranslations, setRequestLocale } from '@selge/i18n/server';
import type { Metadata } from 'next';
import { use } from 'react';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/signin'>): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'Auth.Signin.Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Login({ params }: PageProps<'/[locale]/signin'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('Auth.Signin');

  return (
    <Card
      title={t('title')}
      description={t('description')}
      className="min-w-sm"
    >
      <SignIn />
    </Card>
  );
}
