'use client';

import { shippingSchema } from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateShipping } from '@/server/mutation/update-shipping';
import { useSectionSettings } from '../hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@selge/ui/components/button';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@selge/ui/components/item';
import { Spinner } from '@selge/ui/components/spinner';
import { Switch } from '@selge/ui/components/switch';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsShipping() {
  const settings = useSectionSettings('shipping', {
    title: '',
    metaData: { free: false, limit: 0 },
  });

  const {
    title,
    metaData: { free, limit },
  } = settings;

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      title,
      free,
      limit,
    },
  });

  const { executeAsync, isPending } = useAction(updateShipping);

  const onSubmit = handleSubmit(async (data) => {
    await executeAsync(data);
  });

  return (
    <Card
      title="Shipping settings"
      description="Manage your store's shipping options"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="title"
          label="Delivery time"
          render={(field) => <Input {...field} />}
        />

        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Free shipping</ItemTitle>
            <ItemDescription>Offer free shipping on all orders</ItemDescription>
          </ItemContent>
          <ItemActions className="w-8">
            <FormField
              control={control}
              name="free"
              render={(field) => (
                <Switch
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </ItemActions>
        </Item>

        <FormField
          control={control}
          name="limit"
          label="Minimum amount for free shipping"
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

        <Button type="submit">
          {isPending ? <Spinner /> : <SaveIcon />} Save
        </Button>
      </form>
    </Card>
  );
}
