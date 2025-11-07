'use client';

import { bannerSchema } from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { Button } from '@bakan/ui/components/button';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Textarea } from '@bakan/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function SettingsBanner() {
  const form = useForm({
    resolver: zodResolver(bannerSchema),
  });

  return (
    <Card title="Settings Banner" description="Customize your settings banner">
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          label="Title"
          render={(field) => <Input {...field} />}
        />
        <FormField
          control={form.control}
          name="subtitle"
          label="Description"
          render={(field) => <Textarea {...field} />}
        />

        <Card className="bg-muted/40" title="Call to action">
          <FormField
            control={form.control}
            name="btnTitle"
            label="Button text"
            render={(field) => <Input {...field} />}
          />
          <FormField
            control={form.control}
            name="btnUrl"
            label="URL"
            render={(field) => <Input {...field} />}
          />
        </Card>

        <Button type="submit">
          <SaveIcon /> Save
        </Button>
      </form>
    </Card>
  );
}
