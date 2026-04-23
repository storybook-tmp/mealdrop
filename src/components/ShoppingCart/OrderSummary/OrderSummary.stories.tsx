import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { OrderSummary } from './OrderSummary'
import { cartItems } from '../../../stub/cart-items'

const meta = {
  component: OrderSummary,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof OrderSummary>

export default meta

type Story = StoryObj<typeof meta>

const frame = (items: typeof cartItems) => (
  <div style={{ maxWidth: '420px' }}>
    <OrderSummary cartItems={items} />
  </div>
)

export const Populated: Story = {
  args: {
    cartItems,
  },
  render: ({ cartItems: items }) => frame(items),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /your order/i })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Vanilla ice cream')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '€17.75' })).toBeVisible()
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
  render: ({ cartItems: items }) => frame(items),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/your cart is empty/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '€0.00' })).toBeVisible()
  },
}

export const MixedQuantities: Story = {
  args: {
    cartItems: [
      {
        ...cartItems[0],
        quantity: 3,
      },
      {
        ...cartItems[1],
        quantity: 2,
      },
    ],
  },
  render: ({ cartItems: items }) => frame(items),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('3')).toBeVisible()
    await expect(canvas.getByText('2')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: '€24.50' })).toBeVisible()
  },
}
