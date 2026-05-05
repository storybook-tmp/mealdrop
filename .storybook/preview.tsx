import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { definePreview } from '@storybook/react-vite'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

export default definePreview({
  addons: [],
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
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer })
      const initialEntries = (context.parameters.initialEntries as string[]) || ['/']
      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
})
