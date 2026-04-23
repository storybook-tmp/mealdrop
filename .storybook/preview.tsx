import { StrictMode, useMemo } from 'react'
import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'

import { api } from '../src/api'
import { rootReducer, type RootState } from '../src/app-state/store'
import { restaurantsCompleteData } from '../src/stub/restaurants'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import type { Restaurant } from '../src/types'

type StoryParameters = {
  appState?: Partial<RootState>
  route?: {
    entry?: string
    path?: string
  }
}

type RouteConfig = Required<NonNullable<StoryParameters['route']>>

function cloneRestaurants(): Restaurant[] {
  return typeof structuredClone === 'function'
    ? structuredClone(restaurantsCompleteData)
    : JSON.parse(JSON.stringify(restaurantsCompleteData))
}

function applyRestaurantApiMocks() {
  api.getRestaurants = async () => cloneRestaurants()
  api.getRestaurantById = async (id: string) => {
    const restaurant = cloneRestaurants().find((candidate) => candidate.id === id)

    if (!restaurant) {
      throw { response: { status: 404 } }
    }

    return restaurant
  }
  api.getRestaurantsByCategory = async (category: string) =>
    cloneRestaurants()
      .filter((restaurant) => restaurant.categories?.includes(category.toLowerCase()))
      .sort((restaurant) => (restaurant.isClosed ? 1 : -1))
      .sort((restaurant) => (restaurant.isNew ? -1 : 1))
}

function getPreloadedState(appState?: Partial<RootState>): RootState {
  return {
    cart: {
      visible: appState?.cart?.visible ?? false,
      items: appState?.cart?.items ?? [],
    },
    order: {
      items: appState?.order?.items ?? [],
    },
  }
}

function getRouteConfig(route?: StoryParameters['route']): RouteConfig {
  return {
    entry: route?.entry ?? '/',
    path: route?.path ?? '*',
  }
}

function syncRoute(entry: string) {
  if (typeof window === 'undefined') {
    return
  }

  const nextUrl = new URL(entry, window.location.origin)
  const currentUrl = new URL(window.location.href)

  if (
    currentUrl.pathname !== nextUrl.pathname ||
    currentUrl.search !== nextUrl.search ||
    currentUrl.hash !== nextUrl.hash
  ) {
    window.history.replaceState({}, '', nextUrl)
  }
}

function createMatchMedia(query: string) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }
}

function StorybookAppShell({
  children,
  preloadedState,
  route,
}: {
  children: React.ReactNode
  preloadedState: RootState
  route: RouteConfig
}) {
  const { value } = useDarkMode(false, { global: globalThis.window })
  const theme = value ? darkTheme : lightTheme
  const store = useMemo(
    () => configureStore({ reducer: rootReducer, preloadedState }),
    [JSON.stringify(preloadedState)]
  )

  return (
    <StrictMode>
      <BrowserRouter>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes>
              <Route path={route.path} element={children} />
            </Routes>
          </ThemeProvider>
        </StoreProvider>
      </BrowserRouter>
    </StrictMode>
  )
}

applyRestaurantApiMocks()

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const parameters = context.parameters as StoryParameters
      const route = getRouteConfig(parameters.route)

      syncRoute(route.entry)

      return (
        <StorybookAppShell
          preloadedState={getPreloadedState(parameters.appState)}
          route={route}
        >
          <Story />
        </StorybookAppShell>
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
    a11y: {
      test: 'todo',
    },
  },
  async beforeEach() {
    if (typeof window === 'undefined') {
      return
    }

    applyRestaurantApiMocks()
    localStorage.setItem('darkMode', JSON.stringify(false))
    document.body.classList.remove('dark-mode', 'light-mode')

    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: (query: string) => createMatchMedia(query),
      })
    }

    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: () => undefined,
    })
  },
}

export default preview
