'use client';

import { getInitials } from '@/lib/utils';
import { signOut, useSession } from '@bakan/auth/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@bakan/ui/components/avatar';
import { Button } from '@bakan/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@bakan/ui/components/dropdown-menu';
import { Skeleton } from '@bakan/ui/components/skeleton';
import { LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Profile() {
  const { data, error, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <Skeleton className="h-8 w-14" />;
  }

  if (error || !data) {
    return (
      <Button asChild>
        <Link href="/signin">Sign In</Link>
      </Button>
    );
  }

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/signin');
        },
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data.user.image || ''} />
          <AvatarFallback>{getInitials(data.user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-foreground text-sm">
              {data.user.name}
            </span>
            <span className="truncate font-normal text-muted-foreground text-xs">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <UserIcon /> My account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          <LogOutIcon /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
