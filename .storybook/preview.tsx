import { useLayoutEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { definePreview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'

import { store } from '../src/app-state'
import { clearCartAction } from '../src/app-state/cart'
import { clearOrderAction } from '../src/app-state/order'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

type StoryDecoratorProps = {
  children: React.ReactNode
}

function StoryDecorator({ children }: StoryDecoratorProps) {
  useLayoutEffect(() => {
    store.dispatch(clearCartAction())
    store.dispatch(clearOrderAction())
  }, [])

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <MemoryRouter initialEntries={['/']}>
          {children}
          <div id="modal" />
        </MemoryRouter>
      </ThemeProvider>
    </StoreProvider>
  )
}

export const config = definePreview({
  decorators: [
    (Story) => (
      <StoryDecorator>
        <Story />
      </StoryDecorator>
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
})

export default config
