import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <MemoryRouter>
            <div id="modal" />
            <Story />
          </MemoryRouter>
        </ThemeProvider>
      </StoreProvider>
    ),
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
  },
}

export default preview
