import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const initialEntries = context.parameters.initialEntries || ['/'];
      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <div id="modal" />
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
};

export default preview;
