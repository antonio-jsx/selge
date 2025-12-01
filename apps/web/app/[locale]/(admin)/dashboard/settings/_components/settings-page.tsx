'use client';

import { useSectionSettings } from '@/app/(admin)/dashboard/settings/hooks';
import {
  type Settings,
  settingSchema,
} from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { Save } from '@/components/save';
import { updateSettings } from '@/server/mutation/update-settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from '@selge/i18n';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { Textarea } from '@selge/ui/components/textarea';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsPage() {
  const t = useTranslations();

  const settings = useSectionSettings('home', {
    title: '',
    description: '',
    metaData: { phone: '', email: '', address: '' },
  });

  const {
    title,
    description,
    metaData: { phone, email, address },
  } = settings;

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      title,
      description,
      phone,
      email,
      address,
    },
  });

  const { executeAsync, isPending } = useAction(updateSettings);

  const onSubmit = handleSubmit(async (data: Settings) => {
    await executeAsync(data);
  });

  return (
    <Card
      title={t('Dashboard.Settings.General.title')}
      description={t('Dashboard.Settings.General.subtitle')}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={control}
          name="title"
          label={t('Dashboard.Settings.title')}
          render={(field) => <Input {...field} />}
        />
        <FormField
          control={control}
          name="description"
          label={t('Dashboard.Settings.description')}
          render={(field) => <Textarea {...field} />}
        />

        <p>{t('Contact')}</p>

        <div className="flex items-center gap-4">
          <FormField
            control={control}
            name="phone"
            label={t('Phone')}
            render={(field) => <Input {...field} />}
          />
          <FormField
            control={control}
            name="email"
            label={t('Email')}
            render={(field) => <Input {...field} />}
          />
        </div>

        <FormField
          control={control}
          name="address"
          label={t('Address')}
          render={(field) => <Textarea {...field} />}
        />

        <Save state={isPending} />
      </form>
    </Card>
  );
}
