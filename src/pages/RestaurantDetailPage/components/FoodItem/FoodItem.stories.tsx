import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { FoodItem } from './FoodItem'

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
    onClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
    await expect(canvas.getByText(/8\.50/)).toBeVisible()
  },
}

export const WithQuantity: Story = {
  args: {
    ...Default.args,
    quantity: 3,
  },
}

export const NoDescription: Story = {
  args: {
    name: 'Coca-Cola',
    price: 1.75,
    onClick: () => {},
  },
}
