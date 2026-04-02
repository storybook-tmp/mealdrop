import { mergeConfig, defineConfig, coverageConfigDefaults } from 'vitest/config';
import viteConfig from './vite.config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const playwrightProviderOptions =
  process.env.STORYBOOK_TEST_SCREENSHOTS === 'true'
    ? {
        contextOptions: {
          deviceScaleFactor: 2,
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        },
      }
    : {};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: [
        '@reduxjs/toolkit',
        'react-loading-skeleton',
        'react-redux',
        'react-transition-group',
        'react-router-dom',
        'styled-components',
      ],
    },
    test: {
      coverage: {
        exclude: [
          ...coverageConfigDefaults.exclude,
          'storybook.setup.ts',
          '**/*.stories.*',
          '.storybook',
          'src/docs',
          'src/components/Button/utils.tsx',
          'build',
          'public',
          'functions',
          '**/conditional-logic.ts',
          '**/RestaurantCard/progress',
          '**/RestaurantsSection.container.tsx',
          'src/stub',
          'ps-setup.ts',
          '**/serviceWorker.ts',
        ],
      },
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            environment: 'happy-dom',
            include: ['**/*.test.ts'],
          },
        },
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at:
            // https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(playwrightProviderOptions),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  })
);
