import type { Preview } from '@storybook/react-vite';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { rootReducer } from '../src/app-state/store';
import { lightTheme, darkTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    // Portal root for modals
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
      }
      return <Story />;
    },
    // Providers
    (Story, context) => {
      const theme = context.globals?.theme === 'dark' ? darkTheme : lightTheme;
      const store = configureStore({ reducer: rootReducer });
      return (
        <MemoryRouter>
          <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
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
    msw: { handlers: mswHandlers },
  },
};

export default preview;
