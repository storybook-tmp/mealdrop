import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { lightTheme } from '../src/styles/theme'
import { store } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'

const preview: Preview = {
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
  decorators: [
    (Story) => (
      <StoreProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <MemoryRouter>
            <GlobalStyle />
            <Story />
          </MemoryRouter>
        </ThemeProvider>
      </StoreProvider>
    ),
  ],
}

export default preview
