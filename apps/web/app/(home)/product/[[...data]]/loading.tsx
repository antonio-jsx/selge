import { Separator } from '@bakan/ui/components/separator';
import { Skeleton } from '@bakan/ui/components/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="grid items-start gap-4 lg:grid-cols-[90px_1fr]">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[90px] w-full" />
              <Skeleton className="h-[90px] w-full" />
              <Skeleton className="h-[90px] w-full" />
              <Skeleton className="h-[90px] w-full" />
            </div>
            <Skeleton className="h-full w-full" />
          </div>

          <Separator className="my-6 w-full" orientation="horizontal" />

          <Skeleton className="h-8 w-70" />
        </div>

        <div className="space-y-6 border p-6">
          <Skeleton className="h-6 w-70" />
          <Skeleton className="h-8 w-50" />
        </div>
      </div>
    </div>
  );
}
