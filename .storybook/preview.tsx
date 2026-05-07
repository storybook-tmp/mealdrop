import type { Decorator, Preview } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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

type AppStoryParameters = {
  route?: string;
  routePath?: string;
  preloadedState?: Partial<RootState>;
};

const AppTheme = ({ children }: PropsWithChildren) => {
  const { value } = useDarkMode(false, { global: globalThis.window });
  const theme = value ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

const appDecorator: Decorator = (Story, context) => {
  const appParameters = (context.parameters.app || {}) as AppStoryParameters;
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: appParameters.preloadedState as RootState | undefined,
  });
  const story = <Story />;

  return (
    <MemoryRouter initialEntries={[appParameters.route || '/']}>
      <StoreProvider store={store}>
        <AppTheme>
          {appParameters.routePath ? (
            <Routes>
              <Route path={appParameters.routePath} element={story} />
            </Routes>
          ) : (
            story
          )}
        </AppTheme>
      </StoreProvider>
    </MemoryRouter>
  );
};

const preview: Preview = {
  decorators: [appDecorator],
  loaders: [mswLoader],
  beforeEach() {
    localStorage.setItem('darkMode', JSON.stringify(false));
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  },
  parameters: {
    msw: {
      handlers: mswHandlers,
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
