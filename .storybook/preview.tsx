import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { reducer as cart } from '../src/app-state/cart'
import { reducer as order } from '../src/app-state/order'
import { mswHandlers } from './msw-handlers'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  decorators: [
    (Story) => {
      if (!document.getElementById('modal')) {
        const el = document.createElement('div')
        el.id = 'modal'
        document.body.appendChild(el)
      }
      return <Story />
    },
    (Story) => {
      const store = configureStore({
        reducer: combineReducers({ cart, order }),
      })
      return (
        <MemoryRouter>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: mswHandlers },
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
