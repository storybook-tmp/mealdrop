import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const burgerKingdom = restaurantsCompleteData[0]
const ciaoBella = restaurantsCompleteData[4]

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...burgerKingdom,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: {
    ...ciaoBella,
  },
}

export const Closed: Story = {
  args: {
    ...burgerKingdom,
    isClosed: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    ...burgerKingdom,
    isLoading: true,
  },
}
