import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const burgerKingdom = restaurantsCompleteData[0]
const closedRestaurant = restaurantsCompleteData[2]
const newRestaurant = restaurantsCompleteData[4]

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
  args: {
    ...burgerKingdom,
  },
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: {
    ...newRestaurant,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    ...closedRestaurant,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible()
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
