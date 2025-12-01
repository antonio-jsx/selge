'use client';

import { searchParsers } from '../searchParams';
import { useTranslations } from '@selge/i18n';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@selge/ui/components/input-group';
import { SearchIcon } from 'lucide-react';
import { debounce, useQueryStates } from 'nuqs';

export function Search() {
  const t = useTranslations();
  const [_, setFilters] = useQueryStates(searchParsers, {
    shallow: false,
    limitUrlUpdates: debounce(300),
  });

  return (
    <InputGroup className="max-w-3xs">
      <InputGroupInput
        placeholder={`${t('Search')}...`}
        onChange={(e) => setFilters({ q: e.target.value })}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
