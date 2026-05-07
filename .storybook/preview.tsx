import type { Preview } from '@storybook/react-vite';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { store } from '../src/app-state';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { darkTheme, lightTheme } from '../src/styles/theme';

import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const AppProviders = ({ children }: React.PropsWithChildren) => {
  const { value } = useDarkMode(false, { global: globalThis.window });
  const theme = value ? darkTheme : lightTheme;

  return (
    <Router>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </StoreProvider>
    </Router>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
      }

      return (
        <AppProviders>
          <Story />
        </AppProviders>
      );
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
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
