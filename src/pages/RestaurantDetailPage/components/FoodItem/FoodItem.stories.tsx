import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { fn } from 'storybook/test'

import { FoodItem } from './FoodItem'

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and cheese',
    price: 9.99,
    onClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Classic Burger')).toBeVisible()
    await expect(canvas.getByText(/juicy beef patty/i)).toBeVisible()
  },
}

export const WithQuantity: Story = {
  args: {
    name: 'Salmon Roll',
    description: 'Fresh salmon with avocado',
    price: 12.99,
    quantity: 3,
    onClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Salmon Roll')).toBeVisible()
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const Clickable: Story = {
  args: {
    name: 'Margherita Pizza',
    description: 'Classic tomato, mozzarella, basil',
    price: 11.99,
    onClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const item = canvas.getByText('Margherita Pizza')
    await expect(item).toBeVisible()
    await userEvent.click(item)
    await expect(args.onClick).toHaveBeenCalled()
  },
}
