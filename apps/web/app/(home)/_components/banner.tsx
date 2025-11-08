import { getSettings } from '@/server/query/settings';
import { Button } from '@bakan/ui/components/button';

export async function Banner() {
  const banner = await getSettings();

  if (!banner) return;

  const { metaData } = banner;

  return (
    <div className="relative flex aspect-10/8 flex-col justify-center rounded-lg bg-gray-400 px-6 md:aspect-10/5 lg:aspect-10/3">
      <div>
        <div className="max-w-xl space-y-3">
          <h1 className="text-balance font-bold text-6xl">
            {metaData?.banner?.title}
          </h1>
          <p className="text-pretty text-2xl">{metaData?.banner?.subtitle}</p>
          <Button size="lg">{metaData?.banner?.button.title}</Button>
        </div>
      </div>
    </div>
  );
}
