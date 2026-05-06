import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { FoodItem } from './FoodItem'

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Margherita',
    description: 'Classic tomato and mozzarella',
    price: 12.99,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Margherita')).toBeVisible()
    await expect(canvas.getByText('Classic tomato and mozzarella')).toBeVisible()
  },
}

export const WithQuantity: Story = {
  args: {
    name: 'Pepperoni',
    description: 'Spicy pepperoni with cheese',
    price: 14.99,
    quantity: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pepperoni')).toBeVisible()
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const NoDescription: Story = {
  args: {
    name: 'Espresso',
    price: 2.99,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Espresso')).toBeVisible()
  },
}
