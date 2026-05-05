import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/very good/i)).toBeVisible()
  },
}

export const New: Story = {
  args: {
    ...Default.args,
    isNew: true,
    name: 'New Restaurant',
  },
}

export const Closed: Story = {
  args: {
    ...Default.args,
    isClosed: true,
    name: 'Closed Restaurant',
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}
