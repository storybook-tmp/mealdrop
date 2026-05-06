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

export const Empty: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    // TopBanner with no title or photo renders an empty colored container
    const banner = canvasElement.querySelector('[class]') as HTMLElement
    await expect(banner).toBeTruthy()
  },
}
