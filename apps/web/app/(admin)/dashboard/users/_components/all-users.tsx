import { getUsers } from '@/server/query/users';
import { TableCell, TableRow } from '@selge/ui/components/table';

export async function AllUsers({ page = 1 }: { page: number }) {
  const users = await getUsers(page);

  return users.users.map((item) => (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.createdAt.toString()}</TableCell>
    </TableRow>
  ));
}
