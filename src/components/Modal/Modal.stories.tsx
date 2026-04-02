import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Body, Heading } from '../typography'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: fn(),
  },
  render: (args) => (
    <Modal {...args}>
      <div style={{ padding: '3rem 1.5rem' }}>
        <Heading level={3}>Order updated</Heading>
        <Body>Your item quantity has been updated in the cart.</Body>
      </div>
    </Modal>
  ),
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}
