import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import styled from 'styled-components'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard, RestaurantCardSkeleton } from './RestaurantCard'

const Frame = styled.div`
  max-width: 356px;
  padding: 2rem;
`

const burgerRestaurant = restaurantsCompleteData[0]
const closedRestaurant = restaurantsCompleteData[2]
const newRestaurant = restaurantsCompleteData[3]

const meta = {
  component: RestaurantCard,
  args: {
    name: burgerRestaurant.name,
    specialty: burgerRestaurant.specialty,
    photoUrl: burgerRestaurant.photoUrl,
  },
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Frame>
      <RestaurantCard {...burgerRestaurant} />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByTestId('restaurant-card')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: burgerRestaurant.name })).toBeVisible()
    await expect(canvas.getByText(burgerRestaurant.specialty)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const Closed: Story = {
  render: () => (
    <Frame>
      <RestaurantCard {...closedRestaurant} />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: closedRestaurant.name })).toBeVisible()
  },
}

export const Loading: Story = {
  render: () => (
    <Frame>
      <RestaurantCardSkeleton />
      <RestaurantCard {...newRestaurant} />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByTestId('loading')).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: newRestaurant.name })).toBeVisible()
  },
}
