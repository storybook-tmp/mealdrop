import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h2>Order Details</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    ),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h2>Order Details</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    ),
  },
}
