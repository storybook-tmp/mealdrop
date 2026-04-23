import type { Decorator, Preview } from '@storybook/react-vite';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { rootReducer } from '../src/app-state/store';
import type { RootState } from '../src/app-state/store';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { darkTheme, lightTheme } from '../src/styles/theme';

import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

type StorybookAppState = Partial<{
  cart: Partial<RootState['cart']>;
  order: Partial<RootState['order']>;
}>;

type StorybookParameters = {
  appState?: StorybookAppState;
  darkMode?: boolean;
  initialRoute?: string;
  routePath?: string;
};

const defaultState: RootState = {
  cart: {
    visible: false,
    items: [],
  },
  order: {
    items: [],
  },
};

const createPreloadedState = (appState?: StorybookAppState): RootState => ({
  cart: {
    ...defaultState.cart,
    ...appState?.cart,
  },
  order: {
    ...defaultState.order,
    ...appState?.order,
  },
});

const AppProviders = ({
  appState,
  initialRoute = '/',
  routePath = '/*',
  story,
}: {
  appState?: StorybookAppState;
  initialRoute?: string;
  routePath?: string;
  story: ReactNode;
}) => {
  const themeMode = useDarkMode(false, { global: globalThis.window });
  const store = useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
        preloadedState: createPreloadedState(appState),
      }),
    [appState]
  );

  return (
    <MemoryRouter initialEntries={[initialRoute]} key={`${routePath}:${initialRoute}`}>
      <StoreProvider store={store}>
        <ThemeProvider theme={themeMode.value ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Routes>
            <Route path={routePath} element={story} />
          </Routes>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

const withAppEnvironment: Decorator = (Story, context) => {
  const parameters = context.parameters as StorybookParameters;

  return (
    <AppProviders
      appState={parameters.appState}
      initialRoute={parameters.initialRoute}
      routePath={parameters.routePath}
      story={<Story />}
    />
  );
};

const preview: Preview = {
  decorators: [withAppEnvironment],
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
  async beforeEach(context) {
    const parameters = context.parameters as StorybookParameters;

    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('darkMode', JSON.stringify(parameters.darkMode ?? false));
  },
};

export default preview;
