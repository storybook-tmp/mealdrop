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
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1003&q=20',
    title: 'Burger Kingdom',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
  },
}

export const NoTitle: Story = {
  args: {
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1003&q=20',
  },
  play: async ({ canvas }) => {
    // Banner renders without a title — just check the container is present
    const banner = canvas.getByRole('generic')
    await expect(banner).toBeDefined()
  },
}
