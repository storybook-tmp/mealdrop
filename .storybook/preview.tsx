import type { Preview, ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';

const withRouter: DecoratorFunction<ReactRenderer> = (Story, context) => {
  const { routePath, routeEntry } = context.parameters.router || {};
  if (routePath) {
    return (
      <MemoryRouter initialEntries={[routeEntry || '/']}>
        <Routes>
          <Route path={routePath} element={<Story />} />
        </Routes>
      </MemoryRouter>
    );
  }
  return (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  );
};

const preview: Preview = {
  decorators: [
    withRouter,
    (Story) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <div id="modal" />
          <Story />
        </ThemeProvider>
      </StoreProvider>
    ),
  ],
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
  },
};

export default preview;
