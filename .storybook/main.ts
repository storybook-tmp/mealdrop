import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/pages/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    './eval-support/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  viteFinal: (config) =>
    mergeConfig(config, {
      optimizeDeps: {
        include: [
          'axios',
          'react-loading-skeleton',
          'react-lottie-player',
          'react-multi-carousel',
          'react-transition-group',
          'use-dark-mode',
        ],
      },
    }),
};

export default config;
