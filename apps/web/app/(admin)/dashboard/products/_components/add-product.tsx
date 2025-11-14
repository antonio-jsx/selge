'use client';

import { productSchema } from '@/app/(admin)/dashboard/products/schema';
import { addProduct } from '@/server/mutation/add-product';
import type { SelectCategory } from '@bakan/database/schemas/category';
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
import {
  NativeSelect,
  NativeSelectOption,
} from '@bakan/ui/components/native-select';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddProduct({
  categories,
}: {
  categories: Promise<SelectCategory[]>;
}) {
  const allCategories = use(categories);

  const [open, setOpen] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm({
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

  const onSubmit = handleSubmit(async (data) => {
    await executeAsync(data);
    reset();
    setOpen(false);
  });

  const closeDialog = () => {
    setOpen((state) => !state);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your catalog.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            control={control}
            name="categoryId"
            label="Category"
            render={(field) => (
              <NativeSelect
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
              >
                <NativeSelectOption value="">
                  Select category
                </NativeSelectOption>
                {allCategories.map((item) => (
                  <NativeSelectOption value={item.id} key={item.id}>
                    {item.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            )}
          />
          <div className="flex items-start gap-4">
            <FormField
              control={control}
              name="name"
              label="Product name"
              render={(field) => <Input {...field} />}
            />
            <FormField
              control={control}
              name="sku"
              label="Product SKU"
              render={(field) => <Input {...field} />}
            />
          </div>

          <FormField
            control={control}
            name="shortDescription"
            label="Short description"
            render={(field) => <Input {...field} />}
          />

          <FormField
            control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
