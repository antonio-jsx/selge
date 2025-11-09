import { FeaturedSkeleton } from '@/app/(home)//_components/fetured-skeleton';
import { Banner } from '@/app/(home)/_components/banner';
import { FeaturedProducts } from '@/app/(home)/_components/featured-products';
import { getSettings } from '@/server/query/settings';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return { title: settings?.title, description: settings?.description };
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl">
        <Banner />
      </section>

      <section className="mx-auto max-w-6xl py-6">
        <h3 className="mb-6 font-bold text-xl">Featured products</h3>
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </>
  );
}
