import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { TopBanner } from './TopBanner'

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'All Restaurants',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('All Restaurants')).toBeVisible()
  },
}

export const WithPhoto: Story = {
  args: {
    title: 'Italian Food',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Italian Food')).toBeVisible()
  },
}

export const NoTitle: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('generic')).toBeVisible()
  },
}
