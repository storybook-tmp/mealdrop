import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  component: Breadcrumb,
  tags: ['ai-generated'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const WithLinks: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Categories', path: '/categories' },
      { label: 'Pizza' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible()
    await expect(canvas.getByText('Categories')).toBeVisible()
    await expect(canvas.getByText('Pizza')).toBeVisible()
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible()
  },
}

export const AllLinks: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Restaurants', path: '/categories' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible()
    await expect(canvas.getByText('Restaurants')).toBeVisible()
  },
}
