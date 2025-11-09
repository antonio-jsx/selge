'use client';

import { productSchema } from '@/app/(admin)/dashboard/products/schema';
import { addProduct } from '@/server/mutation/add-product';
import { Button } from '@bakan/ui/components/button';
import { Checkbox } from '@bakan/ui/components/checkbox';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@bakan/ui/components/input-group';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddProduct() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      shortDescription: '',
      description: '',
      price: 0,
      costPrice: 0,
      stock: 0,
      isActive: true,
      isFeatured: false,
      categoryId: undefined,
    },
  });

  const { executeAsync, isPending } = useAction(addProduct);

  const onSubmit = form.handleSubmit(async (data) => {
    await executeAsync(data);
    form.reset();
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your catalog.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="name"
              label="Product name"
              render={(field) => <Input {...field} />}
            />
            <FormField
              control={form.control}
              name="sku"
              label="Product SKU"
              render={(field) => <Input {...field} />}
            />
          </div>

          <FormField
            control={form.control}
            name="shortDescription"
            label="Short description"
            render={(field) => <Input {...field} />}
          />

          <FormField
            control={form.control}
            name="description"
            label="Description"
            render={(field) => (
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  placeholder="Enter your description"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    120 characters left
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            )}
          />

          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="price"
              label="Price"
              render={(field) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name="costPrice"
              label="Price cost"
              render={(field) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              label="Stock"
              render={(field) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="isActive"
              render={(field) => (
                <label className="flex items-center gap-2" htmlFor="active">
                  <Checkbox
                    id="active"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
                  />
                  Active product
                </label>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={(field) => (
                <label className="flex items-center gap-2" htmlFor="featured">
                  <Checkbox
                    id="featured"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
                  />
                  Featured product
                </label>
              )}
            />
          </div>

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
