import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { store } from '../src/app-state';

// Import global styles
import '../src/styles/GlobalStyle';

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
    (Story) =>
      React.createElement(
        StoreProvider,
        { store },
        React.createElement(
          MemoryRouter,
          {},
          React.createElement(
            ThemeProvider,
            { theme: lightTheme },
            React.createElement(GlobalStyle),
            React.createElement(Story)
          )
        )
      ),
  ],
};

export default preview;
