import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { envOnlyMacros } from 'vite-env-only';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const isStorybook = process.argv[1]?.includes('storybook');

export default defineConfig({
  plugins: [
    envOnlyMacros(),
    isStorybook ? react() : reactRouter(),
    tsconfigPaths(),
    nodePolyfills({
      include: ['crypto'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
});
