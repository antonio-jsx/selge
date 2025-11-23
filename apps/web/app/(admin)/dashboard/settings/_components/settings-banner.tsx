'use client';

import { BannerPreview } from '@/app/(admin)/dashboard/settings/_components/banner-preview';
import { useSectionSettings } from '@/app/(admin)/dashboard/settings/hooks';
import { bannerSchema } from '@/app/(admin)/dashboard/settings/schema';
import Card from '@/components/card';
import { updateBanner } from '@/server/mutation/update-banner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@selge/ui/components/button';
import { FormField } from '@selge/ui/components/form-field';
import { Input } from '@selge/ui/components/input';
import { Spinner } from '@selge/ui/components/spinner';
import { Textarea } from '@selge/ui/components/textarea';
import { SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function SettingsBanner() {
  const settings = useSectionSettings('hero', {
    title: '',
    description: '',
    metaData: { btnTitle: '', btnUrl: '' },
  });

  const {
    title,
    description,
    metaData: { btnTitle, btnUrl },
  } = settings;

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title,
      description,
      btnTitle,
      btnUrl,
    },
  });

  const { executeAsync, isPending } = useAction(updateBanner);

  const onSubmit = handleSubmit(async (data) => {
    await executeAsync(data);
  });

  return (
    <form
      className="grid grid-cols-[330px_1fr] items-start gap-8"
      onSubmit={onSubmit}
    >
      <div>
        <Card
          title="Banner Settings"
          description="Customize your banner settings"
        >
          <div className="space-y-4">
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

            <FormField
              control={control}
              name="btnTitle"
              label="Button text"
              render={(field) => <Input {...field} />}
            />
            <FormField
              control={control}
              name="btnUrl"
              label="URL"
              render={(field) => <Input {...field} />}
            />

            <Button type="submit">
              {isPending ? <Spinner /> : <SaveIcon />} Save
            </Button>
          </div>
        </Card>
      </div>

      <div className="relative overflow-hidden rounded-lg border">
        <div className="relative h-[300px] w-full">
          <BannerPreview control={control} />
        </div>
      </div>
    </form>
  );
}
