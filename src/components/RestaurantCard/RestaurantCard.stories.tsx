import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const burgerRestaurant = restaurantsCompleteData[0]
const closedRestaurant = restaurantsCompleteData[2]
const newRestaurant = restaurantsCompleteData[3]

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    name: burgerRestaurant.name,
    rating: burgerRestaurant.rating,
    specialty: burgerRestaurant.specialty,
    photoUrl: burgerRestaurant.photoUrl,
    categories: burgerRestaurant.categories,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/very good/i)).toBeVisible()

    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const Closed: Story = {
  args: {
    name: closedRestaurant.name,
    specialty: closedRestaurant.specialty,
    photoUrl: closedRestaurant.photoUrl,
    isClosed: true,
    categories: closedRestaurant.categories,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()

    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const NewRestaurant: Story = {
  args: {
    name: newRestaurant.name,
    specialty: newRestaurant.specialty,
    photoUrl: newRestaurant.photoUrl,
    isNew: true,
    categories: newRestaurant.categories,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/new/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /kuyltje/i })).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    name: 'Loading restaurant',
    specialty: 'Loading specialty',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
