import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer })
      const routePath = context.parameters.routePath || '/'
      const routeEntry = context.parameters.routeEntry || '/'
      return (
        <MemoryRouter initialEntries={[routeEntry]}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Routes>
                <Route path={routePath} element={<Story />} />
              </Routes>
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
}

export default preview
