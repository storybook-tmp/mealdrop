import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { Button } from '../Button'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Sidebar Title',
    onClose: () => {},
    children: <div style={{ padding: '1rem' }}>Sidebar content goes here</div>,
  },
}

export const OpenWithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Settings',
    onClose: () => {},
    children: <div style={{ padding: '1rem' }}>Configure your preferences</div>,
    footer: <Button>Save Changes</Button>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Hidden Sidebar',
    onClose: () => {},
    children: <div>This content is not visible when closed</div>,
  },
}
