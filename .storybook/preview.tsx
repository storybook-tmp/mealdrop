import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
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
      <ReduxProvider store={store}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </ThemeProvider>
      </ReduxProvider>
    ),
  ],
}

export default preview
