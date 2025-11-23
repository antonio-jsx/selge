import { Skeleton } from '@selge/ui/components/skeleton';

export function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="space-y-2 border p-4" key={index}>
          <Skeleton className="aspect-square h-[220px] w-full" />
          <Skeleton className="aspect-square h-6 w-50" />
          <Skeleton className="aspect-square h-4 w-40" />
        </div>
      ))}
    </div>
  );
}
