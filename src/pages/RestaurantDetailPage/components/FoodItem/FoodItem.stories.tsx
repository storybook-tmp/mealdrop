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
  play: async ({ canvas, userEvent, args }) => {
    const item = canvas.getByText('Cheeseburger')
    await userEvent.click(item)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const WithQuantity: Story = {
  args: {
    name: 'Fries',
    description: 'Fried french fries',
    price: 2.5,
    quantity: 3,
  },
}

export const NoDescription: Story = {
  args: {
    name: 'Coca-Cola',
    price: 1.75,
  },
}
