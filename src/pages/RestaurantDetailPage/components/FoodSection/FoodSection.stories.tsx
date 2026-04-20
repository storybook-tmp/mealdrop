import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { cartItems } from '../../../../stub/cart-items'
import { restaurantsCompleteData } from '../../../../stub/restaurants'

import { FoodSection } from './FoodSection'

const menu = restaurantsCompleteData[0].menu

const meta = {
  component: FoodSection,
} satisfies Meta<typeof FoodSection>

export default meta
type Story = StoryObj<typeof meta>

export const Food: Story = {
  args: {
    title: 'To eat',
    items: menu.food,
    cartItems: [],
    onItemClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const cheeseburger = canvas.getByRole('heading', { name: /cheeseburger/i })

    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible()
    await expect(cheeseburger).toBeVisible()

    await userEvent.click(cheeseburger)
    await expect(args.onItemClick).toHaveBeenCalled()
  },
}

export const WithCartQuantity: Story = {
  args: {
    title: 'To eat',
    items: menu.food,
    cartItems,
    onItemClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /fries/i })).toBeVisible()
    await expect(canvas.getAllByLabelText(/food quantity/i)).toHaveLength(2)
  },
}

export const EmptySection: Story = {
  args: {
    title: 'Dessert',
    items: [],
    cartItems: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /dessert/i })).toBeVisible()
    await expect(canvas.queryByText(/vanilla ice cream/i)).not.toBeInTheDocument()
  },
}
