import type { Meta, StoryObj } from '@storybook/react-vite'

import { Modal } from './Modal'
import { Body } from '../typography'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <Body>This is the modal content. You can place any content here.</Body>
      </div>
    ),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <Body>This modal is closed and should not be visible.</Body>
      </div>
    ),
  },
}
