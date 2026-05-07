import type { Preview } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { store } from '../src/app-state';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { darkTheme, lightTheme } from '../src/styles/theme';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const AppProviders = ({ children }: { children: ReactNode }) => {
  const { value } = useDarkMode(false, { global: globalThis.window });
  const theme = value ? darkTheme : lightTheme;

  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.querySelector('#modal')) {
        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal';
        document.body.appendChild(modalRoot);
      }

      return <Story />;
    },
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  loaders: [mswLoader],
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
  async beforeEach() {
    localStorage.setItem('darkMode', 'true');
  },
};

export default preview;
