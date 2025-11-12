import type { HeroSettings } from '@/lib/types';
import { getSettings } from '@/server/query/settings';
import { Button } from '@bakan/ui/components/button';

export async function Banner() {
  const settings = await getSettings();

  const hero = settings.find((item) => item.section === 'hero');

  if (!hero) return null;

  const { title, description, metaData } = hero as HeroSettings;

  return (
    <div className="relative flex aspect-10/8 flex-col justify-center rounded-lg bg-gray-400 px-6 md:aspect-10/5 lg:aspect-10/3">
      <div>
        <div className="max-w-xl space-y-3">
          <h1 className="text-balance font-bold text-6xl">{title}</h1>
          <p className="text-pretty text-2xl">{description}</p>
          <Button size="lg">{metaData.btnTitle}</Button>
        </div>
      </div>
    </div>
  );
}
