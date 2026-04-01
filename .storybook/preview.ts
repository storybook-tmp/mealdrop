import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { lightTheme } from '../src/styles/theme';
import { store } from '../src/app-state';
import '../src/styles/GlobalStyle';

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(
          StoreProvider,
          { store },
          React.createElement(
            ThemeProvider,
            { theme: lightTheme },
            React.createElement(Story)
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
