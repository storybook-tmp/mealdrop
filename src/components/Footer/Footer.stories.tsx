import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Footer } from './Footer'

const meta = {
  component: Footer,
  tags: ['ai-generated'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Discover us')).toBeVisible()
    await expect(canvas.getByText('Our social media')).toBeVisible()
    await expect(canvas.getByText('Check our apps')).toBeVisible()
  },
}

export const NavigationLinks: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible()
    await expect(canvas.getByText('Categories')).toBeVisible()
    await expect(canvas.getByText('About')).toBeVisible()
    await expect(canvas.getByText('Login')).toBeVisible()
  },
}

export const SocialLinks: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Facebook')).toBeVisible()
    await expect(canvas.getByText('Instagram')).toBeVisible()
    await expect(canvas.getByText('Twitter')).toBeVisible()
  },
}
