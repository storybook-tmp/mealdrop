import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { HeaderComponent } from './Header'

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText(/go to home page/i)).toBeVisible()
    await expect(canvas.getByLabelText(/food cart/i)).toBeVisible()
  },
}

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.97,
    cartItems: [
      { id: 1, name: 'Classic Burger', price: 9.99, quantity: 2 },
      { id: 2, name: 'Milkshake', price: 5.99, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByText(/order/i)).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/go to home page/i)).toBeVisible()
    const cartButton = canvas.queryByLabelText(/food cart/i)
    await expect(cartButton).toBeNull()
  },
}
