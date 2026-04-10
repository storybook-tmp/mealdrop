import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import styled from 'styled-components'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const Frame = styled.div`
  max-width: 420px;
  padding: 1.5rem;
`

const defaultRestaurant = restaurantsCompleteData[0]
const closedRestaurant = restaurantsCompleteData[2]
const newRestaurant = restaurantsCompleteData[3]

const meta = {
  component: RestaurantCard,
  render: (args) => (
    <Frame>
      <RestaurantCard {...args} />
    </Frame>
  ),
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...defaultRestaurant,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /restaurant/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: defaultRestaurant.name })).toBeVisible()
    await expect(canvas.getByText(defaultRestaurant.specialty)).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    ...closedRestaurant,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: closedRestaurant.name })).toBeVisible()
    await expect(canvas.getByText(closedRestaurant.specialty)).toBeVisible()
  },
}

export const New: Story = {
  args: {
    ...newRestaurant,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/^new$/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: newRestaurant.name })).toBeVisible()
    await expect(canvas.getByText(newRestaurant.specialty)).toBeVisible()
  },
}
