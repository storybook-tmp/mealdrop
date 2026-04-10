import type { Decorator, Preview, StoryContext } from '@storybook/react-vite'
import { StrictMode, useRef, type PropsWithChildren } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer, type RootState } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const withAppRuntime: Decorator = (Story, context) => {
  const appParameters = getAppParameters(context)
  return (
    <StorybookAppShell
      preloadedState={appParameters.preloadedState}
      routePath={appParameters.routePath}
    >
      <Story />
    </StorybookAppShell>
  )
}

function StorybookAppShell({
  children,
  preloadedState,
  routePath,
}: PropsWithChildren<{
  preloadedState?: AppParameters['preloadedState']
  routePath?: AppParameters['routePath']
}>) {
  const storeRef = useRef(createStore(preloadedState))
  const { value } = useDarkMode(false, { global: globalThis.window })
  const theme = value ? darkTheme : lightTheme

  return (
    <StrictMode>
      <BrowserRouter>
        <StoreProvider store={storeRef.current}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <StorybookRoutes routePath={routePath}>{children}</StorybookRoutes>
          </ThemeProvider>
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>
  )
}

function StorybookRoutes({
  children,
  routePath = '*',
}: PropsWithChildren<{ routePath?: string }>) {
  return (
    <Routes>
      <Route path={routePath} element={<>{children}</>} />
    </Routes>
  )
}

function createStore(preloadedState?: AppParameters['preloadedState']) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: mergePreloadedState(preloadedState),
  })
}

function mergePreloadedState(preloadedState?: AppParameters['preloadedState']) {
  const baseState = rootReducer(undefined, { type: '@@storybook/INIT' })

  if (!preloadedState) {
    return baseState
  }

  return {
    ...baseState,
    ...preloadedState,
    cart: {
      ...baseState.cart,
      ...preloadedState.cart,
    },
    order: {
      ...baseState.order,
      ...preloadedState.order,
    },
  }
}

function resetBrowserState() {
  globalThis.localStorage.clear()
  globalThis.sessionStorage.clear()
  document.body.classList.remove('dark-mode', 'light-mode')
  document.body.style.overflow = 'auto'
  document.body.style.height = 'auto'
}

function seedBrowserState({ darkMode = false, route = '/' }: AppParameters) {
  globalThis.localStorage.setItem('darkMode', JSON.stringify(darkMode))
  window.history.replaceState({}, '', route)
}

function getAppParameters(context: StoryContext): AppParameters {
  return (context.parameters.app as AppParameters | undefined) ?? {}
}

type AppParameters = {
  darkMode?: boolean
  route?: string
  routePath?: string
  preloadedState?: {
    cart?: Partial<RootState['cart']>
    order?: Partial<RootState['order']>
  }
}

const preview: Preview = {
  decorators: [withAppRuntime],
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
  async beforeEach(context) {
    resetBrowserState()
    seedBrowserState(getAppParameters(context))
  },
}

export default preview
