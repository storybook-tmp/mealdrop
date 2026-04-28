import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantCard, RestaurantCardSkeleton } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
  args: {
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
  },
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
  },
}

export const Closed: Story = {
  args: { isClosed: true },
}

export const New: Story = {
  args: { isNew: true },
}

export const NoRating: Story = {
  args: { rating: undefined },
}

export const Loading: Story = {
  render: () => <RestaurantCardSkeleton />,
}
