import type { Preview } from '@storybook/react-vite';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { rootReducer } from '../src/app-state/store';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer });
      const { initialEntries = ['/'], routePath } = context.parameters.router || {};
      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              {routePath ? (
                <Routes>
                  <Route path={routePath} element={<Story />} />
                </Routes>
              ) : (
                <Story />
              )}
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
