import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { GlobalStyle } from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';
import { store } from '../src/app-state';

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
    (Story: any) =>
      React.createElement(
        ReduxProvider,
        { store },
        React.createElement(
          ThemeProvider,
          { theme: lightTheme },
          React.createElement(GlobalStyle),
          React.createElement(
            MemoryRouter,
            {},
            React.createElement(Story)
          )
        )
      ),
  ],
};

export default preview;
