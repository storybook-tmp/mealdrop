import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Body } from '../typography'
import { Heading } from '../typography/Heading'

import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: fn(),
    children: (
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <Heading level={3}>Order details</Heading>
        <Body>Review your selection before adding it to the basket.</Body>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}
