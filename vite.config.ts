import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { envOnlyMacros } from 'vite-env-only';
import react from '@vitejs/plugin-react';

const isStorybook = process.argv[1]?.includes('storybook');

declare module '@remix-run/node' {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    envOnlyMacros(),
    isStorybook ? react() : (
      remix({
        ignoredRouteFiles: ['**/*'],
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
          v3_routeConfig: true,
        },
      })
    ),
    tsconfigPaths(),
  ],
});
