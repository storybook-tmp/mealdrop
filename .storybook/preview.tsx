import type { Preview } from '@storybook/react-vite';
import { configureStore } from '@reduxjs/toolkit';
import { useState, type ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { rootReducer, type RootState } from '../src/app-state/store';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { darkTheme, lightTheme } from '../src/styles/theme';

import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  beforeEach: async () => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('darkMode', 'false');
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.colorScheme = 'light';

    const modalRoot = document.querySelector('#modal');

    if (modalRoot) {
      modalRoot.innerHTML = '';
    }
  },
  decorators: [
    (Story, context) => (
      <StorybookApp
        routePath={context.parameters.router?.path}
        routeEntries={context.parameters.router?.entries}
        routeIndex={context.parameters.router?.index}
        storeState={context.parameters.storeState}
      >
        <Story />
      </StorybookApp>
    ),
  ],
  loaders: [mswLoader],
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

type StorybookAppProps = {
  children: ReactNode;
  routeEntries?: string[];
  routeIndex?: number;
  routePath?: string;
  storeState?: Partial<RootState>;
};

function StorybookApp({
  children,
  routeEntries,
  routeIndex,
  routePath,
  storeState,
}: StorybookAppProps) {
  const [store] = useState(() => createStoryStore(storeState));
  const { value } = useDarkMode(false, { global: globalThis.window });
  const theme = value ? darkTheme : lightTheme;

  return (
    <MemoryRouter
      initialEntries={routeEntries ?? ['/']}
      initialIndex={routeIndex ?? 0}
    >
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <CurrentPath />
          <Routes>
            <Route path={routePath ?? '/*'} element={children} />
            <Route path="*" element={null} />
          </Routes>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

function CurrentPath() {
  const location = useLocation();

  return (
    <div
      data-testid="storybook-current-path"
      style={{
        height: 0,
        left: -9999,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        width: 0,
      }}
    >
      {location.pathname}
    </div>
  );
}

function createStoryStore(storeState?: Partial<RootState>) {
  const defaultState = rootReducer(undefined, { type: '@@storybook/init' });
  const preloadedState: RootState = {
    cart: {
      ...defaultState.cart,
      ...storeState?.cart,
      items: storeState?.cart?.items ?? defaultState.cart.items,
    },
    order: {
      ...defaultState.order,
      ...storeState?.order,
      items: storeState?.order?.items ?? defaultState.order.items,
    },
  };

  return configureStore({
    preloadedState,
    reducer: rootReducer,
  });
}
