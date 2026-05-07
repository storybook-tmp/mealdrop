import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { RestaurantsSection } from './RestaurantsSection'

const meta = {
  component: RestaurantsSection,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantsSection>

export default meta
type Story = StoryObj<typeof meta>

export const FavoritePicks: Story = {
  args: {
    title: 'Our favorite picks',
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Burger Kingdom')).toBeVisible()
  },
}

export const PopularNearby: Story = {
  args: {
    title: 'Popular nearby',
  },
}
