import type { Meta, StoryObj } from '@storybook/react-vite'

import { TopBanner } from './TopBanner'

const meta = {
  title: 'AI Generated/Medium/TopBanner',
  component: TopBanner,
} satisfies Meta<typeof TopBanner>

export default meta
type Story = StoryObj<typeof meta>

export const WithTitle: Story = {
  args: {
    title: 'Italian Restaurants',
  },
}

export const WithPhoto: Story = {
  args: {
    title: 'Fast Food',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  },
}

export const NoContent: Story = {
  args: {},
}
