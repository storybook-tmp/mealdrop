import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'

import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </MemoryRouter>
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
