import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'
import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof SuccessPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('13:23 today')).toBeVisible()
  },
}

export const WithOrderItems: Story = {
  parameters: {
    preloadedState: {
      cart: { visible: false, items: [] },
      order: { items: cartItems },
    },
  },
  render: () => <SuccessPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Fries')).toBeVisible()
  },
}
