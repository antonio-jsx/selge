import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';

export function Cancel() {
  const t = useTranslations('Button');

  return (
    <Button type="button" variant="outline">
      {t('cancel')}
    </Button>
  );
}
