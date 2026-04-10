import * as React from 'react'
import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { initialize, mswLoader } from 'msw-storybook-addon'
import useDarkMode from 'use-dark-mode'

import { rootReducer, type RootState } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'

import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

type RouterParameters = {
  initialEntry?: string
  path?: string
}

type StoryParameters = {
  reactRouter?: RouterParameters
  reduxState?: Partial<RootState>
}

const StorybookProviders = ({
  children,
  initialEntry,
  path,
  reduxState,
}: React.PropsWithChildren<{
  initialEntry: string
  path: string
  reduxState?: Partial<RootState>
}>) => {
  const store = React.useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
        preloadedState: reduxState,
      }),
    [reduxState]
  )
  const { value } = useDarkMode(false, { global: globalThis.window })
  const theme = value ? darkTheme : lightTheme

  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path={path} element={<>{children}</>} />
          </Routes>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const parameters = context.parameters as StoryParameters
      const { reactRouter, reduxState } = parameters

      return (
        <StorybookProviders
          initialEntry={reactRouter?.initialEntry ?? '/'}
          path={reactRouter?.path ?? '*'}
          reduxState={reduxState}
        >
          <Story />
        </StorybookProviders>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: mswHandlers,
    },
    a11y: {
      test: 'todo',
    },
  },
  async beforeEach() {
    localStorage.setItem('darkMode', 'false')
    document.querySelector('#modal')?.replaceChildren()
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
  },
}

export default preview
