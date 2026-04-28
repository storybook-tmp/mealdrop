import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CheckoutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible()
  },
}

export const WithCartItems: Story = {
  parameters: {
    store: {
      cart: {
        visible: false,
        items: [
          { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
          { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
        ],
      },
    },
  },
}
