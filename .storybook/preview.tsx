import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { configureStore } from '@reduxjs/toolkit'
import { initialize, mswLoader } from 'msw-storybook-addon'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story) => {
      const storyStore = configureStore({ reducer: rootReducer })
      return (
        <MemoryRouter>
          <Provider store={storyStore}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Story />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>
      )
    },
  ],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
    },
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
