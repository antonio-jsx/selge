'use client';

import { Cancel } from '@/components/cancel';
import { removeAction } from '@/server/mutation/remove';
import { useRemove } from '@/store/remove';
import { useTranslations } from '@selge/i18n';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@selge/ui/components/alert-dialog';
import { Spinner } from '@selge/ui/components/spinner';
import { useAction } from 'next-safe-action/hooks';

export function Remove() {
  const t = useTranslations('Delete');

  const { id, section, title, modal, closeModal } = useRemove();

  const { executeAsync, isPending } = useAction(removeAction);

  const handleRemove = async () => {
    await executeAsync({ id, section });
  };

  return (
    <AlertDialog open={modal} onOpenChange={closeModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title', { name: title })}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('subtitle', { name: title })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} asChild>
            <Cancel />
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleRemove}>
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
