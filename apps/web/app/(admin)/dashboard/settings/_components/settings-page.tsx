'use client';

import { useSectionSettings } from '@/app/(admin)/dashboard/settings/hooks';
import {
  type Settings,
  settingSchema,
} from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateSettings } from '@/server/mutation/update-settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@selge/ui/components/button';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { Spinner } from '@selge/ui/components/spinner';
import { Textarea } from '@selge/ui/components/textarea';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsPage() {
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
      title="Home Page Settings"
      description="Customize your homepage settings"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={control}
          name="title"
          label="Title"
          render={(field) => <Input {...field} />}
        />
        <FormField
          control={control}
          name="description"
          label="Description"
          render={(field) => <Textarea {...field} />}
        />

        <p>Contact information</p>

        <div className="flex items-center gap-4">
          <FormField
            control={control}
            name="phone"
            label="Phone"
            render={(field) => <Input {...field} />}
          />
          <FormField
            control={control}
            name="email"
            label="Email"
            render={(field) => <Input {...field} />}
          />
        </div>

        <FormField
          control={control}
          name="address"
          label="Address"
          render={(field) => <Textarea {...field} />}
        />

        <Button type="submit">
          {isPending ? <Spinner /> : <SaveIcon />} Save
        </Button>
      </form>
    </Card>
  );
}
