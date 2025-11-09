import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@bakan/ui/components/empty';
import { BoxIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BoxIcon />
        </EmptyMedia>
        <EmptyTitle>Product not found</EmptyTitle>
        <EmptyDescription>
          The product you are looking for does not exist or was removed.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
