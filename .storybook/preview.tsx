import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '../src/app-state/store';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    // Portal root for Modal component
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
      }
      return <Story />;
    },
    // App providers
    (Story) => {
      const store = configureStore({ reducer: rootReducer });
      return (
        <MemoryRouter>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      );
    },
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
    msw: { handlers: mswHandlers.default },
  },
};

export default preview;
