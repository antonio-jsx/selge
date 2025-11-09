'use client';

import { categorySchema } from '@/app/(admin)/dashboard/category/schema';
import { addCategory } from '@/server/mutation/add-category';
import { Button } from '@bakan/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@bakan/ui/components/dialog';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddCategory() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { executeAsync, isPending } = useAction(addCategory);

  const onSubmit = form.handleSubmit(async (data) => {
    await executeAsync(data);
    form.reset();
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>
            Add a category to organize your products.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            label="Category name"
            render={(field) => <Input {...field} />}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isPending && <Spinner />} Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
