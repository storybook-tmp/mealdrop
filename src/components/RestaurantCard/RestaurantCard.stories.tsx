import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const [burgerKingdom, , closedRestaurant, newRestaurant] = restaurantsCompleteData

const meta = {
  component: RestaurantCard,
  args: burgerKingdom,
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <RestaurantCard {...burgerKingdom} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText(burgerKingdom.name)).toBeVisible()
    await expect(canvas.getByText('★ 4.2 Very good')).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const Closed: Story = {
  render: () => <RestaurantCard {...closedRestaurant} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(closedRestaurant.name)).toBeVisible()
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
    await expect(canvas.getByAltText('restaurant')).toBeVisible()
  },
}

export const NewArrival: Story = {
  render: () => <RestaurantCard {...newRestaurant} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(newRestaurant.name)).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByText(newRestaurant.specialty)).toBeVisible()
  },
}
