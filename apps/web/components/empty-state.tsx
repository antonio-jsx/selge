import type { EmptyStateProps } from '@/lib/types';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@selge/ui/components/empty';

export function EmptyState({ Icon, title, description }: EmptyStateProps) {
  return (
    <Empty className="border-2 border-dashed">
      <EmptyHeader>
        <EmptyMedia className="size-16" variant="icon">
          <Icon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
