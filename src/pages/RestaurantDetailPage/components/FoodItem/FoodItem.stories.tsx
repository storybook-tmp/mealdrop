import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../../../stub/restaurants'
import { FoodItem } from './FoodItem'

const menuItem = restaurantsCompleteData[0].menu.food[0]

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
} satisfies Meta<typeof FoodItem>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {
  args: {
    ...menuItem,
    onClick: () => {},
  },
}

export const InCart: Story = {
  args: {
    ...menuItem,
    quantity: 2,
    onClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/food quantity/i)).toHaveTextContent('2')
  },
}

export const WithoutDescription: Story = {
  args: {
    name: 'Sparkling water',
    price: 2.25,
    onClick: () => {},
  },
}
