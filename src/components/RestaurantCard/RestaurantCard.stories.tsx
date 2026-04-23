import type { Meta, StoryObj } from '@storybook/react'

import { RestaurantCard } from './RestaurantCard'

const photoUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f5f6f7'/%3E%3Crect x='32' y='32' width='536' height='336' rx='28' fill='%23b1dde4'/%3E%3Ccircle cx='180' cy='160' r='72' fill='%23e5f8bc'/%3E%3Crect x='280' y='120' width='160' height='120' rx='24' fill='%23ffffff'/%3E%3C/svg%3E"

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    name: 'Green Garden',
    specialty: 'Fresh bowls, grilled vegetables, and house-made sauces.',
    rating: 4.7,
    photoUrl,
    categories: ['Healthy', 'Bowls'],
  },
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NewAndClosed: Story = {
  args: {
    isClosed: true,
    isNew: true,
    categories: ['Late night', 'Burgers'],
    name: 'Night Owl Diner',
    specialty: 'Comfort food with oversized portions and all-day breakfast.',
  },
}
