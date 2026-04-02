import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'AI Generated/Medium/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'home', path: '/' },
      { label: 'restaurants' },
    ],
  },
}

export const WithMultipleItems: Story = {
  args: {
    items: [
      { label: 'home', path: '/' },
      { label: 'restaurants', path: '/restaurants' },
      { label: 'italian cuisine', path: '/restaurants/italian' },
      { label: 'pasta', path: '/restaurants/italian/pasta' },
    ],
  },
}

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: 'home' },
      { label: 'restaurants' },
      { label: 'current page' },
    ],
  },
}
