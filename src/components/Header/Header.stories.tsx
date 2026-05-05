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
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    // Cart button should not be present in logo-only mode
    const cartButtons = canvas.queryByLabelText('food cart')
    await expect(cartButtons).toBeNull()
  },
}

export const WithCartItems: Story = {
  args: {
    totalPrice: 25.5,
    cartItems: [
      {
        id: 1,
        name: 'Cheeseburger',
        description: 'Nice grilled burger with cheese',
        price: 8.5,
        quantity: 3,
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/€25\.50/)).toBeVisible()
  },
}
