import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { FoodItem } from './FoodItem'

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
  args: {
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
    onClick: () => {},
  },
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText(/8\.50/)).toBeVisible()
  },
}

export const WithQuantity: Story = {
  args: { quantity: 3 },
}

export const NoDescription: Story = {
  args: { name: 'Coca-Cola', description: undefined, price: 1.75 },
}
