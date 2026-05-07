import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Body } from '../typography/Body'
import { Button } from '../Button'
import { Heading } from '../typography/Heading'
import { Modal } from './Modal'

const ModalLauncher = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <Heading level={3}>Delivery window</Heading>
          <Body>Choose a delivery time before confirming the order.</Body>
        </div>
      </Modal>
    </>
  )
}

const meta = {
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const OpensInPortal: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
  render: () => <ModalLauncher />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByTestId('modal')).toBeVisible()
    await expect(await body.findByRole('heading', { name: /delivery window/i })).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <Body>Hidden modal content</Body>,
  },
}
