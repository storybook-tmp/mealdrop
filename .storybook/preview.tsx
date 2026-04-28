import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { store } from '../src/app-state'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'

import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          {context.parameters?.routerOverride ? (
            <Story />
          ) : (
            <MemoryRouter>
              <Story />
            </MemoryRouter>
          )}
        </ThemeProvider>
      </StoreProvider>
    ),
  ],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
