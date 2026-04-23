import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { rootReducer, type RootState } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import { defaultMswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

type RouterParameters = {
  initialEntries?: string[]
  routePath?: string
}

const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  })

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const router = (context.parameters.router ?? {}) as RouterParameters
      const initialEntries = router.initialEntries ?? ['/']
      const routePath = router.routePath
      const store = createStore(context.parameters.reduxState as Partial<RootState> | undefined)
      const isDarkMode = Boolean(context.parameters.darkMode)
      const content = routePath ? (
        <Routes>
          <Route path={routePath} element={<Story />} />
        </Routes>
      ) : (
        <Story />
      )

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
              <GlobalStyle />
              {content}
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
  async beforeEach({ parameters }) {
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('darkMode', JSON.stringify(Boolean(parameters.darkMode)))
    document.body.style.overflow = ''
  },
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
      handlers: defaultMswHandlers,
    },
  },
}

export default preview
