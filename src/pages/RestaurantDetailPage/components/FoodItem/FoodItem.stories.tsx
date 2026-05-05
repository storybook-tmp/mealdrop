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
  render: () => (
    <FoodItem
      name="Cheeseburger"
      description="Nice grilled burger with cheese"
      price={8.5}
      onClick={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByText('Nice grilled burger with cheese')).toBeVisible()
  },
}

export const WithQuantity: Story = {
  render: () => (
    <FoodItem
      name="Cheeseburger"
      description="Nice grilled burger with cheese"
      price={8.5}
      quantity={3}
      onClick={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
    await expect(canvas.getByLabelText('food quantity')).toBeVisible()
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('3')
  },
}

export const NoDescription: Story = {
  render: () => (
    <FoodItem
      name="Coca-Cola"
      price={1.75}
      onClick={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Coca-Cola')).toBeVisible()
  },
}
