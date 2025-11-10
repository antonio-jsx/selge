import { productParamsSchema } from '@/app/(home)/product/[[...data]]/schema';
import { getProductById } from '@/server/query/products';
import { Separator } from '@bakan/ui/components/separator';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Params = Promise<{ data: string[] }>;
type Props = {
  params: Params;
};

const getValidatedProduct = cache(async (params: Params) => {
  const { data } = await params;
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
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getValidatedProduct(params);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function Product({ params }: Props) {
  const product = await getValidatedProduct(params);

  if (!product) notFound();

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="grid items-start gap-4 lg:grid-cols-[90px_1fr]">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[90px] w-full bg-muted" />
              ))}
            </div>
            <div className="h-full w-full bg-muted" />
          </div>

          <Separator className="my-6 w-full" orientation="horizontal" />

          <h3 className="my-6 font-bold text-lg">Product information</h3>
          {product.description}

          <Separator className="my-6 w-full" orientation="horizontal" />

          <h3 className="my-6 font-bold text-lg">
            Customer reviews and ratings
          </h3>
        </div>

        <div className="sticky top-18 rounded-lg border p-6">
          <h1 className="mb-6 font-bold text-xl">{product.name}</h1>
          <h3 className="mb-4 font-bold text-3xl">${product.price}</h3>

          <Separator className="my-6 w-full" orientation="horizontal" />
        </div>
      </div>
    </section>
  );
}
