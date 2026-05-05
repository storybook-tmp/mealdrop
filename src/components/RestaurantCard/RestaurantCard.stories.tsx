import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantCard, RestaurantCardSkeleton } from './RestaurantCard'

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
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    await expect(canvas.getByText('Nicest place for burgers')).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: {
    name: "Yuan's Hot Pot",
    specialty: 'cheap and fun evening meals',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    categories: ['thai'],
    isNew: true,
    rating: 4.5,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
  },
}

export const ClosedRestaurant: Story = {
  args: {
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    categories: ['comfort food'],
    isClosed: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    name: 'Loading restaurant',
    specialty: 'Loading...',
    photoUrl: '',
    isLoading: true,
  },
  render: () => <RestaurantCardSkeleton />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
