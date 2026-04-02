import type { Meta, StoryObj } from '@storybook/react'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'The Italian Place',
    specialty: 'Authentic Italian cuisine with fresh pasta and wood-fired pizza',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format',
    rating: 4.5,
    categories: ['Italian', 'Pizza', 'Pasta'],
  },
}

export const Closed: Story = {
  args: {
    name: 'Sushi Garden',
    specialty: 'Premium Japanese sushi and sashimi',
    photoUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&auto=format',
    rating: 4.8,
    isClosed: true,
  },
}

export const NewRestaurant: Story = {
  args: {
    name: 'Burger Street',
    specialty: 'Gourmet burgers with locally sourced beef and craft milkshakes',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    rating: 4.2,
    isNew: true,
    categories: ['Burgers', 'American'],
  },
}

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
}
