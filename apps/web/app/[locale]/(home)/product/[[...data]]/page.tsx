import { productParamsSchema } from '@/app/(home)/product/[[...data]]/schema';
import { AddToCart } from '@/components/add-to-cart';
import { getProductById } from '@/server/query/products';
import { getTranslations } from '@selge/i18n/server';
import { Separator } from '@selge/ui/components/separator';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getValidatedProduct = cache(
  async (props: PageProps<'/[locale]/product/[[...data]]'>) => {
    const { data } = await props.params;
    const parsed = productParamsSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    const { id, slug } = parsed.data;

    try {
      return await getProductById(id, slug);
    } catch {
      return null;
    }
  }
);

export async function generateMetadata(
  props: PageProps<'/[locale]/product/[[...data]]'>
): Promise<Metadata> {
  const product = await getValidatedProduct(props);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function Product(
  props: PageProps<'/[locale]/product/[[...data]]'>
) {
  const t = await getTranslations('Product');

  const product = await getValidatedProduct(props);

  if (!product) notFound();

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="grid items-start gap-4 lg:grid-cols-[90px_1fr]">
            <div className="flex gap-4 lg:flex-col">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[90px] w-full bg-muted" />
              ))}
            </div>
            <div className="aspect-square h-[420px] w-full bg-muted" />
          </div>

          <Separator className="my-6 w-full" orientation="horizontal" />

          <h3 className="my-6 font-bold text-lg">{t('information')}</h3>
          {product.description}

          <Separator className="my-6 w-full" orientation="horizontal" />

          <h3 className="my-6 font-bold text-lg">{t('review')}</h3>
        </div>

        <div className="sticky top-18 rounded-lg border p-6">
          <h1 className="mb-6 font-bold text-xl">{product.name}</h1>
          <h3 className="mb-4 font-bold text-3xl">${product.price}</h3>

          <div>{product.shortDescription}</div>
          <Separator className="my-3 w-full" orientation="horizontal" />

          <AddToCart product={product} />
        </div>
      </div>
    </section>
  );
}
