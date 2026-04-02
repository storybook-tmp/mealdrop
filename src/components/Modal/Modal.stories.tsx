import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Body } from '../typography'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: fn(),
    children: (
      <div style={{ padding: '1.5rem' }}>
        <Body>Choose the quantity you would like to add to your order.</Body>
      </div>
    ),
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongContent: Story = {
  args: {
    children: (
      <div style={{ padding: '1.5rem', display: 'grid', gap: '0.75rem' }}>
        <Body>This modal can hold more detailed content for order customization.</Body>
        <Body>Add notes, review details, and confirm your selection before continuing.</Body>
        <Body>It stays mounted in the portal target created by the global preview decorator.</Body>
      </div>
    ),
  },
}
