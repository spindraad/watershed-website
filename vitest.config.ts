// vitest.config.ts
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Resolve the vite config function (vitest runs in Node, not SSR)
const resolvedViteConfig = viteConfig({
  command: 'serve',
  mode: 'test',
  isSsrBuild: false,
  isPreview: false,
});

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      globals: true,
      globalSetup: './test-setup.ts',
    },
  }),
);
