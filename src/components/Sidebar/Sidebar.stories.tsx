import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: () => {},
    children: 'Sidebar content goes here.',
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Your order',
    onClose: () => {},
    children: 'Sidebar content goes here.',
  },
}

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Shopping Cart',
    onClose: () => {},
    children: 'Your items will appear here.',
    footer: 'Total: $25.00',
  },
}
