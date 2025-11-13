import { EmptyState } from '@/components/empty-state';
import { getProducts } from '@/server/query/products';
import { TableCell, TableRow } from '@bakan/ui/components/table';
import { BoxIcon } from 'lucide-react';

export async function AllProducts() {
  const products = await getProducts();

  if (products.length <= 0) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <EmptyState
            Icon={BoxIcon}
            title="There are no products"
            description="Add products to start building your catalog and make them available for your customers."
          />
        </TableCell>
      </TableRow>
    );
  }

  return products.map((item) => (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.sku}</TableCell>
      <TableCell>
        {item.category ? item.category.name : 'Uncategorized'}
      </TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.stock}</TableCell>
      <TableCell>{item.isActive ? 'Active' : 'Disabled'}</TableCell>
    </TableRow>
  ));
}
