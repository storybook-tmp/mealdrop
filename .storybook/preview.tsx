import type { Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import useDarkMode from 'use-dark-mode'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { clearCartAction, saveItemAction, toggleVisibilityAction } from '../src/app-state/cart'
import { clearOrderAction, saveOrderAction } from '../src/app-state/order'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import type { CartItem } from '../src/app-state/cart'

import { mswHandlers } from './msw-handlers'

initialize({ onUnhandledRequest: 'bypass' })

type StorybookAppShellProps = {
  children: ReactNode
  route: string
  routePath: string
}

const StorybookAppShell = ({ children, route, routePath }: StorybookAppShellProps) => {
  const { value } = useDarkMode(false, { global: globalThis.window })
  const theme = value ? darkTheme : lightTheme

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path={routePath} element={<>{children}</>} />
            <Route path="*" element={<>{children}</>} />
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
      const route = typeof context.parameters.route === 'string' ? context.parameters.route : '/'
      const routePath =
        typeof context.parameters.routePath === 'string' ? context.parameters.routePath : '*'

      return (
        <StorybookAppShell route={route} routePath={routePath}>
          <Story />
        </StorybookAppShell>
      )
    },
  ],
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
    layout: 'fullscreen',
    msw: {
      handlers: mswHandlers,
    },
  },
  async beforeEach(context) {
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('darkMode', 'false')
    document.body.classList.remove('dark-mode')
    document.body.classList.add('light-mode')
    store.dispatch(clearCartAction())
    store.dispatch(clearOrderAction())

    const cartItems = Array.isArray(context.parameters.cartItems)
      ? (context.parameters.cartItems as CartItem[])
      : []
    const orderItems = Array.isArray(context.parameters.orderItems)
      ? (context.parameters.orderItems as CartItem[])
      : []

    for (const item of cartItems) {
      store.dispatch(saveItemAction(item))
    }

    if (context.parameters.cartVisible) {
      store.dispatch(toggleVisibilityAction())
    }

    if (orderItems.length > 0) {
      store.dispatch(saveOrderAction(orderItems))
    }
  },
}

export default preview
