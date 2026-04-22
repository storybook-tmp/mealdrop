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
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    isClosed: true,
    categories: ['comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
  },
}

export const IsNew: Story = {
  args: {
    name: 'New Place',
    specialty: 'Fresh dishes',
    photoUrl:
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    isNew: true,
    rating: 4.8,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
