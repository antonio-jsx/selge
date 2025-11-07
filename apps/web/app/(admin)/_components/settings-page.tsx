'use client';

import {
  type Settings,
  settingSchema,
} from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { Button } from '@bakan/ui/components/button';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Textarea } from '@bakan/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function SettingsPage() {
  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: Settings) => {
    console.log(data);
  });

  return (
    <Card title="Settings Page" description="Customize your homepage settings">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          label="Title"
          render={(field) => <Input {...field} />}
        />
        <FormField
          control={form.control}
          name="description"
          label="Description"
          render={(field) => <Textarea {...field} />}
        />
        <Button type="submit">
          <SaveIcon /> Save
        </Button>
      </form>
    </Card>
  );
}
