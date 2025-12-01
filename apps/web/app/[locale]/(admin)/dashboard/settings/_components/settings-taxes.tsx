'use client';

import { useSectionSettings } from '@/app/(admin)/dashboard/settings/hooks';
import { taxesSchema } from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { Save } from '@/components/save';
import { updateTax } from '@/server/mutation/update-tax';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from '@selge/i18n';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsTaxes() {
  const t = useTranslations('Dashboard.Settings');

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
    <Card title={t('Tax.title')} description={t('Tax.subtitle')}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="title"
          label={t('Tax.Form.name')}
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={control}
          name="description"
          label={t('description')}
          render={(field) => <Input {...field} />}
        />

        <FormField
          control={control}
          name="taxValue"
          label={t('Tax.Form.rate')}
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

        <Save state={isPending} />
      </form>
    </Card>
  );
}
