import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantsSection } from './RestaurantsSection'

const meta = {
  component: RestaurantsSection,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantsSection>

export default meta
type Story = StoryObj<typeof meta>

export const PopularRestaurants: Story = {
  args: {
    title: 'Popular restaurants',
  },
  play: async ({ canvas }) => {
    const restaurants = await canvas.findAllByText('Burger Kingdom')
    await expect(restaurants[0]).toBeVisible()
  },
}
