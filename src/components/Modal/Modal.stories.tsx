import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Modal } from './Modal'
import { Button } from '../Button'

const meta = {
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <p>Hidden content</p>,
  },
}

export const WithInteraction: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>Modal content</p>
        </Modal>
      </>
    )
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))
    const doc = canvasElement.ownerDocument
    const modal = await within(doc.body).findByTestId('modal')
    await expect(modal).toBeVisible()
    await userEvent.click(within(doc.body).getByRole('button', { name: /close modal/i }))
    await waitFor(
      () => expect(within(doc.body).queryByTestId('modal')).not.toBeInTheDocument(),
      { timeout: 2000 }
    )
  },
}
