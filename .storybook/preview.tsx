import { configureStore } from '@reduxjs/toolkit'
import type { Decorator, Preview, StoryContext } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { StrictMode, type PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'

import { BASE_URL } from '../src/api'
import { rootReducer, type RootState } from '../src/app-state'
import { CategoryDetailPage } from '../src/pages/CategoryDetailPage'
import { CategoryListPage } from '../src/pages/CategoryListPage'
import { CheckoutPage } from '../src/pages/CheckoutPage'
import { HomePage } from '../src/pages/HomePage'
import { RestaurantDetailPage } from '../src/pages/RestaurantDetailPage'
import { SuccessPage } from '../src/pages/SuccessPage'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import { restaurantsCompleteData } from '../src/stub/restaurants'

type StoryRouteConfig = {
  initialEntry?: string
  path?: string
}

type StoryPreloadedState = {
  cart?: Partial<RootState['cart']>
  order?: Partial<RootState['order']>
}

type StoryAppParameters = {
  darkMode?: boolean
  preloadedState?: StoryPreloadedState
  route?: StoryRouteConfig
}

type StorybookParameters = {
  app?: StoryAppParameters
}

type AppShellProps = PropsWithChildren<{
  context: StoryContext
}>

const defaultStoryRoute = {
  initialEntry: '/__story__',
  path: '/__story__',
} satisfies Required<StoryRouteConfig>

const defaultState = rootReducer(undefined, { type: '@@storybook/init' })

initialize({
  onUnhandledRequest: 'bypass',
  quiet: true,
})

const getRestaurantsByCategory = (category: string) =>
  restaurantsCompleteData
    .filter((restaurant) => restaurant.categories?.includes(category.toLowerCase()))
    .sort((restaurant) => (restaurant.isClosed ? 1 : -1))
    .sort((restaurant) => (restaurant.isNew ? -1 : 1))

const buildState = (preloadedState?: StoryPreloadedState) => ({
  cart: {
    ...defaultState.cart,
    ...preloadedState?.cart,
  },
  order: {
    ...defaultState.order,
    ...preloadedState?.order,
  },
})

const getAppParameters = (context: StoryContext): StoryAppParameters =>
  ((context.parameters as StorybookParameters).app ?? {})

const getRouteConfig = (context: StoryContext) => ({
  ...defaultStoryRoute,
  ...getAppParameters(context).route,
})

const seedDarkMode = (enabled = false) => {
  globalThis.localStorage.setItem('darkMode', enabled ? 'true' : 'false')
  document.body.classList.remove('dark-mode', 'light-mode')
  document.body.classList.add(enabled ? 'dark-mode' : 'light-mode')
}

const AppRoutes = ({ children, storyPath }: PropsWithChildren<{ storyPath: string }>) => {
  const routes = [
    {
      element: children,
      path: storyPath,
    },
    {
      element: <CategoryListPage />,
      path: '/categories',
    },
    {
      element: <CategoryDetailPage />,
      path: '/categories/:id',
    },
    {
      element: <RestaurantDetailPage />,
      path: '/restaurants/:id',
    },
    {
      element: <CheckoutPage />,
      path: '/checkout',
    },
    {
      element: <SuccessPage />,
      path: '/success',
    },
    {
      element: <HomePage />,
      path: '/',
    },
  ].filter((route, index, collection) => collection.findIndex((item) => item.path === route.path) === index)

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

const AppShell = ({ children, context }: AppShellProps) => {
  const appParameters = getAppParameters(context)
  const route = getRouteConfig(context)
  const storeRef = useRef(configureStore({ preloadedState: buildState(appParameters.preloadedState), reducer: rootReducer }))
  const darkMode = useDarkMode(false, { global: globalThis.window })
  const theme = darkMode.value ? darkTheme : lightTheme

  return (
    <StrictMode>
      <MemoryRouter initialEntries={[route.initialEntry]}>
        <Provider store={storeRef.current}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppRoutes storyPath={route.path}>{children}</AppRoutes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    </StrictMode>
  )
}

const withAppProviders: Decorator = (Story, context) => {
  seedDarkMode(getAppParameters(context).darkMode)

  return (
    <AppShell context={context}>
      <Story />
    </AppShell>
  )
}

const preview: Preview = {
  decorators: [withAppProviders],
  loaders: [mswLoader],
  async beforeEach() {
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.body.classList.remove('dark-mode', 'light-mode')
  },
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    msw: {
      handlers: [
        http.get(BASE_URL, ({ request }) => {
          const url = new URL(request.url)
          const id = url.searchParams.get('id')
          const category = url.searchParams.get('category')

          if (id) {
            const restaurant = restaurantsCompleteData.find((item) => item.id === id)

            if (!restaurant) {
              return new HttpResponse(null, { status: 404 })
            }

            return HttpResponse.json(restaurant)
          }

          if (category) {
            return HttpResponse.json(getRestaurantsByCategory(category))
          }

          return HttpResponse.json(restaurantsCompleteData)
        }),
      ],
    },
  },
}

export default preview
