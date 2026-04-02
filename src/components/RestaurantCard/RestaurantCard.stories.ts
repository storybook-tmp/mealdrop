import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'
import { RestaurantCard } from './RestaurantCard'

const [featuredRestaurant, , closedRestaurant] = restaurantsCompleteData

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    ...featuredRestaurant,
    onClick: fn(),
  },
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Closed: Story = {
  args: {
    ...closedRestaurant,
    onClick: undefined,
  },
}
