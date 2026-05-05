import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'
import { mswHandlers } from './msw-handlers'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
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
  decorators: [
    (Story, context) => {
      const initialEntries: string[] = context.parameters.initialEntries ?? ['/']
      const routePath: string | undefined = context.parameters.routePath

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <StoreProvider store={store}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              {routePath ? (
                <Routes>
                  <Route path={routePath} element={<Story />} />
                </Routes>
              ) : (
                <Story />
              )}
            </ThemeProvider>
          </StoreProvider>
        </MemoryRouter>
      )
    },
  ],
}

export default preview
