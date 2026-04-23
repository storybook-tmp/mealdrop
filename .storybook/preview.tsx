import type { Preview } from '@storybook/react-vite'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const preloadedState = parameters.preloadedState
      const store = configureStore({ reducer: rootReducer, preloadedState })
      const { initialEntries, path } = parameters.reactRouter || {}

      const storyElement = path ? (
        <Routes>
          <Route path={path} element={<Story />} />
        </Routes>
      ) : (
        <Story />
      )

      return (
        <MemoryRouter initialEntries={initialEntries || ['/']}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              {storyElement}
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
    },
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
