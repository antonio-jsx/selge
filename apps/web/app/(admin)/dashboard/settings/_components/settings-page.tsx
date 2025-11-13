'use client';

import {
  type Settings,
  settingSchema,
} from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateSettings } from '@/server/mutation/update-settings';
import { Button } from '@bakan/ui/components/button';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Spinner } from '@bakan/ui/components/spinner';
import { Textarea } from '@bakan/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsPage({ title, description }: Settings) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const { executeAsync, isPending } = useAction(updateSettings);

  const onSubmit = handleSubmit(async (data: Settings) => {
    await executeAsync(data);
  });

  return (
    <Card title="Settings Page" description="Customize your homepage settings">
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
        <Button type="submit">
          {isPending ? <Spinner /> : <SaveIcon />} Save
        </Button>
      </form>
    </Card>
  );
}
