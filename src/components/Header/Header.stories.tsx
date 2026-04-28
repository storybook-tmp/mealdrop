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
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
})

export const WithCartItems = meta.story({
  args: {
    totalPrice: 14.75,
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 1 },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
      { id: 4, name: 'Coca-Cola', price: 1.75, quantity: 2 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
  },
})

export const LogoOnly = meta.story({
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
  },
})
