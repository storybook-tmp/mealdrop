import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from '../src/app-state';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        StoreProvider,
        { store },
        React.createElement(
          ThemeProvider,
          { theme: lightTheme },
          React.createElement(GlobalStyle, null),
          React.createElement(
            MemoryRouter,
            { initialEntries: ['/'] },
            React.createElement('div', { id: 'modal' }),
            React.createElement(Story, null)
          )
        )
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
