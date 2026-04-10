import * as React from 'react'
import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import useDarkMode from 'use-dark-mode'
import { ThemeProvider } from 'styled-components'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer, type RootState } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

type StoryParameters = {
  appState?: Partial<RootState>
  browserState?: {
    darkMode?: boolean
  }
  route?: {
    initialEntry?: string
    path?: string
  }
}

type StoryEnvironmentProps = React.PropsWithChildren<{
  parameters: StoryParameters
}>

const seedBrowserState = (parameters: StoryParameters) => {
  const darkMode = parameters.browserState?.darkMode ?? false

  globalThis.localStorage.setItem('darkMode', JSON.stringify(darkMode))
  globalThis.document.body.style.overflow = 'auto'
  globalThis.document.body.style.height = 'auto'
  globalThis.document.querySelector('#modal')?.replaceChildren()
}

const StoryEnvironment = ({ children, parameters }: StoryEnvironmentProps) => {
  const storeRef = React.useRef(
    configureStore({
      reducer: rootReducer,
      preloadedState: parameters.appState as RootState | undefined,
    })
  )
  const darkMode = useDarkMode(false, { global: globalThis.window })
  const theme = darkMode.value ? darkTheme : lightTheme
  const initialEntry = parameters.route?.initialEntry ?? '/'
  const path = parameters.route?.path ?? '/*'

  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <StoreProvider store={storeRef.current}>
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
  decorators: [
    (Story, context) => {
      const parameters = context.parameters as StoryParameters
      seedBrowserState(parameters)

      return (
        <StoryEnvironment parameters={parameters}>
          <Story />
        </StoryEnvironment>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    layout: 'fullscreen',
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
