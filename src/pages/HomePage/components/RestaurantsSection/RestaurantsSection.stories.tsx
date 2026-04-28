import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../../../stub/restaurants'
import { RestaurantsSectionComponent } from './RestaurantsSection.container'

const meta = {
  component: RestaurantsSectionComponent,
  tags: ['ai-generated'],
  args: {
    title: 'Our favorite picks',
    onRestaurantClick: () => {},
  },
} satisfies Meta<typeof RestaurantsSectionComponent>

export default meta
type Story = StoryObj<typeof meta>

export const WithRestaurants: Story = {
  args: { restaurants: restaurantsCompleteData },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Our favorite picks')).toBeVisible()
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
  },
}

export const Loading: Story = { args: { restaurants: [], isLoading: true } }
export const Empty: Story = { args: { restaurants: [] } }
