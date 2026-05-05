import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Modal } from './Modal'

const meta = {
  component: Modal,
  tags: ['ai-generated'],
  args: {
    isOpen: false,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModal = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <p>Modal content here</p>
    </Modal>
  )
}

export const Open: Story = {
  render: () => <OpenModal />,
}

export const Closed: Story = {
  args: { isOpen: false, onClose: () => {} },
}
