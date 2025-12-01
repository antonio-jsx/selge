'use client';

import { useProductContext } from '@/app/(admin)/dashboard/products/context';
import { searchParsers } from '@/app/(admin)/dashboard/products/searchParams';
import {
  NativeSelect,
  NativeSelectOption,
} from '@selge/ui/components/native-select';
import { debounce, useQueryStates } from 'nuqs';

export function Filters() {
  const [_, setFilters] = useQueryStates(searchParsers, {
    shallow: false,
    limitUrlUpdates: debounce(300),
  });

  const { category: allCategories } = useProductContext();

  return (
    <div className="flex items-center gap-4">
      <NativeSelect onChange={(e) => setFilters({ tag: e.target.value })}>
        <NativeSelectOption value="">Select a category</NativeSelectOption>
        {allCategories.map((item) => (
          <NativeSelectOption value={item.name} key={item.id}>
            {item.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
