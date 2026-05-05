import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { RestaurantCard } from './RestaurantCard'

const meta = preview.meta({
  component: RestaurantCard,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    await expect(canvas.getByText(/4\.2/)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
})

export const New = meta.story({
  args: {
    name: 'Ciao Bella',
    specialty: 'Takeaway lasagna',
    photoUrl:
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    isNew: true,
    categories: ['pizza'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByText('Ciao Bella')).toBeVisible()
  },
})

export const Closed = meta.story({
  args: {
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    isClosed: true,
    categories: ['comfort food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
    await expect(canvas.getByText('De Oliewinkel')).toBeVisible()
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
