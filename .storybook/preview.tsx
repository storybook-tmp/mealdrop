import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { store } from '../src/app-state';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);
      }

      return (
        <MemoryRouter initialEntries={['/']}>
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
    msw: {
      handlers: mswHandlers,
    },
  },
  async beforeEach() {
    localStorage.setItem('darkMode', 'false');
  },
};

export default preview;
