'use client';

import { searchParsers } from '@/app/(admin)/dashboard/products/searchParams';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@selge/ui/components/input-group';
import { SearchIcon } from 'lucide-react';
import { debounce, useQueryStates } from 'nuqs';

export function Filters() {
  const [{ q }, setFilters] = useQueryStates(searchParsers, {
    shallow: false,
    limitUrlUpdates: debounce(300),
  });

  return (
    <div className="flex items-center">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          onChange={(e) => setFilters({ q: e.target.value })}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
