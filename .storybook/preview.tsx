import type { Decorator, Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer, type RootState } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'

import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

type AppRouteParameters = {
  initialEntry?: string
  path?: string
}

type AppStoreParameters = {
  preloadedState?: Partial<RootState>
}

type AppProviderShellProps = {
  children: ReactNode
  parameters: Record<string, unknown>
  storyId: string
}

const createStoryStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
  })

const AppProviderShell = ({ children, parameters, storyId }: AppProviderShellProps) => {
  const appRoute = parameters.appRoute as AppRouteParameters | undefined
  const appStore = parameters.appStore as AppStoreParameters | undefined
  const { value: isDarkMode } = useDarkMode(false, { global: globalThis.window })
  const theme = isDarkMode ? darkTheme : lightTheme
  const store = useMemo(
    () => createStoryStore(appStore?.preloadedState),
    [appStore?.preloadedState, storyId]
  )
  const initialEntry = appRoute?.initialEntry || '/'
  const routePath = appRoute?.path
  const story = routePath ? (
    <Routes>
      <Route path={routePath} element={children} />
    </Routes>
  ) : (
    children
  )

  return (
    <MemoryRouter initialEntries={[initialEntry]} key={`${storyId}-${initialEntry}-${routePath}`}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {story}
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

const withAppProviders: Decorator = (Story, context) => (
  <AppProviderShell parameters={context.parameters} storyId={context.id}>
    <Story />
  </AppProviderShell>
)

const preview: Preview = {
  decorators: [withAppProviders],
  loaders: [mswLoader],
  async beforeEach() {
    localStorage.setItem('darkMode', 'false')
    document.body.classList.remove('dark-mode')
    document.body.classList.add('light-mode')
    document.body.style.height = 'auto'
    document.body.style.overflow = 'auto'
    document.querySelector('#modal')?.replaceChildren()
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
      handlers: mswHandlers,
    },
  },
}

export default preview
