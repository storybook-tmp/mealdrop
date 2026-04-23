import type { Preview } from '@storybook/react-vite';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import '../src/styles/GlobalStyle.tsx';
import { store } from '../src/app-state';
import { lightTheme } from '../src/styles/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Router>
        <StoreProvider store={store}>
          <ThemeProvider theme={lightTheme}>
            <Story />
          </ThemeProvider>
        </StoreProvider>
      </Router>
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
