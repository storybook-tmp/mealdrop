import type { Preview } from '@storybook/react-vite'
import { configureStore } from '@reduxjs/toolkit'
import type { PropsWithChildren } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { rootReducer } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

function StoryProviders({ children }: PropsWithChildren) {
  const store = configureStore({
    reducer: rootReducer,
  })

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <GlobalStyle />
          <div id="modal" />
          {children}
        </MemoryRouter>
      </ThemeProvider>
    </StoreProvider>
  )
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoryProviders>
        <Story />
      </StoryProviders>
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
