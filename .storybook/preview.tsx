import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '../src/app-state/store';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { handlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer });
      const routePath = context.parameters?.routePath as string | undefined;
      const routeEntry = context.parameters?.routeEntry as string | undefined;

      return (
        <MemoryRouter initialEntries={routeEntry ? [routeEntry] : ['/']}>
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
    msw: {
      handlers,
    },
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
