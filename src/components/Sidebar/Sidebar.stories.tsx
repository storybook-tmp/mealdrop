import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Sidebar Title',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
}

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Sidebar Title',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
}
