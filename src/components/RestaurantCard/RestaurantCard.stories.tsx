import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'
import { RestaurantCard } from './RestaurantCard'

const [defaultRestaurant, , closedRestaurant, newRestaurant] = restaurantsCompleteData

const meta = {
  component: RestaurantCard,
  args: defaultRestaurant,
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultCard: Story = {
  render: () => <RestaurantCard {...defaultRestaurant} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /burger kingdom/i, level: 2 })
    ).toBeVisible()
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText(/★ 4.2 very good/i)).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  render: () => <RestaurantCard {...newRestaurant} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^new$/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /'t kuyltje/i, level: 2 })).toBeVisible()
    await expect(canvas.getByText(/comfort food/i)).toBeVisible()
  },
}

export const ClosedRestaurant: Story = {
  render: () => <RestaurantCard {...closedRestaurant} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i, level: 2 })).toBeVisible()
    await expect(canvas.getByAltText(/restaurant/i)).toBeVisible()
  },
}

export const LoadingCard: Story = {
  render: () => <RestaurantCard {...defaultRestaurant} isLoading />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
