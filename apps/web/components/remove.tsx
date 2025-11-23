'use client';

import { removeAction } from '@/server/mutation/remove';
import { useRemove } from '@/store/remove';
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
  const { id, section, title, modal, closeModal } = useRemove();

  const { executeAsync, isPending } = useAction(removeAction);

  const handleRemove = async () => {
    await executeAsync({ id, section });
  };

  return (
    <AlertDialog open={modal} onOpenChange={closeModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “{title}“?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>“{title}”</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleRemove}>
            {isPending && <Spinner />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
