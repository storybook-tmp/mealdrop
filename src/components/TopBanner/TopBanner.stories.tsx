import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { TopBanner } from './TopBanner'

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {
  args: {
    title: 'Restaurants',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /restaurants/i })).toBeVisible()
  },
}

export const WithPhoto: Story = {
  args: {
    photoUrl: restaurantsCompleteData[0].photoUrl,
    title: 'Burger Kingdom',
  },
}

export const PhotoOnly: Story = {
  args: {
    photoUrl: restaurantsCompleteData[4].photoUrl,
  },
}
