import { type PropsWithChildren, useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';

import { rootReducer, type RootState } from '../src/app-state/store';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { darkTheme, lightTheme } from '../src/styles/theme';

import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const appParameters = (context.parameters as StoryParameters).app;
      const initialEntries = appParameters?.initialEntries ?? ['/'];
      const routePath = appParameters?.routePath ?? '*';

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <AppProviders preloadedState={appParameters?.preloadedState}>
            <StorybookLocation />
            <Routes>
              <Route path={routePath} element={<Story />} />
              <Route path="*" element={null} />
            </Routes>
          </AppProviders>
        </MemoryRouter>
      );
    },
  ],
  async beforeEach() {
    localStorage.setItem('darkMode', 'false');
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  },
  parameters: {
    layout: 'fullscreen',
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

function AppProviders({
  children,
  preloadedState,
}: PropsWithChildren<{ preloadedState?: Partial<RootState> }>) {
  const { value } = useDarkMode(false, { global: globalThis.window });
  const theme = value ? darkTheme : lightTheme;
  const store = useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
        preloadedState: mergePreloadedState(preloadedState),
      }),
    [preloadedState]
  );

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
}

function StorybookLocation() {
  const location = useLocation();

  return (
    <div data-testid="storybook-location" hidden>
      {location.pathname}
    </div>
  );
}

function mergePreloadedState(preloadedState?: Partial<RootState>): RootState {
  return {
    cart: {
      visible: false,
      items: [],
      ...preloadedState?.cart,
    },
    order: {
      items: [],
      ...preloadedState?.order,
    },
  };
}

type StoryParameters = {
  app?: {
    initialEntries?: string[];
    routePath?: string;
    preloadedState?: Partial<RootState>;
  };
};
