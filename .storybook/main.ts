import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  staticDirs: ['../public'],

  stories: [
    '../docs/**/*.mdx',
    '../app/**/*.mdx',
    '../app/**/*.stories.@(ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-remix-react-router',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    'storybook-react-i18next',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: {
    backgroundsStoryGlobals: true,
    viewportStoryGlobals: true,
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
