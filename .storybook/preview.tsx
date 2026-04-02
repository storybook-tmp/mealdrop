import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';

const preview: Preview = {
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
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </ThemeProvider>
      </StoreProvider>
    ),
  ],
};

export default preview;
