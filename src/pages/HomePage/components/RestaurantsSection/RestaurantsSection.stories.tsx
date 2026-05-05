import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantsSectionComponent } from './RestaurantsSection.container'

const meta = {
  component: RestaurantsSectionComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantsSectionComponent>

export default meta
type Story = StoryObj<typeof meta>

const restaurants = [
  {
    id: '1',
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
    menu: { food: [], dessert: [], drinks: [] },
  },
  {
    id: '2',
    name: 'Kara Fin',
    specialty: 'Sarma (wine leafs with rice)',
    photoUrl:
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categories: ['burgers', 'pizza'],
    menu: { food: [], dessert: [], drinks: [] },
  },
  {
    id: '3',
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    categories: ['comfort food'],
    isClosed: true,
    menu: { food: [], dessert: [], drinks: [] },
  },
]

export const Default: Story = {
  args: {
    title: 'Our favorite picks',
    restaurants,
    onRestaurantClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Our favorite picks')).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    title: 'Loading restaurants',
    restaurants: [],
    isLoading: true,
    onRestaurantClick: () => {},
  },
}
