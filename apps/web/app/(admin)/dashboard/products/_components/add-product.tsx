'use client';

import { useProductContext } from '@/app/(admin)/dashboard/products/context';
import { productSchema } from '@/app/(admin)/dashboard/products/schema';
import { addProduct } from '@/server/mutation/add-product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@selge/ui/components/button';
import { Checkbox } from '@selge/ui/components/checkbox';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@selge/ui/components/input-group';
import {
  NativeSelect,
  NativeSelectOption,
} from '@selge/ui/components/native-select';
import { Spinner } from '@selge/ui/components/spinner';
import { PlusIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AddProduct() {
  const { category: allCategories } = useProductContext();

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
      depth: 0,
      height: 0,
      weight: 0,
      width: 0,
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

          <p>Weight and dimensions</p>

          <div className="grid gap-4 rounded-lg border bg-accent/40 p-4 lg:grid-cols-4">
            <FormField
              control={control}
              name="weight"
              label="Weight"
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
              name="depth"
              label="Depth"
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
              name="width"
              label="Width"
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
              name="height"
              label="Height"
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
