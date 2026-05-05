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
  },
}

export const LogoOnly: Story = {
  args: { logoOnly: true },
}

export const WithCartItems: Story = {
  args: { totalPrice: 25.5, cartItems: [{ id: 1, name: 'Burger', price: 8.5, quantity: 3 }] },
}
