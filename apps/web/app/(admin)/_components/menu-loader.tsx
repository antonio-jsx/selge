import { Skeleton } from '@bakan/ui/components/skeleton';

export function MenuLoader() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Skeleton className="h-7 w-full" key={index} />
  ));
}
