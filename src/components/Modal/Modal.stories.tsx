import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Modal } from './Modal'

const meta = {
  component: Modal,
  tags: ['ai-generated'],
  args: {
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    children: <p>Modal body content</p>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    children: <p>Hidden content</p>,
  },
}
