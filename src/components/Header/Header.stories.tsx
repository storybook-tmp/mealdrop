import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { HeaderComponent } from './Header'

const meta = preview.meta({
  component: HeaderComponent,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
})

export const LogoOnly = meta.story({
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
  },
})

export const WithCartItems = meta.story({
  args: {
    totalPrice: 25.97,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 9.99, quantity: 2 },
      { id: 2, name: 'Milkshake', price: 5.99, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
})
