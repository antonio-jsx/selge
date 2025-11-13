'use client';

import {
  type Taxes,
  taxesSchema,
} from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateTax } from '@/server/mutation/update-tax';
import { Button } from '@bakan/ui/components/button';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsTaxes({
  metadata: { title, description, taxValue },
}: {
  metadata: Taxes;
}) {
  const form = useForm({
    resolver: zodResolver(taxesSchema),
    defaultValues: {
      title,
      description,
      taxValue,
    },
  });

  const { executeAsync, isPending } = useAction(updateTax);

  const onSubmit = form.handleSubmit(async (data) => {
    await executeAsync(data);
  });

  return (
    <Card
      title="Tax settings"
      description="Manage the taxes applicable to your products"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="title"
          label="Tax name"
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={form.control}
          name="description"
          label="Description"
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={form.control}
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
