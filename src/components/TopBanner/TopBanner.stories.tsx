import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { TopBanner } from './TopBanner'

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>

export default meta
type Story = StoryObj<typeof meta>

export const WithTitle: Story = {
  args: {
    title: 'Order confirmed!',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/order confirmed/i)).toBeVisible()
  },
}

export const WithPhoto: Story = {
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/pizza/i)).toBeVisible()
  },
}

export const NoTitle: Story = {
  args: {},
  play: async ({ canvas }) => {
    const container = canvas.getByRole('generic')
    await expect(container).toBeVisible()
  },
}
