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
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('go to home page')).toBeVisible()
    expect(canvas.queryByLabelText('food cart')).not.toBeInTheDocument()
  },
}

export const WithCartItems: Story = {
  args: {
    totalPrice: 19.5,
    cartItems: [
      { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2, description: 'Nice grilled burger' },
      { id: 2, name: 'Fries', price: 2.5, quantity: 1, description: 'Fried french fries' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('food cart')).toBeVisible()
  },
}
