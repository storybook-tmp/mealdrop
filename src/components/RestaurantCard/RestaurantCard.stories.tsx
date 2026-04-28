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
    name: 'Saigon Bistro',
    specialty: 'Vietnamese-inspired dishes with a French twist',
    photoUrl:
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    rating: 4.5,
    categories: ['asian', 'comfort-food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /saigon bistro/i })).toBeVisible()
    await expect(canvas.getByText(/vietnamese-inspired/i)).toBeVisible()
    await expect(canvas.getByText(/asian/i)).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: {
    name: 'Fresh Kitchen',
    specialty: 'Farm-to-table healthy bowls',
    photoUrl:
      'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    rating: 4.8,
    isNew: true,
    categories: ['comfort-food'],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /fresh kitchen/i })).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    name: 'Burger Barn',
    specialty: 'Gourmet burgers made from locally sourced beef',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    rating: 3.8,
    isClosed: true,
    categories: ['burgers'],
  },
  play: async ({ canvas }) => {
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
