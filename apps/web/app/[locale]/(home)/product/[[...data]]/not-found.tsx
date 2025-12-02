import { useTranslations } from '@selge/i18n';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@selge/ui/components/empty';
import { BoxIcon } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('Product');

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BoxIcon />
        </EmptyMedia>
        <EmptyTitle>{t('no_found')}</EmptyTitle>
        <EmptyDescription>{t('no_found_desc')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
