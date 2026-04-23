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
    title: 'Your Cart',
    onClose: () => {},
    children: <p style={{ padding: '1rem' }}>Sidebar content goes here</p>,
    footer: <Button>Checkout</Button>,
  },
}

export const OpenWithoutFooter: Story = {
  args: {
    isOpen: true,
    title: 'Filters',
    onClose: () => {},
    children: <p style={{ padding: '1rem' }}>Filter options</p>,
  },
}
