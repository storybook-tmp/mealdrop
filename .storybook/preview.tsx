import type { Preview } from '@storybook/react-vite'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div')
        el.id = 'modal'
        document.body.appendChild(el)
      }

      const freshStore = configureStore({ reducer: rootReducer })

      return (
        <MemoryRouter>
          <StoreProvider store={freshStore}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
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
