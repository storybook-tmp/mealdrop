import type { Meta, StoryObj } from '@storybook/react-vite'

import { restaurantsCompleteData } from '../../stub/restaurants'
import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const OpenRestaurant: Story = {
  args: {
    ...restaurantsCompleteData[0],
  },
}

export const NewRestaurant: Story = {
  args: {
    ...restaurantsCompleteData[4],
  },
}

export const ClosedRestaurant: Story = {
  args: {
    ...restaurantsCompleteData[2],
  },
}

export const Loading: Story = {
  args: {
    ...restaurantsCompleteData[0],
    isLoading: true,
  },
}
