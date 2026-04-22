import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { initialEntries = ['/'], path = '*' } = (context.parameters?.router ?? {}) as {
        initialEntries?: string[]
        path?: string
      }
      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Routes>
                <Route path={path} element={<Story />} />
              </Routes>
            </ThemeProvider>
          </StoreProvider>
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
