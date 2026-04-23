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
    specialty: 'Traditional Italian cuisine with fresh pasta and wood-fired pizza',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.5,
    categories: ['Italian', 'Pizza'],
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

export const Closed: Story = {
  args: {
    name: 'Burger Joint',
    specialty: 'Classic American burgers',
    photoUrl: 'https://via.placeholder.com/500x200',
    isClosed: true,
  },
}
