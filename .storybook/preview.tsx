import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'
import vitestAddon from '@storybook/addon-vitest'
import a11yAddon from '@storybook/addon-a11y'

import { definePreview } from '@storybook/react-vite'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

export default definePreview({
  addons: [vitestAddon(), a11yAddon()],
  decorators: [
    (Story) => {
      const store = configureStore({ reducer: rootReducer })
      return (
        <MemoryRouter>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <div id="modal" />
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
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
    msw: {
      handlers: mswHandlers,
    },
  },
})
