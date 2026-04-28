import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { HeaderComponent } from './Header'

const meta = preview.meta({
  component: HeaderComponent,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    logoOnly: false,
    sticky: false,
    totalPrice: 0,
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
})

export const LogoOnly = meta.story({
  args: {
    logoOnly: true,
    sticky: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
  },
})

export const WithCartItems = meta.story({
  args: {
    logoOnly: false,
    sticky: false,
    totalPrice: 27.98,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 12.99, quantity: 1 },
      { id: 2, name: 'Bacon Burger', price: 14.99, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
})
