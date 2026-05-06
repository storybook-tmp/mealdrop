import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer })
      const skipRouter = context.parameters.skipRouter
      const content = (
        <StoreProvider store={store}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </StoreProvider>
      )
      if (skipRouter) {
        return content
      }
      return <MemoryRouter>{content}</MemoryRouter>
    },
  ],
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
}

export default preview
