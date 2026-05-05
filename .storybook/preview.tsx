import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../src/app-state/store'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const store = configureStore({ reducer: rootReducer })
      const useCustomRouter = context.parameters?.useCustomRouter

      const content = (
        <StoreProvider store={store}>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            {!useCustomRouter && <div id="modal" />}
            <Story />
          </ThemeProvider>
        </StoreProvider>
      )

      if (useCustomRouter) {
        return content
      }

      return <MemoryRouter>{content}</MemoryRouter>
    },
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
