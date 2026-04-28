import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { RestaurantCard } from './RestaurantCard'

const meta = preview.meta({
  component: RestaurantCard,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    name: 'Burger Palace',
    specialty: 'Gourmet burgers made with premium ingredients and fresh toppings',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isNew: false,
    isClosed: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible()
    await expect(canvas.getByText(/4\.5/)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
})

export const NewRestaurant = meta.story({
  args: {
    name: 'Thai Orchid',
    specialty: 'Traditional Thai cuisine with bold spices',
    photoUrl:
      'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    categories: ['asian'],
    isNew: true,
    isClosed: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Thai Orchid')).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
  },
})

export const Closed = meta.story({
  args: {
    name: 'Pizza Express',
    specialty: 'Wood-fired pizzas with authentic Italian flavors',
    photoUrl:
      'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.2,
    categories: ['pizza'],
    isNew: false,
    isClosed: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza Express')).toBeVisible()
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
  },
})

export const Loading = meta.story({
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
})
