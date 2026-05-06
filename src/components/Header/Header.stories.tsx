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
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
  },
}

export const WithCartItems: Story = {
  args: {
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2, description: '' },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1, description: '' },
    ],
    totalPrice: 19.5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText('€19.50')).toBeVisible()
  },
}
