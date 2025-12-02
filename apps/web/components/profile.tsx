'use client';

import { getInitials } from '@/lib/utils';
import { signOut, useSession } from '@selge/auth/client';
import { useTranslations } from '@selge/i18n';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@selge/ui/components/avatar';
import { Button } from '@selge/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@selge/ui/components/dropdown-menu';
import { Skeleton } from '@selge/ui/components/skeleton';
import { LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function ViewName({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <span className="truncate font-medium text-foreground text-sm">
        {name}
      </span>
      <span className="truncate font-normal text-muted-foreground text-xs">
        {email}
      </span>
    </div>
  );
}

export function Profile({ display = false }: { display?: boolean }) {
  const t = useTranslations('Profile');

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
      <DropdownMenuTrigger className="flex items-center justify-start gap-2 text-left">
        <Avatar>
          <AvatarImage src={data.user.image || ''} />
          <AvatarFallback>{getInitials(data.user.name)}</AvatarFallback>
        </Avatar>
        {display && <ViewName name={data.user.name} email={data.user.email} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <ViewName name={data.user.name} email={data.user.email} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <UserIcon /> {t('account')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          <LogOutIcon /> {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
