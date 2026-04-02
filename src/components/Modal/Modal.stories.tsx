import type { Meta, StoryObj } from '@storybook/react'

import { Body, Heading } from '../typography'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => undefined,
  },
  render: (args) => (
    <Modal {...args}>
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <Heading level={3}>Order details</Heading>
        <Body>Review your selected dishes, delivery details, and total before checkout.</Body>
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
