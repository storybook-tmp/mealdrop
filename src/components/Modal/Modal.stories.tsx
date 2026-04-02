import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  decorators: [
    (Story) => {
      const portalRoot = document.getElementById('modal') ?? (() => {
        const div = document.createElement('div')
        div.id = 'modal'
        document.body.appendChild(div)
        return div
      })()
      void portalRoot
      return React.createElement(Story)
    },
  ],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: React.createElement('p', { style: { padding: '1rem' } }, 'Modal content goes here.'),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: React.createElement('p', { style: { padding: '1rem' } }, 'Modal content goes here.'),
  },
}
