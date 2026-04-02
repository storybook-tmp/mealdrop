import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div>Modal content here</div>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>Modal content here</div>,
  },
}

export const WithFormContent: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <h2>Edit Profile</h2>
        <p>This is a form inside a modal.</p>
      </div>
    ),
  },
}
