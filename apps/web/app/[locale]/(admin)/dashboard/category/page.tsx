import { AddCategory } from '@/app/(admin)/dashboard/category/_components/add-category';
import { AllCategory } from '@/app/(admin)/dashboard/category/_components/all-category';
import { type Locale, useTranslations } from '@selge/i18n';
import { setRequestLocale } from '@selge/i18n/server';
import type { Metadata } from 'next';
import { use } from 'react';

export const metadata: Metadata = {
  title: 'Category',
};

export default function Category({
  params,
}: PageProps<'/[locale]/dashboard/category'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('Dashboard.Category');

  return (
    <>
      <section className="mb-6 flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl">{t('title')}</h1>
        <AddCategory />
      </section>

      <AllCategory />
    </>
  );
}
