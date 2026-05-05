import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { FoodItem } from './FoodItem'

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
  args: {
    name: 'Classic Burger',
    price: 9.99,
    description: 'Beef patty with lettuce and tomato',
    onClick: fn(),
  },
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await canvas.getByText('Classic Burger').click()
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const WithQuantity: Story = {
  args: { quantity: 3 },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const NoDescription: Story = {
  args: { description: undefined },
}
