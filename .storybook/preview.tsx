import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { rootReducer } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

const preview: Preview = {
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: rootReducer,
      })

      return (
        <MemoryRouter>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
              <div id="modal" />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
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
}

export default preview
