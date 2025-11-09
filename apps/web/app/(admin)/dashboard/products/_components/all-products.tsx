import { getProducts } from '@/server/query/products';
import { TableCell, TableRow } from '@bakan/ui/components/table';

export async function AllProducts() {
  const products = await getProducts();

  return products.map((item) => (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.sku}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.stock}</TableCell>
      <TableCell>{item.isActive ? 'Active' : 'Disabled'}</TableCell>
    </TableRow>
  ));
}
