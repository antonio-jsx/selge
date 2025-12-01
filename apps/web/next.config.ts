import createNextIntlPlugin from '@selge/i18n/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
});

export default withNextIntl(nextConfig);
