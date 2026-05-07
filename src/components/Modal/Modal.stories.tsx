import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor } from 'storybook/test'

import { Button } from '../Button'
import { Heading } from '../typography'

import { Modal } from './Modal'

type ModalStoryProps = {
  initialOpen?: boolean
  onClose?: () => void
}

const ModalStory = ({ initialOpen = false, onClose = fn() }: ModalStoryProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(initialOpen)
  }, [initialOpen])

  const close = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <div style={{ padding: '1.5rem' }}>
          <Heading level={3}>Added to your order</Heading>
          <p>Your fries are ready in the cart.</p>
        </div>
      </Modal>
    </>
  )
}

const meta = {
  component: ModalStory,
  tags: ['ai-generated'],
} satisfies Meta<typeof ModalStory>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    initialOpen: false,
    onClose: fn(),
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('button', { name: /open modal/i })).toBeVisible()
    await expect(
      canvasElement.ownerDocument.querySelector('[data-testid="modal"]')
    ).not.toBeInTheDocument()
  },
}

export const Open: Story = {
  args: {
    initialOpen: true,
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    await waitFor(async () => {
      await expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeVisible()
    })
    await expect(canvasElement.ownerDocument.body).toHaveTextContent('Added to your order')
  },
}

export const OpensOnClick: Story = {
  args: {
    initialOpen: false,
    onClose: fn(),
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }))

    await waitFor(async () => {
      await expect(canvasElement.ownerDocument.querySelector('[data-testid="modal"]')).toBeVisible()
    })
    await expect(canvasElement.ownerDocument.body).toHaveTextContent('Your fries are ready')
  },
}
