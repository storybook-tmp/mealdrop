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
    title: 'Categories',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Categories')).toBeVisible()
  },
}

export const WithPhoto: Story = {
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible()
  },
}

export const NoTitle: Story = {
  args: {},
  play: async ({ canvas }) => {
    // Banner renders with the background container but no heading
    const headings = canvas.queryAllByRole('heading')
    await expect(headings).toHaveLength(0)
  },
}
