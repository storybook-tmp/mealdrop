import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantCard } from './RestaurantCard'
import { restaurantsCompleteData } from '../../stub/restaurants'

const meta = {
  component: RestaurantCard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>
type RestaurantCardProps = ComponentProps<typeof RestaurantCard>

const cardFrame = (restaurant: RestaurantCardProps) => (
  <div style={{ maxWidth: '356px' }}>
    <RestaurantCard {...restaurant} />
  </div>
)

export const Default: Story = {
  args: restaurantsCompleteData[0],
  render: (args) => cardFrame(args),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText(/comfort food/i)).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: restaurantsCompleteData[3],
  render: (args) => cardFrame(args),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /'t kuyltje/i })).toBeVisible()
    await expect(canvas.getByText(/pastrami sandwiches/i)).toBeVisible()
  },
}

export const ClosedRestaurant: Story = {
  args: restaurantsCompleteData[2],
  render: (args) => cardFrame(args),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible()
    await expect(canvas.getByText(/olive oil/i)).toBeVisible()
  },
}
