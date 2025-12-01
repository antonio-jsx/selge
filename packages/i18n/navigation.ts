import { routing } from './routing';
import { createNavigation } from 'next-intl/navigation';

export const { Link, usePathname, getPathname } = createNavigation(routing);
