import { AllUsers } from '@/app/(admin)/dashboard/users/_components/all-users';
import { UserSkeleton } from '@/app/(admin)/dashboard/users/_components/user-skeleton';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@selge/ui/components/table';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Users',
};

export default function Users() {
  return (
    <section className="space-y-4">
      <h1 className="font-bold text-2xl">Users</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<UserSkeleton />}>
            <AllUsers page={1} />
          </Suspense>
        </TableBody>
      </Table>
    </section>
  );
}
