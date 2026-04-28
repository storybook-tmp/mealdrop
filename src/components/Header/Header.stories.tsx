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
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible()
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
    const cartButton = canvas.queryByRole('button', { name: /food cart/i })
    await expect(cartButton).toBeNull()
  },
}

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.5,
    cartItems: [
      { id: 1, name: 'Spring Rolls', price: 6.5, quantity: 2 },
      { id: 2, name: 'Pho Soup', price: 12.0, quantity: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
    await expect(canvas.getByText(/order/i)).toBeVisible()
  },
}
