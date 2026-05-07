import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    ...restaurantsCompleteData[0],
    onClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/4\.2 very good/i)).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: {
    ...restaurantsCompleteData[4],
    onClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    ...restaurantsCompleteData[2],
    onClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible()
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    name: '',
    specialty: '',
    photoUrl: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeVisible()
  },
}
