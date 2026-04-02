import type { Meta, StoryObj } from '@storybook/react-vite'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Complex/RestaurantCard',
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Pizza Palace',
    specialty: 'Authentic Italian pizzas made with fresh ingredients and a stone-baked crust.',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.7,
    categories: ['Italian', 'Pizza'],
  },
}

export const New: Story = {
  args: {
    name: 'Burger Barn',
    specialty: 'Gourmet burgers with premium beef patties and house-made sauces.',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.2,
    categories: ['American', 'Burgers'],
    isNew: true,
  },
}

export const Closed: Story = {
  args: {
    name: 'Sushi Garden',
    specialty: 'Traditional Japanese sushi and sashimi prepared by expert chefs.',
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    rating: 4.9,
    categories: ['Japanese', 'Sushi'],
    isClosed: true,
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
