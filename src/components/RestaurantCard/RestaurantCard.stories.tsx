import type { Meta, StoryObj } from '@storybook/react-vite'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    name: 'Ocean Bento',
    specialty: 'Sushi, ramen, and fast lunch bowls made with seasonal ingredients.',
    photoUrl: '/src/assets/images/restaurants.png',
    rating: 4.7,
    categories: ['sushi', 'japanese'],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ClosedAndNew: Story = {
  args: {
    isClosed: true,
    isNew: true,
    rating: 5,
    categories: ['dessert', 'late night'],
  },
}
