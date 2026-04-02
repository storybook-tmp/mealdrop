import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: 'Modal content goes here',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <div id="modal" />
      </>
    ),
  ],
}

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: 'Modal content goes here',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <div id="modal" />
      </>
    ),
  ],
}
