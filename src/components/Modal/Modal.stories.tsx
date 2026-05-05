import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Modal } from './Modal'

const meta = {
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div style={{ padding: '1rem' }}>Modal content here</div>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>Hidden content</div>,
  },
}

export const WithInteraction: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ padding: '2rem' }}>Opened modal content</div>
        </Modal>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))
    const doc = canvasElement.ownerDocument
    await expect(await within(doc.body).findByTestId('modal')).toBeVisible()
  },
}
