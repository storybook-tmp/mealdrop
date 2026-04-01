import type { Preview } from '@storybook/react-vite';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../src/app-state/cart/cart';
import orderReducer from '../src/app-state/order/order';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';

// Create a store for stories
const createStoryStore = () => {
  const rootReducer = combineReducers({
    cart: cartReducer,
    order: orderReducer,
  });

  return configureStore({
    reducer: rootReducer,
  });
};

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
    (Story) => {
      const store = createStoryStore();
      return (
        <StoreProvider store={store}>
          <MemoryRouter>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </MemoryRouter>
        </StoreProvider>
      );
    },
  ],
};

export default preview;
