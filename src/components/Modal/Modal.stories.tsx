import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  decorators: [
    (Story) => {
      // Create a modal portal container if it doesn't exist
      let modalContainer = document.querySelector('#modal')
      if (!modalContainer) {
        modalContainer = document.createElement('div')
        modalContainer.id = 'modal'
        document.body.appendChild(modalContainer)
      }
      return <Story />
    },
  ],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div style={{ padding: '2rem' }}>Modal content goes here</div>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>This content is not visible when closed</div>,
  },
}
