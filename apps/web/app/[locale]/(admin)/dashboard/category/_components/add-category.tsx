'use client';

import { categorySchema } from '@/app/(admin)/dashboard/category/schema';
import { Cancel } from '@/components/cancel';
import { Save } from '@/components/save';
import { addCategory } from '@/server/mutation/add-category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from '@selge/i18n';
import { Button } from '@selge/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@selge/ui/components/dialog';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { PlusIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddCategory() {
  const t = useTranslations('Dashboard.Category.Add');

  const [open, setOpen] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { executeAsync, isPending } = useAction(addCategory);

  const onSubmit = handleSubmit(async (data) => {
    await executeAsync(data);
    closeDialog();
  });

  const closeDialog = () => {
    setOpen((state) => !state);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> {t('button')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={control}
            name="name"
            label={t('Form.name')}
            render={(field) => <Input {...field} />}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Cancel />
            </DialogClose>
            <Save state={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
