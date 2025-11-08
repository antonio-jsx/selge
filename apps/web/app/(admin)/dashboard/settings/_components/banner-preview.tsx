import type { Banner } from '@/app/(admin)/dashboard/settings/schema';
import { Button } from '@bakan/ui/components/button';
import { type Control, useWatch } from 'react-hook-form';

export function BannerPreview({ control }: { control: Control<Banner> }) {
  const watch = useWatch({
    control,
  });

  return (
    <div className="relative flex h-full flex-col justify-center px-6 text-white">
      <div className="max-w-xl space-y-4">
        <h1 className="text-balance font-bold text-6xl">{watch.title}</h1>
        <p className="text-pretty text-2xl">{watch.subtitle}</p>
        <Button>{watch.btnTitle}</Button>
      </div>
    </div>
  );
}
