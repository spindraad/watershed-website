import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { envOnlyMacros } from 'vite-env-only';
import { flatRoutes } from 'remix-flat-routes';
import react from '@vitejs/plugin-react';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [
    envOnlyMacros(),
    isStorybook ? react() : (
      remix({
        ignoredRouteFiles: ['**/*'],
        routes: async (defineRoutes) => {
          return flatRoutes('routes', defineRoutes);
        },
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      })
    ),
    tsconfigPaths(),
  ],
});
