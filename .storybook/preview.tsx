import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </MemoryRouter>
      </StoreProvider>
    ),
  ],
};

export default preview;
