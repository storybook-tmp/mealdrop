import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const cartItems = [
  {
    ...restaurantsCompleteData[0].menu.food[0],
    quantity: 2,
  },
  {
    ...restaurantsCompleteData[0].menu.drinks[0],
    quantity: 1,
  },
]

const meta = {
  component: ShoppingCartMenu,
  render: (args) => <ShoppingCartMenu {...args} />,
  args: {
    onClose: () => {},
    onItemChange: () => {},
    onGoToCheckoutClick: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>

export default meta

type Story = StoryObj<typeof meta>

export const OpenWithItems: Story = {
  args: {
    isOpen: true,
    cartItems,
    totalPrice: 18.75,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your order/i)).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeEnabled()
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    cartItems: [],
    totalPrice: 0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your order/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
    await expect(canvas.getByTestId('sidebar-footer')).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    cartItems,
    totalPrice: 18.75,
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText(/your order/i)).toBeNull()
    await expect(canvas.queryByTestId('sidebar')).toBeNull()
    await expect(canvas.queryByRole('button', { name: /checkout/i })).toBeNull()
  },
}
