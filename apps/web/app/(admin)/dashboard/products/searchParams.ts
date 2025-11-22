import { createLoader, parseAsString } from 'nuqs/server';

export const searchParsers = {
  q: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(searchParsers);
