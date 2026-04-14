import { configureStore } from '@reduxjs/toolkit'
import type { Decorator, Preview, StoryContext, StoryFn } from '@storybook/react-vite'
import { useMemo, type ReactElement } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { initialize, mswLoader } from 'msw-storybook-addon'
import useDarkMode from 'use-dark-mode'

import { rootReducer, type RootState } from '../src/app-state/store'
import { CategoryDetailPage } from '../src/pages/CategoryDetailPage'
import { CategoryListPage } from '../src/pages/CategoryListPage'
import { CheckoutPage } from '../src/pages/CheckoutPage'
import { HomePage } from '../src/pages/HomePage'
import { RestaurantDetailPage } from '../src/pages/RestaurantDetailPage'
import { SuccessPage } from '../src/pages/SuccessPage'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'

import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [withAppEnvironment],
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
  async beforeEach(context) {
    const { darkMode = false } = getMealdropParameters(context)

    localStorage.setItem('darkMode', String(darkMode))
    document.body.classList.remove('dark-mode', 'light-mode')
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
  },
}

export default preview

function withAppEnvironment(Story: StoryFn, context: StoryContext) {
  return <StorybookApp Story={Story} context={context} />
}

type StorybookAppProps = {
  Story: StoryFn
  context: StoryContext
}

type MealdropParameters = {
  darkMode?: boolean
  initialPath?: string
  routePath?: string
  preloadedState?: Partial<RootState>
}

function StorybookApp({ Story, context }: StorybookAppProps) {
  const { value } = useDarkMode(false, { global: globalThis.window })
  const { initialPath, preloadedState, routePath } = getMealdropParameters(context)
  const preloadedStateKey = JSON.stringify(preloadedState ?? {})
  const resolvedPreloadedState = useMemo(
    () => resolvePreloadedState(preloadedState),
    [preloadedState, preloadedStateKey]
  )
  const store = useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
        preloadedState: resolvedPreloadedState,
      }),
    [context.id, resolvedPreloadedState]
  )
  const storyElement = Story(context.args, context)

  return (
    <MemoryRouter key={`${context.id}:${initialPath}`} initialEntries={[initialPath]}>
      <StoreProvider store={store}>
        <ThemeProvider theme={value ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Routes>{buildRoutes(routePath, storyElement)}</Routes>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

function buildRoutes(routePath: string, storyElement: ReactElement) {
  const appRoutes = [
    { path: '/categories', element: <CategoryListPage /> },
    { path: '/categories/:id', element: <CategoryDetailPage /> },
    { path: '/restaurants/:id', element: <RestaurantDetailPage /> },
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/success', element: <SuccessPage /> },
    { path: '/', element: <HomePage /> },
  ]
  const hasMatchingAppRoute = appRoutes.some(({ path }) => path === routePath)

  return (
    <>
      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={path === routePath ? storyElement : element} />
      ))}
      {!hasMatchingAppRoute && <Route path={routePath} element={storyElement} />}
    </>
  )
}

function getMealdropParameters(context: StoryContext): Required<Omit<MealdropParameters, 'preloadedState'>> &
  Pick<MealdropParameters, 'preloadedState'> {
  const parameters = (context.parameters.mealdrop ?? {}) as MealdropParameters

  return {
    darkMode: parameters.darkMode ?? false,
    initialPath: parameters.initialPath ?? '/__storybook__',
    routePath: parameters.routePath ?? '/__storybook__',
    preloadedState: parameters.preloadedState,
  }
}

function resolvePreloadedState(preloadedState?: Partial<RootState>): RootState {
  return {
    cart: {
      items: preloadedState?.cart?.items ?? [],
      visible: preloadedState?.cart?.visible ?? false,
    },
    order: {
      items: preloadedState?.order?.items ?? [],
    },
  }
}
