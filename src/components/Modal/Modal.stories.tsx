import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Button } from '../Button'
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

const ModalWithTrigger = ({ content }: { content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {content}
      </Modal>
    </>
  )
}

export const Open: Story = {
  render: () => <ModalWithTrigger content={<p>Modal content here</p>} />,
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))
    const doc = canvasElement.ownerDocument
    await waitFor(() => {
      const modal = doc.querySelector('[data-testid="modal"]')
      expect(modal).toBeVisible()
    })
    expect(doc.querySelector('[data-testid="modal-close-btn"]')).toBeVisible()
  },
}

export const WithContent: Story = {
  render: () => (
    <ModalWithTrigger
      content={
        <div style={{ padding: '1rem' }}>
          <h2>Choose your meal</h2>
          <p>Select from our wide range of options.</p>
        </div>
      }
    />
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))
    const doc = canvasElement.ownerDocument
    await waitFor(() => {
      const modal = doc.querySelector('[data-testid="modal"]')
      expect(modal).toBeVisible()
    })
    expect(doc.querySelector('h2')?.textContent).toBe('Choose your meal')
  },
}

export const Closed: Story = {
  render: () => <ModalWithTrigger content={<p>Modal content here</p>} />,
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument
    // Modal is not opened — it should not be in the DOM
    const modal = doc.querySelector('[data-testid="modal"]')
    expect(modal).toBeNull()
  },
}
