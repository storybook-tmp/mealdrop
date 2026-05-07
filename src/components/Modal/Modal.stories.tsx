import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Body } from '../typography'

import { Modal } from './Modal'

const ModalWithTrigger = (args: ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

const meta = {
  component: Modal,
  tags: ['ai-generated'],
  args: {
    onClose: () => {},
    children: (
      <div style={{ padding: '4rem 1.5rem 1.5rem' }}>
        <Body>Choose how many items to add to your order.</Body>
      </div>
    ),
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: false,
  },
  render: (args) => <ModalWithTrigger {...args} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))

    const body = within(canvasElement.ownerDocument.body)
    const modal = await body.findByTestId('modal')

    await expect(modal).toBeVisible()
    await expect(canvasElement.ownerDocument.querySelector('#modal')).toContainElement(modal)
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}
