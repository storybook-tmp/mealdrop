import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Category } from './Category'

const meta = preview.meta({
  component: Category,
  tags: ['ai-generated'],
})

export const Squared = meta.story({
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
})

export const Rounded = meta.story({
  args: {
    title: 'Burgers',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burgers')).toBeVisible()
    const img = canvas.getByAltText('restaurant category')
    await expect(img).toBeVisible()
  },
})

export const Sushi = meta.story({
  args: {
    title: 'Sushi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Sushi')).toBeVisible()
  },
})
