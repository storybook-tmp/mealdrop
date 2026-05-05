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
    specialty: 'Burgers, Fries, Shakes',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible()
    await expect(canvas.getByText(/★ 4.5 Very good/)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
})

export const New = meta.story({
  args: {
    name: 'Sushi Master',
    specialty: 'Sushi, Sashimi, Japanese cuisine',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    isNew: true,
    categories: ['sushi', 'asian'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByText('Sushi Master')).toBeVisible()
  },
})

export const Closed = meta.story({
  args: {
    name: 'Pizza Express',
    specialty: 'Wood-fired pizzas and Italian classics',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    isClosed: true,
    categories: ['pizza'],
  },
  play: async ({ canvas }) => {
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
