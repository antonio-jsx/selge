import { ButtonTrash } from '@/components/button-trash';
import { EmptyState } from '@/components/empty-state';
import { getProducts } from '@/server/query/products';
import { Badge } from '@bakan/ui/components/badge';
import { TableCell, TableRow } from '@bakan/ui/components/table';
import { cn } from '@bakan/ui/lib/utils';
import { BoxIcon, CircleIcon } from 'lucide-react';

export async function AllProducts() {
  const products = await getProducts();

  if (products.length <= 0) {
    return (
      <TableRow>
        <TableCell colSpan={7}>
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
      <TableCell>
        <Badge variant="outline">
          <CircleIcon
            className={cn(item.isActive ? 'fill-green-300' : 'fill-red-300')}
          />
          {item.isActive ? 'Active' : 'Disabled'}
        </Badge>
      </TableCell>
      <TableCell>
        <ButtonTrash id={item.id} title={item.name} section="products" />
      </TableCell>
    </TableRow>
  ));
}
