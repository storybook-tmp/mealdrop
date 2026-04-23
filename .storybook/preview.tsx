import * as React from 'react'
import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

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
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <div id="modal" />
            <Story />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    ),
  ],
}

export default preview
