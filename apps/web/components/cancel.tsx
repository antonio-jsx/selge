import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';
import type { ComponentProps } from 'react';

type CancelProps = ComponentProps<typeof Button>;

export function Cancel(props: CancelProps) {
  const t = useTranslations('Button');

  return (
    <Button type="button" variant="outline" {...props}>
      {t('cancel')}
    </Button>
  );
}
