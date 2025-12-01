import { Skeleton } from '@selge/ui/components/skeleton';
import { TableCell, TableRow } from '@selge/ui/components/table';

export function ProductSkeleton() {
  return Array.from({ length: 5 }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: 5 }).map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton className="h-6 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
