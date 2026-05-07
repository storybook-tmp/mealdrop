import type { Preview } from '@storybook/react-vite'
import type { Decorator } from '@storybook/react-vite'
import * as React from 'react'
import useDarkMode from 'use-dark-mode'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer, type RootState } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'

import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

type RouteParameters = {
  path?: string
  initialEntries?: string[]
}

type StoryParameters = {
  reduxState?: Partial<RootState>
  route?: RouteParameters
}

const StorybookProviders = ({
  Story,
  parameters,
}: {
  Story: React.ComponentType
  parameters: StoryParameters
}) => {
  const darkMode = useDarkMode(false, { global: globalThis.window })
  const theme = darkMode.value ? darkTheme : lightTheme
  const route = parameters.route
  const store = React.useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
        preloadedState: parameters.reduxState,
      }),
    [parameters.reduxState]
  )

  return (
    <MemoryRouter initialEntries={route?.initialEntries ?? ['/']}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path={route?.path ?? '*'} element={<Story />} />
          </Routes>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

const withAppEnvironment: Decorator = (Story, context) => (
  <StorybookProviders Story={Story} parameters={context.parameters as StoryParameters} />
)

const preview: Preview = {
  decorators: [withAppEnvironment],
  loaders: [mswLoader],
  beforeEach() {
    localStorage.setItem('darkMode', 'false')
  },
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
