'use client';

import type { Section } from '@/lib/types';
import { useRemove } from '@/store/remove';
import { Button } from '@bakan/ui/components/button';
import { TrashIcon } from 'lucide-react';

export function ButtonTrash({
  section,
  id,
  title,
}: {
  section: Section;
  id: number;
  title: string;
}) {
  const { remove } = useRemove();

  return (
    <Button
      size="icon-sm"
      variant="outline"
      onClick={() => remove(section, { id, title })}
    >
      <TrashIcon />
    </Button>
  );
}
