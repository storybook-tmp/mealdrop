import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </ThemeProvider>
      </StoreProvider>
    ),
  ],
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
};

export default preview;
