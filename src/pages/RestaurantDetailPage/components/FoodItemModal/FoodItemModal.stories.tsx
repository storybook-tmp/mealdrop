import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { FoodItemModal } from './FoodItemModal'

const meta = {
  component: FoodItemModal,
  tags: ['ai-generated'],
} satisfies Meta<typeof FoodItemModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: {
      id: 1,
      name: 'Cheeseburger',
      description: 'Nice grilled burger with cheese',
      price: 8.5,
      quantity: 1,
    },
    cartItems: [],
    onClose: () => {},
    onItemSave: () => {},
    onItemRemove: () => {},
  },
  play: async ({ canvas, userEvent, canvasElement }) => {
    const document = canvasElement.ownerDocument
    const modal = document.querySelector('[data-testid="modal"]')
    await expect(modal).not.toBeNull()
    const increaseBtn = document.querySelector('[aria-label="increase quantity by one"]')
    if (increaseBtn) {
      await userEvent.click(increaseBtn)
    }
  },
}

export const Closed: Story = {
  args: {
    item: undefined,
    cartItems: [],
    onClose: () => {},
    onItemSave: () => {},
    onItemRemove: () => {},
  },
}
