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
    name: 'Pizza Palace',
    specialty: 'Authentic Italian wood-fired pizzas made with fresh ingredients',
    rating: 4.5,
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    categories: ['pizza', 'italian'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza Palace')).toBeVisible()
    await expect(canvas.getByText(/very good/i)).toBeVisible()
    await expect(canvas.getByText('pizza')).toBeVisible()
    await expect(canvas.getByText('italian')).toBeVisible()
  },
}

export const New: Story = {
  args: {
    name: 'Sushi Master',
    specialty: 'Fresh sushi and Japanese delicacies',
    rating: 4.8,
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isNew: true,
    categories: ['sushi'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByText('Sushi Master')).toBeVisible()
    await expect(canvas.getByText(/very good/i)).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    name: 'Burger Barn',
    specialty: 'Gourmet burgers with locally sourced beef',
    rating: 4.2,
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    categories: ['burgers'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Barn')).toBeVisible()
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
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
