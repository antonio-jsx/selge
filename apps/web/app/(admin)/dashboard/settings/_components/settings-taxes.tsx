'use client';

import { useSectionSettings } from '@/app/(admin)/dashboard/settings/hooks';
import { taxesSchema } from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateTax } from '@/server/mutation/update-tax';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@selge/ui/components/button';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { Spinner } from '@selge/ui/components/spinner';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsTaxes() {
  const settings = useSectionSettings('taxes', {
    title: '',
    description: '',
    metaData: { taxValue: 0 },
  });

  const {
    title,
    description,
    metaData: { taxValue },
  } = settings;

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(taxesSchema),
    defaultValues: {
      title,
      description,
      taxValue,
    },
  });

  const { executeAsync, isPending } = useAction(updateTax);

  const onSubmit = handleSubmit(async (data) => {
    await executeAsync(data);
  });

  return (
    <Card
      title="Tax settings"
      description="Manage the taxes applicable to your products"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="title"
          label="Tax name"
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={control}
          name="description"
          label="Description"
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={control}
          name="taxValue"
          label="Default tax rate"
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
