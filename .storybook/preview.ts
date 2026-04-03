import { createElement, type PropsWithChildren } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { definePreview } from '@storybook/react-vite'

import { rootReducer } from '../src/app-state/store'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme } from '../src/styles/theme'

function StoryProviders({ children }: PropsWithChildren) {
  const store = configureStore({
    reducer: rootReducer,
  })

  return createElement(
    StoreProvider,
    { store },
    createElement(
      ThemeProvider,
      { theme: lightTheme },
      createElement(
        MemoryRouter,
        null,
        createElement(GlobalStyle),
        createElement('div', { id: 'modal' }),
        children
      )
    )
  )
}

const preview = definePreview({
  decorators: [
    (Story) => createElement(StoryProviders, null, createElement(Story)),
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

export default preview
