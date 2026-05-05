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
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Nice grilled burger with cheese')).toBeVisible()
  },
}

export const WithQuantity: Story = {
  args: {
    name: 'Fries',
    description: 'Fried french fries',
    price: 2.5,
    quantity: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fries')).toBeVisible()
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const NoDescription: Story = {
  args: {
    name: 'Coca-Cola',
    price: 1.75,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
  },
}
