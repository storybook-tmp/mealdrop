import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import type { CartItem } from '../../app-state/cart'

import { HeaderComponent } from './Header'

const cartItems: CartItem[] = [
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
    quantity: 2,
  },
  {
    id: 4,
    name: 'Coca-Cola',
    price: 1.75,
    quantity: 1,
  },
]

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
  args: {
    toggleCartVisibility: () => {},
    goToCheckout: () => {},
    saveItem: () => {},
  },
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/food cart/i)).toHaveAttribute('type', 'button')
  },
}

export const WithCartTotal: Story = {
  args: {
    totalPrice: 18.75,
    cartItems,
  },
}

export const OpenCart: Story = {
  args: {
    isCartVisible: true,
    totalPrice: 18.75,
    cartItems,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
}
