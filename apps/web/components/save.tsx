import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';
import { Spinner } from '@selge/ui/components/spinner';

export function Save({ state }: { state: boolean }) {
  const t = useTranslations('Button');

  return (
    <Button type="submit">
      {state && <Spinner />} {t('save')}
    </Button>
  );
}
