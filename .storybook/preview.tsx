import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'
import { mswHandlers } from './msw-handlers'

import 'react-multi-carousel/lib/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'

initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const initialPath: string = (context.parameters as Record<string, unknown>)?.initialPath as string ?? '/'
      return (
        <MemoryRouter initialEntries={[initialPath]}>
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
