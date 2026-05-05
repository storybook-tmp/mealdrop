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
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}

export const WithImage: Story = {
  args: {
    title: 'Burger Palace',
    photoUrl: 'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /burger palace/i })).toBeVisible()
  },
}

export const NoTitle: Story = {
  args: {
    photoUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    const headings = canvas.queryAllByRole('heading')
    await expect(headings).toHaveLength(0)
  },
}
