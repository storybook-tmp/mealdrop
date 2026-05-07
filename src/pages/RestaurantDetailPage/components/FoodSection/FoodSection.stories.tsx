import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { cartItems } from '../../../../stub/cart-items'
import { restaurantsCompleteData } from '../../../../stub/restaurants'

import { FoodSection } from './FoodSection'

const menu = restaurantsCompleteData[0].menu

const meta = {
  component: FoodSection,
  tags: ['ai-generated'],
  args: {
    title: 'To eat',
    items: menu.food,
    cartItems: [],
    onItemClick: () => {},
  },
} satisfies Meta<typeof FoodSection>

export default meta
type Story = StoryObj<typeof meta>

export const FoodItems: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
    await expect(canvas.getByText(/nice grilled burger/i)).toBeVisible()
  },
}

export const WithSelectedQuantity: Story = {
  args: {
    cartItems: [cartItems[1]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /cheeseburger/i })).toBeVisible()
    await expect(canvas.getByLabelText(/food quantity/i)).toHaveTextContent('1')
  },
}

export const Drinks: Story = {
  args: {
    title: 'To drink',
    items: menu.drinks,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /to drink/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /fanta/i })).toBeVisible()
  },
}
