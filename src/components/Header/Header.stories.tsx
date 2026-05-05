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
  args: {
    logoOnly: false,
    sticky: false,
    totalPrice: 0,
    cartItems: [],
    isCartVisible: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
  },
}

export const WithCartItems: Story = {
  args: {
    logoOnly: false,
    sticky: false,
    totalPrice: 11,
    cartItems: [
      { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5, quantity: 1 },
      { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5, quantity: 1 },
    ],
    isCartVisible: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
  },
}
