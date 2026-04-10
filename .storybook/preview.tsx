import type { Preview } from '@storybook/react-vite';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { mswHandlers } from './msw-handlers';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story: () => ReactNode) => (
      <Router>
        <StoreProvider store={store}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </StoreProvider>
      </Router>
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
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
