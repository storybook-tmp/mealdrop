import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import React from 'react'

import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { store } from '../src/app-state'

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
