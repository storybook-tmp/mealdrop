import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { toCurrency } from '../../helpers'
import { cartItems } from '../../stub/cart-items'

import { ShoppingCartMenu } from './ShoppingCartMenu'

const meta = {
  component: ShoppingCartMenu,
  args: {
    isOpen: true,
    onClose: fn(),
    onGoToCheckoutClick: fn(),
    onItemChange: fn(),
  },
  render: (args) => <ShoppingCartMenu {...args} />,
} satisfies Meta<typeof ShoppingCartMenu>

export default meta

type Story = StoryObj<typeof meta>

export const OpenWithItems: Story = {
  args: {
    cartItems: cartItems.slice(0, 3),
    totalPrice: cartItems.slice(0, 3).reduce((total, item) => total + item.price * item.quantity, 0),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible()
    await expect(canvas.getByText(/^Fries$/)).toBeVisible()
    await expect(canvas.getByText(/^Cheeseburger$/)).toBeVisible()
    await expect(canvas.getByText(toCurrency(13))).toBeVisible()
  },
}

export const EmptyCart: Story = {
  args: {
    cartItems: [],
    totalPrice: 0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled()
    await expect(canvas.getByText(toCurrency(0))).toBeVisible()
  },
}

export const QuantityChange: Story = {
  args: {
    cartItems: [cartItems[0]],
    totalPrice: cartItems[0].price * cartItems[0].quantity,
  },
  play: async ({ args, canvas, userEvent }) => {
    const quantitySelect = canvas.getByRole('combobox', { name: /1 times/i })

    await userEvent.selectOptions(quantitySelect, '3')

    await expect(args.onItemChange).toHaveBeenCalledWith({
      ...cartItems[0],
      quantity: 3,
    })
  },
}
