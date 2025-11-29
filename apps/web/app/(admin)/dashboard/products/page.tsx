import { AddProduct } from '@/app/(admin)/dashboard/products/_components/add-product';
import { AllProducts } from '@/app/(admin)/dashboard/products/_components/all-products';
import { Filters } from '@/app/(admin)/dashboard/products/_components/filterts';
import { ProductSkeleton } from '@/app/(admin)/dashboard/products/_components/product-skeleton';
import { ProductsProvider } from '@/app/(admin)/dashboard/products/context';
import { loadSearchParams } from '@/app/(admin)/dashboard/products/searchParams';
import { getCategory } from '@/server/query/category';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@selge/ui/components/table';
import type { Metadata } from 'next';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Products({ searchParams }: PageProps) {
  const { q, tag } = await loadSearchParams(searchParams);

  const categories = getCategory();

  return (
    <ProductsProvider category={categories}>
      <section className="mb-6 flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl">Products</h1>
        <AddProduct />
      </section>

      <section className="space-y-4">
        <Filters />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<ProductSkeleton />}>
              <AllProducts search={q} tag={tag} />
            </Suspense>
          </TableBody>
        </Table>
      </section>
    </ProductsProvider>
  );
}
