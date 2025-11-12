import { Banner } from '@/app/(home)/_components/banner';
import { FeaturedProducts } from '@/app/(home)/_components/featured-products';
import { getSettings } from '@/server/query/settings';
import type { SelectSettings } from '@bakan/database/schemas/settings';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const safeHome = settings.find((item) => item.section === 'home') as
    | SelectSettings
    | undefined;

  return {
    title: safeHome?.title ?? '',
    description: safeHome?.description ?? '',
  };
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl">
        <Banner />
      </section>

      <section className="mx-auto max-w-6xl py-6">
        <h3 className="mb-6 font-bold text-xl">Featured products</h3>

        <FeaturedProducts />
      </section>
    </>
  );
}
