import { AddCategory } from '@/app/(admin)/dashboard/category/_components/add-category';
import { AllCategory } from '@/app/(admin)/dashboard/category/_components/all-category';
import { useTranslations } from '@selge/i18n';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category',
};

export default function Category() {
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
