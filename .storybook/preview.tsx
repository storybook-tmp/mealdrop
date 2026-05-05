import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { rootReducer } from '../src/app-state/store';
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
      return <Story />;
    },
    (Story, { parameters }) => {
      const store = configureStore({ reducer: rootReducer });
      const routerConfig = parameters.reactRouter;
      const initialEntries = routerConfig?.location?.pathname
        ? [routerConfig.location.pathname]
        : ['/'];
      const routePath = routerConfig?.route?.path || '*';

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Routes>
                <Route path={routePath} element={<Story />} />
              </Routes>
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
