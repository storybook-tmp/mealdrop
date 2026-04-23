import type { Meta, StoryObj } from '@storybook/react-vite'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

const [featuredRestaurant] = restaurantsCompleteData

export const Default: Story = {
  args: {
    ...featuredRestaurant,
    onClick: () => undefined,
  },
  render: (args) => <RestaurantCard {...args} />,
}
