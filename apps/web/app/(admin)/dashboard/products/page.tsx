import { AddProduct } from '@/app/(admin)/dashboard/products/_components/add-product';
import { AllProducts } from '@/app/(admin)/dashboard/products/_components/all-products';
import { ProductSkeleton } from '@/app/(admin)/dashboard/products/_components/product-skeleton';
import { ProductsProvider } from '@/app/(admin)/dashboard/products/context';
import { getCategory } from '@/server/query/category';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@bakan/ui/components/table';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products',
};

export default function Products() {
  const categories = getCategory();

  return (
    <ProductsProvider category={categories}>
      <section className="mb-6 flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl">Products</h1>
        <AddProduct />
      </section>

      <section>
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
              <AllProducts />
            </Suspense>
          </TableBody>
        </Table>
      </section>
    </ProductsProvider>
  );
}
